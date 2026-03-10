"use client"

import { useState } from "react"
import { Tag, TagDot, TagClose } from "@/registry/new-york/ui/tag/tag"
import { toast } from "@/registry/new-york/ui/toast/toast"
import { Copy, ExternalLink, Clock8 } from "lucide-react"
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
  { id: "ghost", label: "Ghost" },
  { id: "with-dot", label: "With Dot" },
  { id: "with-icon", label: "With Icon" },
  { id: "dismissible", label: "Dismissible" },
]

const dosDontsItems: DosDontsItem[] = [
  {
    do: {
      preview: (
        <Tag variant="success" size="md">
          <TagDot />
          Active
        </Tag>
      ),
      description:
        "Use TagDot as the first child for status indicators.",
    },
    dont: {
      preview: (
        <Tag variant="success" size="md">
          <span style={{ fontSize: 10 }}>&#x1F7E2;</span>
          Active
        </Tag>
      ),
      description:
        "Don't use a raw <span> or emoji as a status dot.",
    },
  },
  {
    do: {
      preview: (
        <Tag variant="neutral" size="md">
          Design
          <TagClose onClick={() => {}} aria-label="Remove Design" />
        </Tag>
      ),
      description:
        'Add aria-label to TagClose describing what is being removed (e.g., "Remove Design").',
    },
    dont: {
      preview: (
        <Tag variant="neutral" size="md">
          Design
          <TagClose onClick={() => {}} />
        </Tag>
      ),
      description:
        "Don't leave TagClose without context \u2014 \u201CX\u201D alone is not descriptive for screen readers.",
    },
  },
  {
    do: {
      preview: (
        <Tag variant="brand" type="ghost" size="md">
          <Clock8 />
          In Progress
        </Tag>
      ),
      description:
        'Use type="ghost" for low-emphasis inline labels where full styling would be too heavy.',
    },
    dont: {
      preview: (
        <div className="flex items-center gap-[var(--layout-gap-sm)]">
          <Tag variant="brand" type="ghost" size="sm">A</Tag>
          <Tag variant="brand" type="ghost" size="sm">B</Tag>
          <Tag variant="brand" type="ghost" size="sm">C</Tag>
        </div>
      ),
      description:
        "Don't use type=\"ghost\" as the primary tag style \u2014 it lacks contrast at small sizes.",
    },
  },
  {
    do: {
      preview: (
        <div className="flex items-center gap-[var(--layout-gap-sm)]">
          <Tag variant="neutral" type="dash" size="md">Draft</Tag>
          <Tag variant="neutral" type="dash" size="md">Placeholder</Tag>
        </div>
      ),
      description:
        'Use type="dash" for placeholder or draft states consistently.',
    },
    dont: {
      preview: (
        <div className="flex items-center gap-[var(--layout-gap-sm)]">
          <Tag variant="brand" type="dash" size="md">Draft</Tag>
          <Tag variant="brand" type="fill" size="md">Active</Tag>
        </div>
      ),
      description:
        'Don\'t mix type="dash" with type="fill" tags in the same list \u2014 be consistent.',
    },
  },
]

