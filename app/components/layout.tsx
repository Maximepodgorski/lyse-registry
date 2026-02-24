"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/registry/new-york/ui/button/button"
import {
  Menu,
  MenuGroup,
  MenuItem,
} from "@/registry/new-york/ui/menu/menu"

const navGroups = [
  {
    label: "Getting Started",
    items: [
      { label: "Introduction" },
      { label: "Installation" },
      { label: "Tokens" },
    ],
  },
  {
    label: "Components",
    items: [
      { label: "Button", href: "/components/button" },
      { label: "Badge", href: "/components/badge" },
      { label: "Tag", href: "/components/tag" },
      { label: "Tooltip", href: "/components/tooltip" },
      { label: "Toast", href: "/components/toast" },
      { label: "Menu", href: "/components/menu" },
    ],
  },
] as const

/* Flat ordered list of navigable pages */
const allPages = navGroups.flatMap((g) =>
  g.items.filter((i): i is typeof i & { href: string } => "href" in i)
)

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  /* Prev / Next */
  const currentIndex = allPages.findIndex((p) => p.href === pathname)
  const prev = currentIndex > 0 ? allPages[currentIndex - 1] : null
  const next =
    currentIndex >= 0 && currentIndex < allPages.length - 1
      ? allPages[currentIndex + 1]
      : null

  /* Breadcrumb */
  const segments = pathname.split("/").filter(Boolean)
  const pageName = segments[segments.length - 1]
  const breadcrumb = pageName
    ? pageName.charAt(0).toUpperCase() + pageName.slice(1)
    : null

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
            aria-label="View source on GitHub"
          >
            GitHub
          </a>
        </Button>
      </header>

      <div className="flex-1 w-full flex">
        {/* Left sidebar */}
        <Menu
          className="hidden lg:flex w-56 shrink-0 pt-[var(--layout-padding-lg)] pb-16 px-[var(--layout-padding-lg)] sticky top-14 h-[calc(100svh-3.5rem)] overflow-y-auto"
          style={{
            background: "var(--background-base)",
            borderRight:
              "var(--layout-border-thin) solid var(--border-default)",
          }}
        >
          {navGroups.map((group) => (
            <MenuGroup key={group.label} label={group.label}>
              {group.items.map((item) => {
                const href = "href" in item ? item.href : undefined
                const isActive = href === pathname
                return href ? (
                  <MenuItem
                    key={item.label}
                    size="sm"
                    isActive={isActive}
                    asChild
                  >
                    <Link
                      href={href}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </MenuItem>
                ) : (
                  <MenuItem key={item.label} size="sm" isDisabled>
                    {item.label}
                  </MenuItem>
                )
              })}
            </MenuGroup>
          ))}
        </Menu>

        {/* Main content area */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Breadcrumb */}
          {breadcrumb && (
            <div className="px-8 lg:px-16 xl:px-20 pt-6">
              <nav
                className="text-content-caption font-accent flex items-center gap-1.5"
                style={{ color: "var(--text-base-moderate)" }}
                aria-label="Breadcrumb"
              >
                <span>Components</span>
                <span aria-hidden>/</span>
                <span style={{ color: "var(--text-base-strong)" }}>
                  {breadcrumb}
                </span>
              </nav>
            </div>
          )}

          {/* Page content */}
          <div className="flex-1 flex">{children}</div>

          {/* Prev / Next */}
          {(prev || next) && (
            <nav
              className="flex items-center justify-between px-8 lg:px-16 xl:px-20 py-10"
              style={{
                borderTop:
                  "var(--layout-border-thin) solid var(--border-default)",
              }}
              aria-label="Component navigation"
            >
              {prev ? (
                <Link
                  href={prev.href}
                  className="flex items-center gap-2 text-content-note font-accent group"
                  style={{ color: "var(--text-base-moderate)" }}
                >
                  <ChevronLeft
                    className="size-4 transition-transform group-hover:-translate-x-0.5"
                    aria-hidden
                  />
                  <div className="flex flex-col">
                    <span className="text-content-caption">Previous</span>
                    <span style={{ color: "var(--text-base-strong)" }}>
                      {prev.label}
                    </span>
                  </div>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={next.href}
                  className="flex items-center gap-2 text-content-note font-accent group text-right"
                  style={{ color: "var(--text-base-moderate)" }}
                >
                  <div className="flex flex-col">
                    <span className="text-content-caption">Next</span>
                    <span style={{ color: "var(--text-base-strong)" }}>
                      {next.label}
                    </span>
                  </div>
                  <ChevronRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              ) : (
                <span />
              )}
            </nav>
          )}
        </div>
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
