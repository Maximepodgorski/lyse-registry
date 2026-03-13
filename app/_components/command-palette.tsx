"use client"

import "./command-palette.css"
import * as React from "react"
import { useRouter } from "next/navigation"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Command } from "cmdk"
import { Search } from "lucide-react"

import { navGroups, type NavGroup } from "@/lib/navigation"
import { TooltipShortcut } from "@/registry/new-york/ui/tooltip/tooltip"

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const router = useRouter()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [search, setSearch] = React.useState("")

  /* Reset state synchronously on open (prevents stale query flash) */
  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      if (next) setSearch("")
      onOpenChange(next)
    },
    [onOpenChange]
  )

  /* Two-stage Escape: first clears query, second closes dialog */
  function handleEscapeKeyDown(e: KeyboardEvent) {
    if (search) {
      e.preventDefault()
      setSearch("")
    }
    /* If search is empty, let Radix handle the close natively */
  }

  /* Navigate on item select */
  function handleSelect(href: string) {
    onOpenChange(false)
    router.push(href)
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          data-slot="command-palette-overlay"
          className="command-palette-overlay fixed inset-0 z-50 animate-in fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
        />
        <DialogPrimitive.Content
          data-slot="command-palette"
          className="command-palette-content fixed left-1/2 top-[20%] z-50 w-[min(32rem,calc(100vw-2rem))] -translate-x-1/2 animate-in fade-in-0 slide-in-from-top-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2"
          onEscapeKeyDown={handleEscapeKeyDown}
        >
          <DialogPrimitive.Title className="sr-only">Search pages</DialogPrimitive.Title>
          <Command label="Search pages" className="command-palette-root flex flex-col overflow-hidden rounded-[var(--layout-radius-xl)]">
            {/* Search input */}
            <div className="command-palette-input-wrapper flex items-center gap-[var(--layout-gap-md)] px-[var(--layout-padding-lg)]">
              <Search
                className="size-4 shrink-0"
                style={{ color: "var(--text-base-moderate)" }}
                aria-hidden="true"
              />
              <Command.Input
                ref={inputRef}
                value={search}
                onValueChange={setSearch}
                placeholder="Search pages..."
                className="command-palette-input flex-1 h-12 bg-transparent text-content-note outline-none placeholder:text-[var(--text-base-faint)]"
              />
              <TooltipShortcut className="shrink-0 hidden sm:inline-flex">
                ESC
              </TooltipShortcut>
            </div>

            {/* Results */}
            <Command.List className="command-palette-list max-h-[min(20rem,50vh)] overflow-y-auto p-[var(--layout-padding-sm)]">
              <Command.Empty className="command-palette-empty flex items-center justify-center py-[var(--layout-padding-3xl)] text-content-note">
                No results for &ldquo;{search}&rdquo;
              </Command.Empty>

              {navGroups.map((group: NavGroup) => (
                <Command.Group
                  key={group.label}
                  heading={group.label}
                  className="command-palette-group"
                >
                  {group.items.map((item) => (
                    <Command.Item
                      key={item.href}
                      value={item.label}
                      keywords={item.keywords as string[]}
                      onSelect={() => handleSelect(item.href)}
                      className="command-palette-item flex items-start gap-[var(--layout-gap-md)] px-[var(--layout-padding-md)] py-[var(--layout-padding-sm)] rounded-[var(--layout-radius-md)] cursor-pointer min-h-[2.75rem]"
                    >
                      <span className="command-palette-hash text-content-caption shrink-0 leading-[1.5rem]" aria-hidden="true">#</span>
                      <div className="flex flex-col min-w-0">
                        <span className="text-content-note font-accent truncate" style={{ color: "var(--text-base-strong)" }}>
                          {item.label}
                        </span>
                        {item.description && (
                          <span className="text-content-caption truncate" style={{ color: "var(--text-base-moderate)" }}>
                            {item.description}
                          </span>
                        )}
                      </div>
                    </Command.Item>
                  ))}
                </Command.Group>
              ))}
            </Command.List>
          </Command>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
