"use client"

import { useState } from "react"
import { Skeleton } from "@/registry/new-york/ui/skeleton/skeleton"
import { toast } from "@/registry/new-york/ui/toast/toast"
import { Copy, ExternalLink } from "lucide-react"
import { Button } from "@/registry/new-york/ui/button/button"
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

const importCode = `import { Skeleton } from '@/components/ui/skeleton'

export default function Example() {
  return <Skeleton />
}`

const overviewSections: TocSection[] = [
  { id: "default", label: "Default" },
  { id: "shapes", label: "Shapes" },
  { id: "sizes", label: "Sizes" },
  { id: "static", label: "Static (No Animation)" },
  { id: "card-skeleton", label: "Card Skeleton" },
  { id: "list-skeleton", label: "List Item Skeleton" },
]

const bestPracticesSections: TocSection[] = [
  { id: "dos-donts", label: "Do's and Don'ts" },
]

const dosDontsItems: DosDontsItem[] = [
  {
    do: {
      preview: (
        <div className="flex flex-col gap-3 w-full">
          <Skeleton shape="circle" className="size-10" />
          <Skeleton shape="text" />
          <Skeleton shape="text" className="w-2/3" />
        </div>
      ),
      description:
        "Match skeleton dimensions to the real content they replace.",
    },
    dont: {
      preview: (
        <Skeleton className="h-24 w-full" />
      ),
      description:
        "A single full-width rectangle misleads users about the content shape.",
    },
  },
  {
    do: {
      preview: (
        <div role="status" aria-live="polite" className="w-full">
          <span className="sr-only">Loading content</span>
          <div className="flex flex-col gap-3">
            <Skeleton shape="text" />
            <Skeleton shape="text" className="w-3/4" />
          </div>
        </div>
      ),
      description:
        'Wrap skeleton groups in a role="status" container with a screen reader label.',
    },
    dont: {
      preview: (
        <div className="flex flex-col gap-3 w-full">
          <Skeleton shape="text" />
          <Skeleton shape="text" className="w-3/4" />
        </div>
      ),
      description:
        "Without an accessible loading announcement, screen reader users get no feedback.",
    },
  },
  {
    do: {
      preview: (
        <div className="flex items-center gap-3 w-full">
          <Skeleton shape="circle" className="size-8" />
          <div className="flex-1 flex flex-col gap-2">
            <Skeleton shape="text" className="w-1/3" />
            <Skeleton shape="text" className="w-2/3" />
          </div>
        </div>
      ),
      description:
        "Match skeleton shapes to the content they represent (circle for avatars, text for lines).",
    },
    dont: {
      preview: (
        <div className="flex items-center gap-3 w-full">
          <Skeleton className="size-8" />
          <div className="flex-1 flex flex-col gap-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ),
      description:
        "Using rect for avatars breaks the visual match — circle follows the actual content shape.",
    },
  },
]

const propDefs: PropDef[] = [
  {
    name: "shape",
    type: ["text", "circle", "rect"],
    default: "rect",
    description:
      "Controls border-radius and default dimensions. text = body line height, full width. circle = rounded-full, aspect-square. rect = block height, full width.",
  },
  {
    name: "size",
    type: ["sm", "md", "lg"],
    default: "md",
    description:
      "Controls height (text/rect) or diameter (circle). sm = caption-sized, md = body-sized, lg = heading-sized. Override with className for custom dimensions.",
  },
  {
    name: "animated",
    type: ["boolean"],
    default: "true",
    description:
      "Toggles the CSS shimmer animation. Set to false for static placeholders or snapshot tests.",
  },
  {
    name: "className",
    type: ["string"],
    description:
      "Additional classes merged via cn(). Use to override width, height, and margin.",
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
        description="Full-width rectangle with shimmer animation. Default height from layout tokens, override via className."
      >
        <div className="w-full max-w-sm">
          <Skeleton />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="shapes"
        title="Shapes"
        description="Three presets control radius and default dimensions. All shapes have visible defaults — override via className."
      >
        <div className="flex items-center gap-[var(--layout-gap-2xl)]">
          <Skeleton shape="text" className="w-48" />
          <Skeleton shape="circle" className="size-10" />
          <Skeleton shape="rect" className="h-10 w-24" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="sizes"
        title="Sizes"
        description="Three sizes match your content hierarchy. sm for captions, md for body text (default), lg for headings."
      >
        <div className="flex flex-col gap-[var(--layout-gap-lg)] w-full max-w-sm">
          <div className="flex items-center gap-[var(--layout-gap-lg)]">
            <Skeleton shape="text" size="sm" className="flex-1" />
            <Skeleton shape="circle" size="sm" />
            <Skeleton shape="rect" size="sm" className="w-20" />
          </div>
          <div className="flex items-center gap-[var(--layout-gap-lg)]">
            <Skeleton shape="text" size="md" className="flex-1" />
            <Skeleton shape="circle" size="md" />
            <Skeleton shape="rect" size="md" className="w-20" />
          </div>
          <div className="flex items-center gap-[var(--layout-gap-lg)]">
            <Skeleton shape="text" size="lg" className="flex-1" />
            <Skeleton shape="circle" size="lg" />
            <Skeleton shape="rect" size="lg" className="w-20" />
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="static"
        title="Static (No Animation)"
        description="Disable the shimmer with animated={false}. Useful for snapshot tests or reduced motion overrides."
      >
        <div className="w-full max-w-sm flex flex-col gap-3">
          <Skeleton shape="text" animated={false} />
          <Skeleton shape="text" animated={false} className="w-2/3" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="card-skeleton"
        title="Card Skeleton"
        description="Compose skeletons to approximate a card layout. Wrap in role=&quot;status&quot; for screen reader feedback."
      >
        <div
          role="status"
          aria-live="polite"
          className="w-full max-w-sm rounded-[var(--layout-radius-lg)] p-[var(--layout-padding-xl)]"
          style={{
            border:
              "var(--layout-border-thin) solid var(--border-default)",
          }}
        >
          <span className="sr-only">Loading content</span>
          <div className="flex flex-col gap-4">
            <Skeleton shape="rect" className="h-32 w-full" />
            <div className="flex flex-col gap-2">
              <Skeleton shape="text" className="w-3/4" />
              <Skeleton shape="text" />
              <Skeleton shape="text" className="w-1/2" />
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="list-skeleton"
        title="List Item Skeleton"
        description="Avatar + text lines pattern for list items."
      >
        <div
          role="status"
          aria-live="polite"
          className="w-full max-w-md flex flex-col gap-[var(--layout-gap-lg)]"
        >
          <span className="sr-only">Loading list</span>
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-[var(--layout-gap-md)]">
              <Skeleton shape="circle" className="size-10" />
              <div className="flex-1 flex flex-col gap-2">
                <Skeleton shape="text" className="w-1/3" />
                <Skeleton shape="text" className="w-2/3" />
              </div>
            </div>
          ))}
        </div>
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

