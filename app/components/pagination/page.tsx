"use client"

import { useState } from "react"
import Link from "next/link"
import { Copy, ExternalLink } from "lucide-react"
import { toast } from "@/registry/new-york/ui/toast/toast"
import { Button } from "@/registry/new-york/ui/button/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationStatus,
  PaginationEllipsis,
} from "@/registry/new-york/ui/pagination/pagination"
import { ComponentPreview } from "@/app/_components/component-preview"
import { DosDonts, type DosDontsItem } from "@/app/_components/dos-donts"
import { PropsTable, type PropDef } from "@/app/_components/props-table"
import {
  TableOfContents,
  type TocSection,
} from "@/app/_components/table-of-contents"
import { CodeBlock } from "@/app/_components/code-block"

/* ----------------------------------------------------------------
 * Data
 * ---------------------------------------------------------------- */

const importCode = `import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationStatus,
  PaginationEllipsis,
} from '@/components/ui/pagination'

export default function Example() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem className="hidden sm:flex">
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem className="hidden sm:flex">
          <PaginationLink href="#" isActive>2</PaginationLink>
        </PaginationItem>
        <PaginationItem className="hidden sm:flex">
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem className="hidden sm:flex">
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem className="hidden sm:flex">
          <PaginationLink href="#">12</PaginationLink>
        </PaginationItem>
        <PaginationStatus current={2} total={12} />
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}`

const overviewSections: TocSection[] = [
  { id: "default", label: "Default" },
  { id: "ellipsis", label: "Ellipsis (Long Range)" },
  { id: "sizes", label: "Sizes" },
  { id: "disabled", label: "Disabled Edges" },
  { id: "with-nextjs-link", label: "With Next.js Link" },
  { id: "i18n", label: "Custom Status Format" },
]

/* ----------------------------------------------------------------
 * Demos
 * ---------------------------------------------------------------- */

