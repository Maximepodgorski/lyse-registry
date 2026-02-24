"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/registry/new-york/ui/button/button"
import {
  Menu,
  MenuGroup,
  MenuItem,
} from "@/registry/new-york/ui/menu/menu"
import { Toaster } from "@/registry/new-york/ui/toast/toast"

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
        className="sticky top-0 z-10 px-[var(--layout-padding-2xl)] h-14 flex items-center justify-between backdrop-blur-md"
        style={{
          background:
            "color-mix(in srgb, var(--background-base) 80%, transparent)",
          borderBottom:
            "var(--layout-border-thin) solid var(--border-default)",
        }}
      >
        <Image src="/logo.svg" alt="Lyse UI" width={66} height={28} className="h-[1.75rem] w-auto" />
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
          className="hidden lg:flex w-56 shrink-0 pt-[var(--layout-padding-lg)] pb-[var(--root-space-11)] px-[var(--layout-padding-lg)] sticky top-14 h-[calc(100svh-3.5rem)] overflow-y-auto"
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
            <div className="px-[var(--layout-padding-3xl)] lg:px-[var(--root-space-11)] xl:px-[var(--root-space-12)] pt-[var(--layout-padding-2xl)]">
              <nav
                className="text-content-caption font-accent flex items-center gap-[var(--layout-padding-sm)]"
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
              className="flex items-center justify-between px-[var(--layout-padding-3xl)] lg:px-[var(--root-space-11)] xl:px-[var(--root-space-12)] py-[var(--layout-padding-4xl)]"
              style={{
                borderTop:
                  "var(--layout-border-thin) solid var(--border-default)",
              }}
              aria-label="Component navigation"
            >
              {prev ? (
                <Link
                  href={prev.href}
                  className="flex items-center gap-[var(--layout-gap-md)] text-content-note font-accent group"
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
                  className="flex items-center gap-[var(--layout-gap-md)] text-content-note font-accent group text-right"
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
        className="px-[var(--layout-padding-2xl)] py-[var(--layout-padding-2xl)] text-center text-content-caption"
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

      <Toaster />
    </div>
  )
}
