import { Sidebar } from "@/components/layout/Sidebar";

/**
 * Shell for the signed-in area: primary navigation plus the page body.
 *
 * Props are typed inline rather than with Next's generated `LayoutProps`,
 * because this layout serves several routes and route groups do not appear in
 * the URL, so there is no single path to key that type on.
 *
 * Phase 2 adds route protection here via middleware; nothing is gated yet.
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6">{children}</main>
    </div>
  );
}
