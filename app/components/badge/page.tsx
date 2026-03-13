"use client"

import { useState } from "react"
import { Badge, BadgeDot } from "@/registry/new-york/ui/badge/badge"
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

const overviewSections: TocSection[] = [
  { id: "variants", label: "Variants" },
  { id: "sizes", label: "Sizes" },
  { id: "types", label: "Types" },
  { id: "filled", label: "Filled" },
  { id: "with-dot", label: "With Dot" },
]

const dosDontsItems: DosDontsItem[] = [
  {
    do: {
      preview: (
        <Badge variant="danger" isFilled>Critical</Badge>
      ),
      description:
        "Use isFilled to highlight a critical or primary status.",
    },
    dont: {
      preview: (
        <div className="flex items-center gap-[var(--layout-gap-sm)]">
          <Badge variant="brand" isFilled>Brand</Badge>
          <Badge variant="neutral" isFilled>Neutral</Badge>
          <Badge variant="success" isFilled>Success</Badge>
        </div>
      ),
      description:
        "Don't use isFilled on every badge — it loses meaning when overused.",
    },
  },
  {
    do: {
      preview: <Badge variant="neutral" type="dash">Draft</Badge>,
      description:
        'Use type="dash" to signal a provisional or draft state.',
    },
    dont: {
      preview: (
        <div className="flex items-center gap-[var(--layout-gap-sm)]">
          <Badge type="dash">Active</Badge>
          <Badge type="light">Pending</Badge>
          <Badge type="fill">Draft</Badge>
        </div>
      ),
      description:
        "Don't mix type values across badges in the same list without intent.",
    },
  },
  {
    do: {
      preview: (
        <Badge variant="success">
          <BadgeDot />
          Active
        </Badge>
      ),
      description:
        "Use BadgeDot to reinforce status with a visual signal paired with a semantic variant.",
    },
    dont: {
      preview: (
        <Badge variant="neutral">
          <BadgeDot />
          Label
        </Badge>
      ),
      description:
        "Don't add a dot without pairing it with a status variant — a neutral dot conveys no meaning.",
    },
  },
  {
    do: {
      preview: <Badge variant="success">Active</Badge>,
      description:
        "Keep badge text to 1\u20132 words for quick scanning.",
    },
    dont: {
      preview: <Badge variant="success">This item is currently active and running</Badge>,
      description:
        "Don't put sentences or long phrases inside a badge.",
    },
  },
]

const propDefs: PropDef[] = [
  {
    name: "variant",
    type: ["brand", "neutral", "success", "danger", "warning"],
    default: "neutral",
    description: "Color variant of the badge.",
  },
  {
    name: "size",
    type: ["sm", "md", "lg"],
    default: "md",
    description: "Badge size — adjusts height, padding, and font size.",
  },
  {
    name: "type",
    type: ["fill", "light", "dash"],
    default: "fill",
    description:
      "Border style. Fill has no border, light has solid border, dash has dashed border.",
  },
  {
    name: "isFilled",
    type: ["boolean"],
    default: "false",
    description:
      "Uses a strong background with inverse text instead of the overlay.",
  },
  {
    name: "className",
    type: ["string"],
    description: "Additional class names merged via cn().",
  },
  {
    name: "children",
    type: ["ReactNode"],
    required: true,
    description: "Badge content — text, icons, BadgeDot, or a combination.",
  },
]

/* ----------------------------------------------------------------
 * Tabs
 * ---------------------------------------------------------------- */

function OverviewTab() {
  return (
    <div className="flex flex-col gap-12">
      <ComponentPreview
        id="variants"
        title="Variants"
        description="Brand, neutral (default), success, danger, and warning for semantic states."
      >
        <Badge variant="brand">Brand</Badge>
        <Badge variant="neutral">Neutral</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge variant="warning">Warning</Badge>
      </ComponentPreview>

      <ComponentPreview
        id="sizes"
        title="Sizes"
        description="Three sizes from sm to lg. Each adjusts height, padding, gap, and font size."
      >
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
      </ComponentPreview>

      <ComponentPreview
        id="types"
        title="Types"
        description="Fill (default) has no border, light adds a solid border, and dash adds a dashed border."
      >
        <Badge type="fill">Fill</Badge>
        <Badge type="light">Light</Badge>
        <Badge type="dash">Dash</Badge>
      </ComponentPreview>

      <ComponentPreview
        id="filled"
        title="Filled"
        description="Strong background with inverse text. Compare default overlay (top) with filled (bottom)."
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center flex-wrap gap-4">
            <Badge variant="brand">Brand</Badge>
            <Badge variant="neutral">Neutral</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="warning">Warning</Badge>
          </div>
          <div className="flex items-center flex-wrap gap-4">
            <Badge variant="brand" isFilled>
              Brand
            </Badge>
            <Badge variant="neutral" isFilled>
              Neutral
            </Badge>
            <Badge variant="success" isFilled>
              Success
            </Badge>
            <Badge variant="danger" isFilled>
              Danger
            </Badge>
            <Badge variant="warning" isFilled>
              Warning
            </Badge>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="with-dot"
        title="With Dot"
        description="Adds a status indicator dot. Color matches the variant and scales with badge size."
      >
        <Badge variant="brand">
          <BadgeDot />
          Brand
        </Badge>
        <Badge variant="neutral">
          <BadgeDot />
          Neutral
        </Badge>
        <Badge variant="success">
          <BadgeDot />
          Success
        </Badge>
        <Badge variant="danger">
          <BadgeDot />
          Danger
        </Badge>
        <Badge variant="warning">
          <BadgeDot />
          Warning
        </Badge>
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

const importCode = `import { Badge } from '@/components/ui/badge'

export default function Example() {
  return <Badge>Badge</Badge>
}`

type Tab = "overview" | "props" | "documentation"

export default function BadgePage() {
  const [tab, setTab] = useState<Tab>("overview")

  return (
    <>
      <main
        className="flex-1 min-w-0 py-16 flex flex-col gap-10 max-w-none px-5 sm:px-8 lg:px-16 xl:px-20"
      >
        {/* Hero */}
        <div className="flex flex-col gap-3">
          <h1
            className="font-bold"
            style={{ color: "var(--text-base-strong)", fontSize: "var(--root-font-size-5xl)" }}
          >
            Badge
          </h1>
          <p
            className="text-content-highlight"
            style={{ color: "var(--text-base-bolder)" }}
          >
            The Badge component is a compact visual indicator used to
            communicate status, category, or count at a glance. It helps users
            quickly identify the state of an item without reading full
            descriptions.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add https://ui.getlyse.com/r/badge.json")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <><Copy /> Copy install command</>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a
                href="https://v0.app/chat?q=add%20component%20from%20https%3A%2F%2Fui.getlyse.com%2Fr%2Fbadge.json"
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
              preview={<Badge>Badge</Badge>}
              codeString={importCode}
              language="tsx"
            />
          )}

          {/* Tab content */}
          {tab === "overview" ? (
            <OverviewTab />
          ) : tab === "props" ? (
            <PropsTable
              propDefs={propDefs}
              extendsType={`React.ComponentProps<"span">`}
            />
          ) : (
            <DocumentationTab />
          )}
        </div>
      </main>

      <TableOfContents
        sections={
          tab === "overview"
            ? overviewSections
            : []
        }
      />
    </>
  )
}
