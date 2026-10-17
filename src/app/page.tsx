import { redirect } from "next/navigation";

/**
 * The root path has no screen of its own: anonymous visitors belong on the
 * landing page.
 *
 * Once auth exists this becomes a branch — signed-in users to /search,
 * everyone else to /landing — which is how the deployed app behaves.
 */
export default function RootPage() {
  redirect("/landing");
}