export default function SkeletonPage() {
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
            Skeleton
          </h1>
          <p
            className="text-content-highlight"
            style={{ color: "var(--text-base-bolder)" }}
          >
            A shimmer placeholder that mirrors the shape of content before it
            arrives, reducing perceived wait time and layout shift. Use it when
            content is loading asynchronously and the layout is known in advance.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add https://ui.getlyse.com/r/skeleton.json")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <><Copy /> Copy install command</>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a
                href="https://v0.app/chat?q=add%20component%20from%20https%3A%2F%2Fui.getlyse.com%2Fr%2Fskeleton.json"
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

          {/* Code example */}
          {tab === "overview" && (
            <CodeBlock
              preview={
                <div className="w-full max-w-sm">
                  <Skeleton />
                </div>
              }
              codeString={importCode}
              language="tsx"
            />
          )}

          {/* Tab content */}
          {tab === "overview" ? (
            <OverviewTab />
          ) : tab === "props" ? (
            <div className="flex flex-col gap-4">
              <h2
                className="text-heading-small font-accent"
                style={{ color: "var(--text-base-strong)" }}
              >
                Skeleton
              </h2>
              <PropsTable propDefs={propDefs} />
            </div>
          ) : (
            <DocumentationTab />
          )}
        </div>
      </main>

      <TableOfContents
        sections={
          tab === "overview"
            ? overviewSections
            : tab === "documentation"
              ? bestPracticesSections
              : []
        }
      />
    </>
  )
}
