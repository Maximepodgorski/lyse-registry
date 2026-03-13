"use client"

import "./mobile-nav.css"
import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { X } from "lucide-react"

import type { NavGroup } from "@/lib/navigation"
import {
  Menu,
  MenuGroup,
  MenuItem,
} from "@/registry/new-york/ui/menu/menu"

export function MobileNav({
  navGroups,
  open,
  onClose,
}: {
  navGroups: readonly NavGroup[]
  open: boolean
  onClose: () => void
}) {
  const pathname = usePathname()
  const dialogRef = React.useRef<HTMLDialogElement>(null)
  const closeButtonRef = React.useRef<HTMLButtonElement>(null)
  const activeItemRef = React.useRef<HTMLAnchorElement>(null)

  /* Open / close the native dialog */
  React.useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) {
      dialog.showModal()
      /* Focus close button, then scroll active item into view */
      closeButtonRef.current?.focus()
      requestAnimationFrame(() => {
        activeItemRef.current?.scrollIntoView({ block: "center", behavior: "instant" })
      })
      /* Lock body scroll */
      document.body.style.overflow = "hidden"
    } else if (!open && dialog.open) {
      dialog.close()
      document.body.style.overflow = ""
    }
  }, [open])

  /* Close on route change */
  React.useEffect(() => {
    if (open) onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  /* Close on viewport crossing lg (1024px) */
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    const handler = () => { if (mq.matches && open) onClose() }
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [open, onClose])

  /* Handle backdrop click (native dialog doesn't auto-close on backdrop) */
  function handleDialogClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) {
      onClose()
    }
  }

  /* Handle native cancel event (Escape key) */
  function handleCancel(e: React.SyntheticEvent<HTMLDialogElement>) {
    e.preventDefault()
    onClose()
  }

  /* Cleanup body overflow on unmount */
  React.useEffect(() => {
    return () => { document.body.style.overflow = "" }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      aria-label="Navigation"
      className="mobile-nav-dialog"
      onClick={handleDialogClick}
      onCancel={handleCancel}
    >
      <div className="mobile-nav-panel" data-slot="mobile-nav">
        {/* Header */}
        <div className="flex items-center justify-between h-14 px-[var(--layout-padding-lg)] shrink-0">
          <span
            className="text-content-note font-accent"
            style={{ color: "var(--text-base-strong)" }}
          >
            Navigation
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="mobile-nav-close flex items-center justify-center size-8 rounded-[var(--layout-radius-md)] cursor-pointer"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-[var(--layout-padding-lg)] pb-[var(--layout-padding-4xl)]">
          <Menu className="flex w-full flex-col gap-[var(--layout-gap-2xl)]">
            {navGroups.map((group) => (
              <MenuGroup key={group.label} label={group.label}>
                {group.items.map((item) => {
                  const isCurrent = item.href === pathname
                  return (
                    <MenuItem
                      key={item.label}
                      size="sm"
                      active={isCurrent}
                      asChild
                    >
                      <Link
                        ref={isCurrent ? activeItemRef : undefined}
                        href={item.href}
                        aria-current={isCurrent ? "page" : undefined}
                        onClick={onClose}
                      >
                        {item.label}
                      </Link>
                    </MenuItem>
                  )
                })}
              </MenuGroup>
            ))}
          </Menu>
        </nav>
      </div>
    </dialog>
  )
}
