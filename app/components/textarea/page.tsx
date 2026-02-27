"use client"

import { useState } from "react"
import { toast } from "@/registry/new-york/ui/toast/toast"
import { Textarea } from "@/registry/new-york/ui/textarea/textarea"
import { Button } from "@/registry/new-york/ui/button/button"
import { Copy, ExternalLink } from "lucide-react"
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
  { id: "default", label: "Default" },
  { id: "sizes", label: "Sizes" },
  { id: "variants", label: "Variants" },
  { id: "disabled", label: "Disabled" },
]

const propDefs: PropDef[] = [
  {
    name: "variant",
    type: ["default", "destructive", "success"],
    default: "default",
    description:
      "Visual variant. Controls border and focus ring color for validation states.",
  },
  {
    name: "size",
    type: ["sm", "md", "lg"],
    default: "md",
    description: "Controls min-height, padding, radius, and font size.",
  },
  {
    name: "disabled",
    type: ["boolean"],
    default: "false",
    description: "Disabled state — mutes colors, prevents interaction, and disables resize.",
  },
  {
    name: "placeholder",
    type: ["string"],
    description: "Placeholder text displayed when the textarea is empty.",
  },
  {
    name: "className",
    type: ["string"],
    description: "Additional class names merged via cn().",
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
        description="A basic textarea with placeholder text."
      >
        <Textarea placeholder="Type your message here..." className="max-w-[320px]" />
      </ComponentPreview>

      <ComponentPreview
        id="sizes"
        title="Sizes"
        description={
          <>
            Use the <InlineCode>size</InlineCode> prop to control min-height,
            padding, and font size.
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Textarea size="sm" placeholder="Small" className="max-w-[320px]" />
          <Textarea size="md" placeholder="Medium" className="max-w-[320px]" />
          <Textarea size="lg" placeholder="Large" className="max-w-[320px]" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="variants"
        title="Variants"
        description={
          <>
            Use <InlineCode>variant</InlineCode> to change the border and focus
            ring color for validation states.
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Textarea variant="default" placeholder="Default" className="max-w-[320px]" />
          <Textarea variant="destructive" placeholder="Destructive" className="max-w-[320px]" />
          <Textarea variant="success" placeholder="Success" className="max-w-[320px]" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="disabled"
        title="Disabled"
        description="Disable the textarea to prevent interaction."
      >
        <Textarea disabled placeholder="Disabled textarea" className="max-w-[320px]" />
      </ComponentPreview>
    </div>
  )
}

/* ----------------------------------------------------------------
 * Page
 * ---------------------------------------------------------------- */

type Tab = "overview" | "props"

export default function TextareaPage() {
  const [tab, setTab] = useState<Tab>("overview")

  return (
    <>
      <main className="flex-1 min-w-0 py-16 flex flex-col gap-10 max-w-none px-8 lg:px-16 xl:px-20">
        {/* Hero */}
        <div className="flex flex-col gap-3">
          <h1
            className="text-heading-large"
            style={{ color: "var(--text-base-strong)" }}
          >
            Textarea
          </h1>
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            A multi-line text input for collecting longer form content. Supports
            sizes, validation variants, placeholder text, and disabled state.
            Resizable by default.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add @lyse/textarea")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <><Copy className="size-4" /> Copy install command</>
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
              preview={
                <Textarea placeholder="Type something..." className="max-w-[320px]" />
              }
              code={
                <>
                  <span style={{ color: "var(--root-color-brand-300)" }}>import</span>
                  {" { "}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    Textarea
                  </span>
                  {" } "}
                  <span style={{ color: "var(--root-color-brand-300)" }}>from</span>{" "}
                  <span style={{ color: "var(--root-color-warning-400)" }}>
                    {`'@/components/ui/textarea'`}
                  </span>
                  {"\n\n"}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"<"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>Textarea</span>
                  {" "}
                  <span style={{ color: "var(--root-color-brand-300)" }}>placeholder</span>
                  {"="}
                  <span style={{ color: "var(--root-color-warning-400)" }}>{`"Type something..."`}</span>
                  {" />"}
                </>
              }
            />
          )}

          {/* Tab content */}
          {tab === "overview" ? (
            <OverviewTab />
          ) : (
            <div className="flex flex-col gap-12">
              <div>
                <h3
                  className="text-heading-small mb-4"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  Textarea
                </h3>
                <PropsTable
                  propDefs={propDefs}
                  extendsType="React.TextareaHTMLAttributes"
                />
              </div>
            </div>
          )}
        </div>
      </main>

      <TableOfContents sections={tab === "overview" ? overviewSections : []} />
    </>
  )
}
