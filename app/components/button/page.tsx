"use client"

import { useState } from "react"
import { Button } from "@/registry/new-york/ui/button/button"
import { toast } from "@/registry/new-york/ui/toast/toast"
import {
  Heart,
  Mail,
  Trash2,
  ArrowRight,
  Copy,
  ExternalLink,
} from "lucide-react"
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
  { id: "disabled", label: "Disabled" },
  { id: "with-icons", label: "With Icons" },
]

const propDefs: PropDef[] = [
  {
    name: "variant",
    type: ["primary", "secondary", "terciary", "destructive"],
    default: "primary",
    description: "Visual style of the button.",
  },
  {
    name: "size",
    type: ["xs", "sm", "md", "lg"],
    default: "md",
    description: "Height, padding, font size, and icon size.",
  },
  {
    name: "isIconOnly",
    type: ["boolean"],
    default: "false",
    description: "Square button sized to the current size.",
  },
  {
    name: "asChild",
    type: ["boolean"],
    default: "false",
    description:
      "Merges props onto the child element instead of a <button>.",
  },
  {
    name: "disabled",
    type: ["boolean"],
    default: "false",
    description: "Disables interactions and applies muted styling.",
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
    description: "Button content — text, icons, or both.",
  },
  {
    name: "onClick",
    type: ["(e: MouseEvent) => void"],
    description: "Click event handler.",
  },
  {
    name: "type",
    type: ["button", "submit", "reset"],
    description: "HTML button type attribute.",
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
            visual style. <InlineCode>primary</InlineCode> for main actions,{" "}
            <InlineCode>secondary</InlineCode> for alternatives,{" "}
            <InlineCode>terciary</InlineCode> for ghost actions, and{" "}
            <InlineCode>destructive</InlineCode> for dangerous operations.
          </>
        }
      >
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="terciary">Terciary</Button>
        <Button variant="destructive">Destructive</Button>
      </ComponentPreview>

      <ComponentPreview
        id="sizes"
        title="Sizes"
        description={
          <>
            Use the <InlineCode>size</InlineCode> prop with{" "}
            <InlineCode>xs</InlineCode>, <InlineCode>sm</InlineCode>,{" "}
            <InlineCode>md</InlineCode> (default) or{" "}
            <InlineCode>lg</InlineCode>. Each size adjusts height, padding,
            font size, and icon size.
          </>
        }
      >
        <Button size="xs">Extra Small</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </ComponentPreview>

      <ComponentPreview
        id="disabled"
        title="Disabled"
        description={
          <>
            Use the <InlineCode>disabled</InlineCode> prop to prevent
            interactions. The button applies muted styling and blocks pointer
            events.
          </>
        }
      >
        <Button disabled>Primary</Button>
        <Button variant="secondary" disabled>
          Secondary
        </Button>
        <Button variant="terciary" disabled>
          Terciary
        </Button>
        <Button variant="destructive" disabled>
          Destructive
        </Button>
      </ComponentPreview>

      <ComponentPreview
        id="with-icons"
        title="With Icons"
        description="Place icons before or after the label. Icons scale automatically based on the button size. Use any icon library compatible with React."
      >
        <Button>
          <Mail /> Send Email
        </Button>
        <Button variant="secondary">
          Continue <ArrowRight />
        </Button>
        <Button variant="destructive">
          <Trash2 /> Delete
        </Button>
        <Button variant="terciary">
          <Heart /> Like
        </Button>
      </ComponentPreview>
    </div>
  )
}

/* ----------------------------------------------------------------
 * Page
 * ---------------------------------------------------------------- */

type Tab = "overview" | "props"

export default function ButtonPage() {
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
            Button
          </h1>
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            The Button component is an interactive element used to trigger
            actions or events within an application. It provides a consistent
            and accessible way for users to interact with the interface,
            featuring four semantic variants, four sizes, icon composition,
            and built-in states (hover, active, focus, disabled).
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add @lyse/button")
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
              preview={<Button>Button</Button>}
              code={
                <>
                  <span style={{ color: "#c084fc" }}>import</span>
                  {" { "}
                  <span
                    style={{ color: "var(--root-color-success-400)" }}
                  >
                    Button
                  </span>
                  {" } "}
                  <span style={{ color: "#c084fc" }}>from</span>{" "}
                  <span
                    style={{ color: "var(--root-color-warning-400)" }}
                  >{`'@/components/ui/button'`}</span>
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
                    Button
                  </span>
                  {">"}
                  Button
                  {"</"}
                  <span
                    style={{ color: "var(--root-color-success-400)" }}
                  >
                    Button
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
              extendsType={`React.ComponentProps<"button">`}
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
