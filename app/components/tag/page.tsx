"use client"

import { useState } from "react"
import { Tag, TagDot, TagClose } from "@/registry/new-york/ui/tag/tag"
import { toast } from "@/registry/new-york/ui/toast/toast"
import { Copy, ExternalLink, Clock8 } from "lucide-react"
import { Button } from "@/registry/new-york/ui/button/button"
import { ComponentPreview } from "@/app/_components/component-preview"
import { PropsTable, type PropDef } from "@/app/_components/props-table"
import {
  TableOfContents,
  type TocSection,
} from "@/app/_components/table-of-contents"
import { CodeBlock } from "@/app/_components/code-block"
import { InlineCode } from "@/app/_components/inline-code"

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
        description={
          <>
            Use the <InlineCode>variant</InlineCode> prop to change the
            color. <InlineCode>neutral</InlineCode> (default) for general use,{" "}
            <InlineCode>brand</InlineCode>, <InlineCode>success</InlineCode>,{" "}
            <InlineCode>danger</InlineCode>, and{" "}
            <InlineCode>warning</InlineCode>.
          </>
        }
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
        description={
          <>
            Use the <InlineCode>size</InlineCode> prop with{" "}
            <InlineCode>sm</InlineCode> (default),{" "}
            <InlineCode>md</InlineCode>, or <InlineCode>lg</InlineCode>. Each
            size adjusts padding, gap, border radius, and font size.
          </>
        }
      >
        <Tag size="sm">Small</Tag>
        <Tag size="md">Medium</Tag>
        <Tag size="lg">Large</Tag>
      </ComponentPreview>

      <ComponentPreview
        id="types"
        title="Types"
        description={
          <>
            Use the <InlineCode>type</InlineCode> prop to control border and
            background style. <InlineCode>fill</InlineCode> (default) has a
            colored background with solid border,{" "}
            <InlineCode>dash</InlineCode> uses a dashed border,{" "}
            <InlineCode>emphasis</InlineCode> uses a lighter background with a
            default border, and <InlineCode>ghost</InlineCode> has no
            background.
          </>
        }
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
        description={
          <>
            Compose with <InlineCode>TagDot</InlineCode> to add a status
            indicator. The dot color matches the variant.
          </>
        }
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
        description={
          <>
            Compose with <InlineCode>TagClose</InlineCode> to add a dismiss
            button. TagClose renders a default X icon but accepts custom
            children. Wire your own <InlineCode>onClick</InlineCode> handler.
          </>
        }
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

/* ----------------------------------------------------------------
 * Page
 * ---------------------------------------------------------------- */

type Tab = "overview" | "props"

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
            className="text-heading-large"
            style={{ color: "var(--text-base-strong)" }}
          >
            Tag
          </h1>
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            The Tag component is a compact interactive label used to
            categorize, filter, or display metadata. It supports five color
            variants, three sizes, four border types (fill, dash, emphasis,
            ghost), an optional dot indicator, icon slot, and dismissible
            close button.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add @lyse/tag")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <><Copy /> Copy install command</>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a
                href="https://v0.dev"
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
              code={
                <>
                  <span style={{ color: "#c084fc" }}>import</span>
                  {" { "}
                  <span
                    style={{ color: "var(--root-color-success-400)" }}
                  >
                    Tag
                  </span>
                  {" } "}
                  <span style={{ color: "#c084fc" }}>from</span>{" "}
                  <span
                    style={{ color: "var(--root-color-warning-400)" }}
                  >{`'@/components/ui/tag'`}</span>
                  {"\n\n"}
                  <span
                    style={{ color: "var(--root-color-brand-400)" }}
                  >
                    export default
                  </span>{" "}
                  <span
                    style={{ color: "var(--root-color-brand-400)" }}
                  >
                    function
                  </span>{" "}
                  <span
                    style={{ color: "var(--root-color-success-400)" }}
                  >
                    Example
                  </span>
                  {"() {\n"}
                  {"  "}
                  <span
                    style={{ color: "var(--root-color-brand-400)" }}
                  >
                    return
                  </span>{" "}
                  {"<"}
                  <span
                    style={{ color: "var(--root-color-success-400)" }}
                  >
                    Tag
                  </span>
                  {">"}
                  Tag
                  {"</"}
                  <span
                    style={{ color: "var(--root-color-success-400)" }}
                  >
                    Tag
                  </span>
                  {">\n"}
                  {"}"}
                </>
              }
            />
          )}

          {/* Tab content */}
          {tab === "overview" ? (
            <OverviewTab />
          ) : (
            <PropsTable
              propDefs={propDefs}
              extendsType={`React.ComponentProps<"span">`}
            />
          )}
        </div>
      </main>

      {tab === "overview" && (
        <TableOfContents sections={overviewSections} />
      )}
    </>
  )
}
