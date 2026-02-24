"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
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
      { label: "Input" },
      { label: "Card" },
      { label: "Dialog" },
      { label: "Dropdown" },
    ],
  },
] as const

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <Menu className="sticky top-20">
      {navGroups.map((group) => (
        <MenuGroup key={group.label} label={group.label}>
          {group.items.map((item) => {
            const href = "href" in item ? item.href : undefined
            const isActive = href === pathname
            return href ? (
              <MenuItem key={item.label} size="sm" active={isActive} asChild>
                <Link href={href}>{item.label}</Link>
              </MenuItem>
            ) : (
              <MenuItem key={item.label} size="sm" disabled>
                {item.label}
              </MenuItem>
            )
          })}
        </MenuGroup>
      ))}
    </Menu>
  )
}
