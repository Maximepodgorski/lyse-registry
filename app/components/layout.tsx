import { SidebarNav } from "@/app/_components/sidebar-nav"
import { Button } from "@/registry/new-york/ui/button/button"

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className="min-h-svh flex flex-col"
      style={{ background: "var(--background-base)" }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-10 px-6 h-14 flex items-center justify-between backdrop-blur-md"
        style={{
          background:
            "color-mix(in srgb, var(--background-base) 80%, transparent)",
          borderBottom:
            "var(--layout-border-thin) solid var(--border-default)",
        }}
      >
        <span
          className="text-content-body font-bold"
          style={{ color: "var(--text-base-strong)" }}
        >
          Lyse UI
        </span>
        <Button variant="terciary" size="sm" asChild>
          <a
            href="https://github.com/lyse-labs/registry"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </Button>
      </header>

      <div className="flex-1 w-full flex">
        {/* Left sidebar */}
        <aside
          className="hidden lg:block w-56 shrink-0 py-16 pl-6"
          style={{
            borderRight:
              "var(--layout-border-thin) solid var(--border-default)",
          }}
        >
          <SidebarNav />
        </aside>

        {children}
      </div>

      {/* Footer */}
      <footer
        className="px-6 py-6 text-center text-content-caption"
        style={{
          color: "var(--text-base-moderate)",
          borderTop:
            "var(--layout-border-thin) solid var(--border-default)",
        }}
      >
        MIT License &middot; Built by{" "}
        <a
          href="https://getlyse.com"
          className="underline underline-offset-4"
          style={{ color: "var(--text-base-strong)" }}
        >
          Lyse Labs
        </a>
      </footer>
    </div>
  )
}
