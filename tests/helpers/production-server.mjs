import { randomBytes } from "node:crypto";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { once } from "node:events";
import { setTimeout as delay } from "node:timers/promises";

export async function startProductionServer() {
  const secret = randomBytes(32).toString("hex");
  const reservation = createServer();
  reservation.listen(0, "127.0.0.1");
  await once(reservation, "listening");
  const port = reservation.address().port;
  await new Promise((resolve) => reservation.close(resolve));
  const origin = `http://127.0.0.1:${port}`;
  let logs = "";
  let startupError;
  const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start",
    "--hostname", "127.0.0.1", "--port", String(port)], {
    windowsHide: true, stdio: ["ignore", "pipe", "pipe"],
    env: {
      ...process.env, NODE_ENV: "production", NEXTAUTH_URL: origin,
      NEXTAUTH_SECRET: secret, AUTH_JWT_SECRET: secret,
      GOOGLE_CLIENT_ID: "test-client-id", GOOGLE_CLIENT_SECRET: "test-client-secret",
    },
  });
  const capture = (chunk) => { logs = (logs + chunk).slice(-4000); };
  server.stdout.on("data", capture);
  server.stderr.on("data", capture);
  server.on("error", (error) => { startupError = error; });
  const stop = async () => {
    if (server.pid && server.exitCode === null) {
      const exited = once(server, "exit");
      server.kill();
      await exited;
    }
  };
  try {
    const deadline = Date.now() + 30_000;
    while (Date.now() < deadline) {
      if (startupError) throw startupError;
      if (server.exitCode !== null) throw new Error(`Test server exited: ${logs}`);
      try {
        const response = await fetch(`${origin}/api/auth/providers`, { signal: AbortSignal.timeout(1000) });
        if (response.ok) return { origin, secret, stop };
      } catch { /* Server is starting. */ }
      await delay(200);
    }
    throw new Error(`Test server did not become ready: ${logs}`);
  } catch (error) {
    await stop();
    throw error;
  }
}