function DefaultDemo() {
  const [page, setPage] = useState(2)
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setPage((p) => Math.max(1, p - 1))
            }}
            aria-disabled={page === 1 || undefined}
          />
        </PaginationItem>
        {[1, 2, 3, 4, 5].map((n) => (
          <PaginationItem key={n} className="hidden sm:flex">
            <PaginationLink
              href="#"
              isActive={page === n}
              onClick={(e) => {
                e.preventDefault()
                setPage(n)
              }}
            >
              {n}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationStatus current={page} total={5} />
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setPage((p) => Math.min(5, p + 1))
            }}
            aria-disabled={page === 5 || undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

function EllipsisDemo() {
  const total = 20
  const [page, setPage] = useState(8)

  // Simple range helper: show first, last, current ± 1, ellipsis between gaps
  const range = computeRange(page, total)

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setPage((p) => Math.max(1, p - 1))
            }}
            aria-disabled={page === 1 || undefined}
          />
        </PaginationItem>
        {range.map((item, i) =>
          item === "..." ? (
            <PaginationItem key={`ellipsis-${i}`} className="hidden sm:flex">
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item} className="hidden sm:flex">
              <PaginationLink
                href="#"
                isActive={page === item}
                onClick={(e) => {
                  e.preventDefault()
                  setPage(item)
                }}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationStatus current={page} total={total} />
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setPage((p) => Math.min(total, p + 1))
            }}
            aria-disabled={page === total || undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

function computeRange(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const items: (number | "...")[] = [1]
  if (current > 3) items.push("...")
  for (
    let i = Math.max(2, current - 1);
    i <= Math.min(total - 1, current + 1);
    i++
  ) {
    items.push(i)
  }
  if (current < total - 2) items.push("...")
  items.push(total)
  return items
}

function SizesDemo() {
  return (
    <div className="flex flex-col gap-6">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" size="sm" />
          </PaginationItem>
          {[1, 2, 3].map((n) => (
            <PaginationItem key={n}>
              <PaginationLink href="#" size="sm" isActive={n === 2}>
                {n}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext href="#" size="sm" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" size="md" />
          </PaginationItem>
          {[1, 2, 3].map((n) => (
            <PaginationItem key={n}>
              <PaginationLink href="#" size="md" isActive={n === 2}>
                {n}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext href="#" size="md" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

function DisabledDemo() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" aria-disabled="true" tabIndex={-1} />
        </PaginationItem>
        <PaginationItem className="hidden sm:flex">
          <PaginationLink href="#" isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className="hidden sm:flex">
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem className="hidden sm:flex">
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationStatus current={1} total={3} />
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

function NextLinkDemo() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious asChild>
            <Link href="#prev">
              <span aria-hidden="true">‹</span>
              <span className="hidden sm:inline-block">Previous</span>
            </Link>
          </PaginationPrevious>
        </PaginationItem>
        <PaginationItem className="hidden sm:flex">
          <PaginationLink asChild>
            <Link href="#1">1</Link>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className="hidden sm:flex">
          <PaginationLink asChild isActive>
            <Link href="#2">2</Link>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className="hidden sm:flex">
          <PaginationLink asChild>
            <Link href="#3">3</Link>
          </PaginationLink>
        </PaginationItem>
        <PaginationStatus current={2} total={3} />
        <PaginationItem>
          <PaginationNext asChild>
            <Link href="#next">
              <span className="hidden sm:inline-block">Next</span>
              <span aria-hidden="true">›</span>
            </Link>
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

function I18nDemo() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" aria-label="Page précédente">
            Précédent
          </PaginationPrevious>
        </PaginationItem>
        <PaginationStatus
          current={3}
          total={12}
          format={(c, t) => `Page ${c} sur ${t}`}
          className="!flex"
        />
        <PaginationItem>
          <PaginationNext href="#" aria-label="Page suivante">
            Suivant
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

/* ----------------------------------------------------------------
 * Props
 * ---------------------------------------------------------------- */

const paginationProps: PropDef[] = [
  {
    name: "className",
    type: ["string"],
    description: "Additional class names merged via cn().",
  },
]

const paginationContentProps: PropDef[] = [
  {
    name: "className",
    type: ["string"],
    description: "Additional class names merged via cn().",
  },
]

const paginationItemProps: PropDef[] = [
  {
    name: "className",
    type: ["string"],
    description: "Additional class names merged via cn().",
  },
]

const paginationLinkProps: PropDef[] = [
  {
    name: "isActive",
    type: ["boolean"],
    default: "false",
    description:
      "Marks the current page. Sets aria-current=\"page\", applies active style, and uses \"Page {n}\" aria-label.",
  },
  {
    name: "size",
    type: [`"sm"`, `"md"`],
    default: `"md"`,
    description:
      "Sizing scale (dense-control density: 24px / 32px). NOT aligned with Button.",
  },
  {
    name: "asChild",
    type: ["boolean"],
    default: "false",
    description: "Render as child element via Radix Slot (e.g., Next.js Link).",
  },
  {
    name: "href",
    type: ["string"],
    description: "Link destination URL.",
  },
  {
    name: "className",
    type: ["string"],
    description: "Additional class names merged via cn().",
  },
]

const paginationPrevNextProps: PropDef[] = [
  {
    name: "size",
    type: [`"sm"`, `"md"`],
    default: `"md"`,
    description: "Sizing scale matching PaginationLink.",
  },
  {
    name: "asChild",
    type: ["boolean"],
    default: "false",
    description: "Render as child element via Radix Slot.",
  },
  {
    name: "children",
    type: ["ReactNode"],
    default: `"Previous" / "Next"`,
    description:
      "Custom label. Pass null for icon-only. Hidden on mobile via sm: breakpoint.",
  },
  {
    name: "aria-label",
    type: ["string"],
    default: `"Go to previous page" / "Go to next page"`,
    description: "Accessible name. Override for i18n.",
  },
  {
    name: "className",
    type: ["string"],
    description: "Additional class names merged via cn().",
  },
]

const paginationStatusProps: PropDef[] = [
  {
    name: "current",
    type: ["number"],
    description: "Current page (1-indexed). Required.",
  },
  {
    name: "total",
    type: ["number"],
    description: "Total page count. Required.",
  },
  {
    name: "format",
    type: ["(current: number, total: number) => ReactNode"],
    default: "(c, t) => `Page ${c} of ${t}`",
    description: "Override label for i18n or custom format (e.g., \"3/12\").",
  },
  {
    name: "className",
    type: ["string"],
    description:
      "Additional class names. By default visible only on mobile (<sm). Override to show on desktop.",
  },
]

const paginationEllipsisProps: PropDef[] = [
  {
    name: "children",
    type: ["ReactNode"],
    default: "MoreHorizontal icon + sr-only \"More pages\"",
    description:
      "Override icon. Pass custom content for richer SR announcements (e.g., \"Pages 7 to 17 skipped\").",
  },
  {
    name: "className",
    type: ["string"],
    description: "Additional class names merged via cn().",
  },
]

/* ----------------------------------------------------------------
 * Dos & Donts
 * ---------------------------------------------------------------- */

const dosDontsItems: DosDontsItem[] = [
  {
    do: {
      preview: (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem className="hidden sm:flex">
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem className="hidden sm:flex">
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className="hidden sm:flex">
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem className="hidden sm:flex">
              <PaginationLink href="#">20</PaginationLink>
            </PaginationItem>
            <PaginationStatus current={2} total={20} />
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ),
      description:
        "Use ellipsis for long ranges. Show first, last, and current ± 1.",
    },
    dont: {
      preview: (
        <Pagination>
          <PaginationContent>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <PaginationItem key={n} className="hidden sm:flex">
                <PaginationLink href="#" isActive={n === 1}>
                  {n}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      ),
      description: "Don't render every page when total exceeds ~7 — collapse with ellipsis.",
    },
  },
  {
    do: {
      preview: (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" aria-disabled="true" tabIndex={-1} />
            </PaginationItem>
            <PaginationItem className="hidden sm:flex">
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className="hidden sm:flex">
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationStatus current={1} total={2} />
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ),
      description:
        "Mark unreachable Prev/Next as aria-disabled with tabIndex={-1} — CSS handles styling.",
    },
    dont: {
      preview: (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem className="hidden sm:flex">
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className="hidden sm:flex">
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationStatus current={1} total={2} />
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ),
      description: "Don't leave Prev active on page 1 — users will navigate to a non-existent previous page.",
    },
  },
]

/* ----------------------------------------------------------------
 * Tabs
 * ---------------------------------------------------------------- */

function OverviewTab() {
  return (
    <div className="flex flex-col gap-12">
      <ComponentPreview
        id="default"
        title="Default"
        description="Pagination with prev/next and numbered page links. Mobile collapses to PaginationStatus automatically."
      >
        <DefaultDemo />
      </ComponentPreview>

      <ComponentPreview
        id="ellipsis"
        title="Ellipsis (Long Range)"
        description="For ranges >7 pages, collapse the middle with PaginationEllipsis. Consumer computes the visible range."
      >
        <EllipsisDemo />
      </ComponentPreview>

      <ComponentPreview
        id="sizes"
        title="Sizes"
        description="Two sizes: sm (24px) for dense desktop tables, md (32px) for general use. Aligned with Tag/Chip/Menu density, NOT Button."
      >
        <SizesDemo />
      </ComponentPreview>

      <ComponentPreview
        id="disabled"
        title="Disabled Edges"
        description={`Apply aria-disabled="true" + tabIndex={-1} to Prev on first page or Next on last page. CSS auto-handles disabled styling.`}
      >
        <DisabledDemo />
      </ComponentPreview>

      <ComponentPreview
        id="with-nextjs-link"
        title="With Next.js Link"
        description="Use asChild to render as a Next.js Link for client-side navigation."
      >
        <NextLinkDemo />
      </ComponentPreview>

      <ComponentPreview
        id="i18n"
        title="Custom Status Format"
        description="PaginationStatus accepts a format function for i18n or custom presentation."
      >
        <I18nDemo />
      </ComponentPreview>
    </div>
  )
}

function DocumentationTab() {
  return (
    <div className="flex flex-col gap-12">
      <DosDonts id="dos-donts" items={dosDontsItems} />
    </div>
  )
}

/* ----------------------------------------------------------------
 * Page
 * ---------------------------------------------------------------- */

type Tab = "overview" | "props" | "documentation"

export default function PaginationPageDoc() {
  const [tab, setTab] = useState<Tab>("overview")

  return (
    <>
      <main className="flex-1 min-w-0 py-16 flex flex-col gap-10 max-w-none px-5 sm:px-8 lg:px-16 xl:px-20">
        {/* Hero */}
        <div className="flex flex-col gap-3">
          <h1
            className="font-bold"
            style={{ color: "var(--text-base-strong)", fontSize: "var(--root-font-size-5xl)" }}
          >
            Pagination
          </h1>
          <p
            className="text-content-highlight"
            style={{ color: "var(--text-base-bolder)" }}
          >
            Page navigation for paginated results. Built-in mobile collapse via
            PaginationStatus. Compound component with 8 sub-components.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add https://ui.getlyse.com/r/pagination.json")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <><Copy /> Copy install command</>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a
                href="https://v0.app/chat?q=add%20component%20from%20https%3A%2F%2Fui.getlyse.com%2Fr%2Fpagination.json"
                target="_blank"
                rel="noopener noreferrer"
              >
                Add to v0.dev <ExternalLink />
              </a>
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-col gap-10">
          <div
            className="flex items-center gap-1 pb-px"
            style={{
              borderBottom:
                "var(--layout-border-thin) solid var(--border-default)",
            }}
          >
            {(
              [
                { key: "overview" as Tab, label: "Overview" },
                { key: "props" as Tab, label: "Props" },
                { key: "documentation" as Tab, label: "Best practices" },
              ] as const
            ).map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className="text-content-note font-accent px-4 py-2 -mb-px transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
                style={{
                  color:
                    tab === t.key
                      ? "var(--text-base-strong)"
                      : "var(--text-base-moderate)",
                  borderBottom:
                    tab === t.key
                      ? "2px solid var(--text-base-strong)"
                      : "2px solid transparent",
                  transition: "color 150ms ease, border-color 150ms ease",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === "overview" && (
            <CodeBlock
              preview={<DefaultDemo />}
              codeString={importCode}
              language="tsx"
            />
          )}

          {tab === "overview" ? (
            <OverviewTab />
          ) : tab === "props" ? (
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h2 className="text-heading-small font-accent" style={{ color: "var(--text-base-strong)" }}>Pagination</h2>
                <PropsTable propDefs={paginationProps} />
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-heading-small font-accent" style={{ color: "var(--text-base-strong)" }}>PaginationContent</h2>
                <PropsTable propDefs={paginationContentProps} />
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-heading-small font-accent" style={{ color: "var(--text-base-strong)" }}>PaginationItem</h2>
                <PropsTable propDefs={paginationItemProps} />
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-heading-small font-accent" style={{ color: "var(--text-base-strong)" }}>PaginationLink</h2>
                <PropsTable propDefs={paginationLinkProps} />
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-heading-small font-accent" style={{ color: "var(--text-base-strong)" }}>PaginationPrevious / PaginationNext</h2>
                <PropsTable propDefs={paginationPrevNextProps} />
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-heading-small font-accent" style={{ color: "var(--text-base-strong)" }}>PaginationStatus</h2>
                <PropsTable propDefs={paginationStatusProps} />
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-heading-small font-accent" style={{ color: "var(--text-base-strong)" }}>PaginationEllipsis</h2>
                <PropsTable propDefs={paginationEllipsisProps} />
              </div>
            </div>
          ) : (
            <DocumentationTab />
          )}
        </div>
      </main>

      <TableOfContents sections={tab === "overview" ? overviewSections : []} />
    </>
  )
}
