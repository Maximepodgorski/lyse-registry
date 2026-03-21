"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight, Menu as MenuIcon, Search } from "lucide-react"

import { CommandPalette } from "@/app/_components/command-palette"
import { GitHubLogo } from "@/app/_components/github-logo"
import { MobileNav } from "@/app/_components/mobile-nav"
import { ThemeToggle } from "@/app/_components/theme-toggle"
import { Button } from "@/registry/new-york/ui/button/button"
import { Badge } from "@/registry/new-york/ui/badge/badge"
import { navGroups, allPages } from "@/lib/navigation"
import {
  Menu,
  MenuGroup,
  MenuItem,
} from "@/registry/new-york/ui/menu/menu"
import { Toaster } from "@/registry/new-york/ui/toast/toast"

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false)
  const [paletteOpen, setPaletteOpen] = React.useState(false)
  const hamburgerRef = React.useRef<HTMLButtonElement>(null)

  /* Detect Mac for ⌘ vs Ctrl display */
  const [isMac, setIsMac] = React.useState(false)
  React.useEffect(() => {
    setIsMac(navigator.userAgent.includes("Mac"))
  }, [])

  /* Global keyboard shortcuts: Cmd+K / Ctrl+K / "/" */
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      /* Cmd+K or Ctrl+K */
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        if (mobileNavOpen) setMobileNavOpen(false)
        setPaletteOpen((prev) => !prev)
        return
      }
      /* "/" — only when not in an input */
      if (
        e.key === "/" &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement) &&
        !(e.target instanceof HTMLSelectElement) &&
        !(e.target as HTMLElement)?.isContentEditable
      ) {
        e.preventDefault()
        if (mobileNavOpen) setMobileNavOpen(false)
        setPaletteOpen(true)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [mobileNavOpen])

  /* Prev / Next */
  const currentIndex = allPages.findIndex((p) => p.href === pathname)
  const prev = currentIndex > 0 ? allPages[currentIndex - 1] : null
  const next =
    currentIndex >= 0 && currentIndex < allPages.length - 1
      ? allPages[currentIndex + 1]
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
        <div className="flex items-center gap-[var(--layout-gap-sm)]">
          <button
            ref={hamburgerRef}
            type="button"
            className="lg:hidden flex items-center justify-center size-8 rounded-[var(--layout-radius-md)] cursor-pointer"
            style={{ color: "var(--text-base-moderate)" }}
            aria-label={mobileNavOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMobileNavOpen(true)}
          >
            <MenuIcon className="size-5" aria-hidden="true" />
          </button>
          <div className="flex items-center gap-[var(--layout-gap-md)]">
            <div className="relative h-[1.75rem] w-[66px]">
              <Image src="/logo.svg" alt="Lyse UI" width={66} height={28} className="h-[1.75rem] w-auto dark:block hidden" />
              <Image src="/logo-dark.svg" alt="Lyse UI" width={66} height={28} className="h-[1.75rem] w-auto dark:hidden block" />
            </div>
            <Badge variant="neutral" size="sm">v1.1</Badge>
          </div>
        </div>
        <div className="flex items-center gap-[var(--layout-gap-md)]">
          <button
            type="button"
            onClick={() => {
              if (mobileNavOpen) setMobileNavOpen(false)
              setPaletteOpen(true)
            }}
            className="flex items-center gap-[var(--layout-gap-sm)] h-8 sm:w-40 px-[var(--layout-padding-sm)] sm:px-[var(--layout-padding-md)] rounded-[var(--layout-radius-lg)] cursor-pointer text-content-caption font-accent"
            style={{
              color: "var(--text-base-moderate)",
              background: "var(--background-neutral-faint-default)",
              border: "var(--layout-border-thin) solid var(--border-default)",
            }}
            aria-label="Search pages"
          >
            <Search className="size-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Search...</span>
            <kbd
              className="hidden sm:inline-flex items-center justify-center h-[var(--layout-size-sm)] px-[var(--layout-padding-xs)] text-content-caption font-mono rounded-[var(--layout-radius-sm)] ml-auto"
              style={{
                color: "var(--text-base-medium)",
                border: "var(--layout-border-thin) solid var(--border-default)",
              }}
            >
              {isMac ? "⌘K" : "Ctrl K"}
            </kbd>
          </button>
          <ThemeToggle />
          <Button variant="terciary" size="sm" asChild>
            <a
              href="https://github.com/Maximepodgorski/lyse-registry"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source on GitHub"
            >
              <GitHubLogo className="size-4" />{" "}
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </Button>
        </div>
      </header>

      <MobileNav
        navGroups={navGroups}
        open={mobileNavOpen}
        onClose={() => {
          setMobileNavOpen(false)
          hamburgerRef.current?.focus()
        }}
      />

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />

      <div className="flex-1 w-full flex" inert={mobileNavOpen || undefined}>
        {/* Left sidebar */}
        <div
          className="hidden lg:block w-56 shrink-0 sticky top-14 h-[calc(100svh-3.5rem)] relative"
          style={{
            background: "var(--background-base)",
            borderRight:
              "var(--layout-border-thin) solid var(--border-default)",
          }}
        >
          <Menu
            className="flex w-full h-full pt-[var(--layout-padding-2xl)] pb-[var(--layout-padding-4xl)] pl-[var(--layout-padding-lg)] pr-[var(--layout-padding-md)] overflow-y-auto gap-[var(--layout-gap-2xl)]"
          >
          {navGroups.map((group) => (
            <MenuGroup key={group.label} label={group.label}>
              {group.items.map((item) => {
                const isCurrent = item.href === pathname
                const isNew = ["Stepper"].includes(item.label)
                return (
                  <MenuItem
                    key={item.label}
                    size="sm"
                    active={isCurrent}
                    asChild
                  >
                    <Link
                      href={item.href}
                      aria-current={isCurrent ? "page" : undefined}
                    >
                      <span className="flex-1 min-w-0 text-start">{item.label}</span>
                      {isNew && (
                        <Badge variant="brand" size="sm">new</Badge>
                      )}
                    </Link>
                  </MenuItem>
                )
              })}
            </MenuGroup>
          ))}
          </Menu>
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 backdrop-blur-[1px]"
            style={{
              background:
                "linear-gradient(to top, var(--background-base) 25%, transparent)",
              maskImage:
                "linear-gradient(to top, black 50%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to top, black 50%, transparent)",
            }}
          />
        </div>

        {/* Main content area */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Page content */}
          <div className="flex-1 flex">{children}</div>

          {/* Prev / Next */}
          {(prev || next) && (
            <nav
              className="flex items-center justify-between px-[var(--layout-padding-xl)] sm:px-[var(--layout-padding-3xl)] lg:px-[var(--layout-padding-4xl)] xl:px-[var(--layout-padding-5xl)] py-[var(--layout-padding-4xl)]"
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
                  style={{ color: "var(--text-base-bolder)" }}
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
                  style={{ color: "var(--text-base-bolder)" }}
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
        inert={mobileNavOpen || undefined}
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
          style={{ color: "var(--text-brand-moderate)" }}
        >
          Lyse Labs
        </a>
      </footer>

      <Toaster />
    </div>
  )
}