const propDefs: PropDef[] = [
  {
    name: "variant",
    type: ["brand", "neutral", "success", "danger", "warning"],
    default: "neutral",
    description: "Color variant of the tag.",
  },
  {
    name: "size",
    type: ["sm", "md", "lg"],
    default: "sm",
    description: "Tag size — adjusts padding, gap, radius, and font size.",
  },
  {
    name: "type",
    type: ["fill", "dash", "emphasis", "ghost"],
    default: "fill",
    description:
      "Border and background style. Fill has colored bg + colored border, dash is dashed, emphasis uses a lighter bg with default border, ghost has no bg.",
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
    description: "Tag content — text, TagDot, icons, TagClose, or a combination.",
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
        description="Neutral (default), brand, success, danger, and warning."
      >
        <Tag variant="neutral">Neutral</Tag>
        <Tag variant="brand">Brand</Tag>
        <Tag variant="success">Success</Tag>
        <Tag variant="danger">Danger</Tag>
        <Tag variant="warning">Warning</Tag>
      </ComponentPreview>

      <ComponentPreview
        id="sizes"
        title="Sizes"
        description="Three sizes from sm (default) to lg. Each adjusts padding, gap, radius, and font size."
      >
        <Tag size="sm">Small</Tag>
        <Tag size="md">Medium</Tag>
        <Tag size="lg">Large</Tag>
      </ComponentPreview>

      <ComponentPreview
        id="types"
        title="Types"
        description="Fill (default) with colored background, dash with dashed border, emphasis with lighter background, and ghost with no background."
      >
        <Tag variant="brand" type="fill" size="md">Fill</Tag>
        <Tag variant="brand" type="dash" size="md">Dash</Tag>
        <Tag variant="brand" type="emphasis" size="md">Emphasis</Tag>
        <Tag variant="brand" type="ghost" size="md">Ghost</Tag>
      </ComponentPreview>

      <ComponentPreview
        id="ghost"
        title="Ghost"
        description="Ghost tags keep white text — only icons and dots take the variant color. Useful for subtle labeling with a colored accent."
      >
        <Tag variant="neutral" type="ghost" size="md">
          <Clock8 />
          Neutral
        </Tag>
        <Tag variant="brand" type="ghost" size="md">
          <Clock8 />
          Brand
        </Tag>
        <Tag variant="success" type="ghost" size="md">
          <Clock8 />
          Success
        </Tag>
        <Tag variant="danger" type="ghost" size="md">
          <Clock8 />
          Danger
        </Tag>
        <Tag variant="warning" type="ghost" size="md">
          <Clock8 />
          Warning
        </Tag>
      </ComponentPreview>

      <ComponentPreview
        id="with-dot"
        title="With Dot"
        description="Adds a status indicator dot. Color matches the variant."
      >
        <Tag variant="neutral" size="md">
          <TagDot />
          Neutral
        </Tag>
        <Tag variant="brand" size="md">
          <TagDot />
          Brand
        </Tag>
        <Tag variant="success" size="md">
          <TagDot />
          Success
        </Tag>
        <Tag variant="danger" size="md">
          <TagDot />
          Danger
        </Tag>
        <Tag variant="warning" size="md">
          <TagDot />
          Warning
        </Tag>
      </ComponentPreview>

      <ComponentPreview
        id="with-icon"
        title="With Icon"
        description="Place icons before the label. Icons scale automatically based on the tag size."
      >
        <Tag variant="neutral" size="md">
          <Clock8 />
          Recent
        </Tag>
        <Tag variant="brand" size="md">
          <Clock8 />
          In Progress
        </Tag>
        <Tag variant="success" size="md">
          <Clock8 />
          Completed
        </Tag>
      </ComponentPreview>

      <ComponentPreview
        id="dismissible"
        title="Dismissible"
        description="Adds a dismiss button. Renders a default X icon and accepts a custom onClick handler."
      >
        <Tag variant="neutral" size="md">
          Label
          <TagClose onClick={() => {}} />
        </Tag>
        <Tag variant="brand" size="md">
          <TagDot />
          Brand
          <TagClose onClick={() => {}} />
        </Tag>
        <Tag variant="danger" size="md">
          <Clock8 />
          Error
          <TagClose onClick={() => {}} />
        </Tag>
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

const importCode = `import { Tag } from '@/components/ui/tag'

export default function Example() {
  return <Tag>Tag</Tag>
}`

type Tab = "overview" | "props" | "documentation"

export default function TagPage() {
  const [tab, setTab] = useState<Tab>("overview")

  return (
    <>
      <main
        className="flex-1 min-w-0 py-16 flex flex-col gap-10 max-w-none px-8 lg:px-16 xl:px-20"
      >
        {/* Hero */}
        <div className="flex flex-col gap-3">
          <h1
            className="font-bold"
            style={{ color: "var(--text-base-strong)", fontSize: "var(--root-font-size-5xl)" }}
          >
            Tag
          </h1>
          <p
            className="text-content-highlight"
            style={{ color: "var(--text-base-bolder)" }}
          >
            The Tag component is a small, interactive label used to
            categorize, filter, or display metadata. It supports actions like
            dismissal and selection, helping users organize and manage content
            efficiently.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add https://ui.getlyse.com/r/tag.json")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <><Copy /> Copy install command</>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a
                href="https://v0.app/chat?q=add%20component%20from%20https%3A%2F%2Fui.getlyse.com%2Fr%2Ftag.json"
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
              preview={<Tag size="md">Tag</Tag>}
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
