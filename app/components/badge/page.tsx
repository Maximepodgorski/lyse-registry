"use client"

import { useState } from "react"
import { Badge, BadgeDot } from "@/registry/new-york/ui/badge/badge"
import { toast } from "@/registry/new-york/ui/toast/toast"
import { Copy, ExternalLink } from "lucide-react"
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
  { id: "filled", label: "Filled" },
  { id: "with-dot", label: "With Dot" },
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
        description={
          <>
            Use the <InlineCode>variant</InlineCode> prop to change the
            color. <InlineCode>brand</InlineCode> for branding,{" "}
            <InlineCode>neutral</InlineCode> (default) for general use,{" "}
            <InlineCode>success</InlineCode>, <InlineCode>danger</InlineCode>,
            and <InlineCode>warning</InlineCode> for semantic states.
          </>
        }
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
        description={
          <>
            Use the <InlineCode>size</InlineCode> prop with{" "}
            <InlineCode>sm</InlineCode>, <InlineCode>md</InlineCode>{" "}
            (default), or <InlineCode>lg</InlineCode>. Each size adjusts
            height, padding, gap, and font size.
          </>
        }
      >
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
      </ComponentPreview>

      <ComponentPreview
        id="types"
        title="Types"
        description={
          <>
            Use the <InlineCode>type</InlineCode> prop to control the border
            style. <InlineCode>fill</InlineCode> (default) has no border,{" "}
            <InlineCode>light</InlineCode> adds a solid border, and{" "}
            <InlineCode>dash</InlineCode> adds a dashed border.
          </>
        }
      >
        <Badge type="fill">Fill</Badge>
        <Badge type="light">Light</Badge>
        <Badge type="dash">Dash</Badge>
      </ComponentPreview>

      <ComponentPreview
        id="filled"
        title="Filled"
        description={
          <>
            Use the <InlineCode>isFilled</InlineCode> prop for a strong
            background with inverse text. Compare the default overlay style
            (top row) with the filled variant (bottom row).
          </>
        }
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
        description={
          <>
            Compose with <InlineCode>BadgeDot</InlineCode> to add a status
            indicator. The dot color matches the variant and scales with the
            badge size.
          </>
        }
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

/* ----------------------------------------------------------------
 * Page
 * ---------------------------------------------------------------- */

type Tab = "overview" | "props"

export default function BadgePage() {
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
            Badge
          </h1>
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            The Badge component is a compact label used to categorize, filter,
            or display metadata. It supports five color variants, three
            sizes, three border types (fill, light, dash), a filled state
            for emphasis, and an optional dot indicator for status.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add @lyse/badge")
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
              preview={<Badge>Badge</Badge>}
              code={
                <>
                  <span style={{ color: "#c084fc" }}>import</span>
                  {" { "}
                  <span
                    style={{ color: "var(--root-color-success-400)" }}
                  >
                    Badge
                  </span>
                  {" } "}
                  <span style={{ color: "#c084fc" }}>from</span>{" "}
                  <span
                    style={{ color: "var(--root-color-warning-400)" }}
                  >{`'@/components/ui/badge'`}</span>
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
                    Badge
                  </span>
                  {">"}
                  Badge
                  {"</"}
                  <span
                    style={{ color: "var(--root-color-success-400)" }}
                  >
                    Badge
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
