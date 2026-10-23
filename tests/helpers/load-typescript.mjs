import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import ts from "typescript";

const root = fileURLToPath(new URL("../../", import.meta.url));

/** Load the real TS modules in Node 20 without adding a second transpiler. */
export function sourceLoader(overrides = {}) {
  const cache = new Map();
  function load(file) {
    let filename = resolve(root, file);
    if (!existsSync(filename)) {
      filename = [filename + ".ts", filename + ".tsx"].find(existsSync);
      if (!filename) throw new Error("Missing source module: " + file);
    }
    if (cache.has(filename)) return cache.get(filename).exports;
    const loadedModule = { exports: {} };
    cache.set(filename, loadedModule);
    const require = createRequire(filename);
    function resolveImport(specifier) {
      if (Object.hasOwn(overrides, specifier)) return overrides[specifier];
      if (specifier.startsWith("@/")) return load("src/" + specifier.slice(2));
      if (specifier.startsWith(".")) return load(resolve(dirname(filename), specifier));
      return require(specifier);
    }
    const { outputText } = ts.transpileModule(readFileSync(filename, "utf8"), {
      fileName: filename,
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
    });
    new Function("require", "module", "exports", outputText)(resolveImport, loadedModule, loadedModule.exports);
    return loadedModule.exports;
  }
  return load;
}
