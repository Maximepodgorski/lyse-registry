"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

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
      { label: "Input" },
      { label: "Badge" },
      { label: "Card" },
      { label: "Dialog" },
      { label: "Dropdown" },
    ],
  },
] as const

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-20 flex flex-col gap-6">
      {navGroups.map((group) => (
        <div key={group.label} className="flex flex-col gap-2">
          <span
            className="text-content-caption font-bold uppercase tracking-wider"
            style={{ color: "var(--text-base-moderate)" }}
          >
            {group.label}
          </span>
          <ul className="flex flex-col gap-1.5">
            {group.items.map((item) => {
              const href = "href" in item ? item.href : undefined
              const isActive = href === pathname
              return (
                <li key={item.label}>
                  {href ? (
                    <Link
                      href={href}
                      className={`text-content-note ${isActive ? "font-accent" : ""}`}
                      style={{
                        color: isActive
                          ? "var(--text-base-strong)"
                          : "var(--text-base-moderate)",
                      }}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span
                      className="text-content-note"
                      style={{ color: "var(--text-base-moderate)" }}
                    >
                      {item.label}
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}
