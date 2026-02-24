"use client"

import { useState } from "react"
import { toast } from "@/registry/new-york/ui/toast/toast"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipShortcut,
} from "@/registry/new-york/ui/tooltip/tooltip"
import { Button } from "@/registry/new-york/ui/button/button"
import { Copy, ExternalLink, Bold, Italic, Underline } from "lucide-react"
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
  { id: "with-shortcut", label: "With Shortcut" },
  { id: "placement", label: "Placement" },
]

const propDefs: PropDef[] = [
  {
    name: "size",
    type: ["md", "sm"],
    default: "md",
    description: "Size of the tooltip content — controls padding and font size.",
  },
  {
    name: "sideOffset",
    type: ["number"],
    default: "6",
    description: "Distance in pixels between trigger and tooltip.",
  },
  {
    name: "side",
    type: ["top", "right", "bottom", "left"],
    default: "top",
    description: "Preferred side of the trigger to render against.",
  },
  {
    name: "align",
    type: ["start", "center", "end"],
    default: "center",
    description: "Alignment of the tooltip relative to the trigger.",
  },
  {
    name: "delayDuration",
    type: ["number"],
    default: "300",
    description: "Duration from when the mouse enters the trigger until the tooltip opens (set on TooltipProvider).",
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
    description: "Tooltip content — text, shortcuts, or a combination.",
  },
]

/* ----------------------------------------------------------------
 * Tabs
 * ---------------------------------------------------------------- */

function OverviewTab() {
  return (
    <TooltipProvider delayDuration={100}>
      <div className="flex flex-col gap-12">
        <ComponentPreview
          id="default"
          title="Default"
          description="Wrap any element with Tooltip + TooltipTrigger to show a tooltip on hover. The tooltip appears after a configurable delay."
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>Tooltip</TooltipContent>
          </Tooltip>
        </ComponentPreview>

        <ComponentPreview
          id="sizes"
          title="Sizes"
          description={
            <>
              Use the <InlineCode>size</InlineCode> prop on TooltipContent
              with <InlineCode>md</InlineCode> (default) or{" "}
              <InlineCode>sm</InlineCode>. Each size adjusts padding and font
              size.
            </>
          }
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary">Medium</Button>
            </TooltipTrigger>
            <TooltipContent size="md">Medium tooltip</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary">Small</Button>
            </TooltipTrigger>
            <TooltipContent size="sm">Small tooltip</TooltipContent>
          </Tooltip>
        </ComponentPreview>

        <ComponentPreview
          id="with-shortcut"
          title="With Shortcut"
          description={
            <>
              Compose with <InlineCode>TooltipShortcut</InlineCode> to
              display a keyboard shortcut indicator alongside the tooltip
              label.
            </>
          }
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" isIconOnly>
                <Bold />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Bold
              <TooltipShortcut>&#8984;B</TooltipShortcut>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" isIconOnly>
                <Italic />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Italic
              <TooltipShortcut>&#8984;I</TooltipShortcut>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" isIconOnly>
                <Underline />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Underline
              <TooltipShortcut>&#8984;U</TooltipShortcut>
            </TooltipContent>
          </Tooltip>
        </ComponentPreview>

        <ComponentPreview
          id="placement"
          title="Placement"
          description={
            <>
              Use the <InlineCode>side</InlineCode> prop to control
              placement. Radix auto-flips when space is constrained.
            </>
          }
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary">Top</Button>
            </TooltipTrigger>
            <TooltipContent side="top">Top</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary">Right</Button>
            </TooltipTrigger>
            <TooltipContent side="right">Right</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary">Bottom</Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Bottom</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary">Left</Button>
            </TooltipTrigger>
            <TooltipContent side="left">Left</TooltipContent>
          </Tooltip>
        </ComponentPreview>
      </div>
    </TooltipProvider>
  )
}

/* ----------------------------------------------------------------
 * Page
 * ---------------------------------------------------------------- */

type Tab = "overview" | "props"

export default function TooltipPage() {
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
            Tooltip
          </h1>
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            The Tooltip component is a non-interactive overlay used to
            display additional information when users hover over, focus on,
            or interact with a UI element. Built on Radix UI for accessible
            positioning, delay management, and keyboard support.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add @lyse/tooltip")
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
              preview={
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button>Hover me</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Tooltip
                      <TooltipShortcut>&#8984;C</TooltipShortcut>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              }
              code={
                <>
                  <span style={{ color: "#c084fc" }}>import</span>
                  {" { "}
                  <span
                    style={{ color: "var(--root-color-success-400)" }}
                  >
                    Tooltip, TooltipContent, TooltipProvider, TooltipTrigger
                  </span>
                  {" }\n"}
                  <span style={{ color: "#c084fc" }}>from</span>{" "}
                  <span
                    style={{ color: "var(--root-color-warning-400)" }}
                  >{`'@/components/ui/tooltip'`}</span>
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
                  </span>
                  {" (\n"}
                  {"    <"}
                  <span
                    style={{ color: "var(--root-color-success-400)" }}
                  >
                    TooltipProvider
                  </span>
                  {">\n"}
                  {"      <"}
                  <span
                    style={{ color: "var(--root-color-success-400)" }}
                  >
                    Tooltip
                  </span>
                  {">\n"}
                  {"        <"}
                  <span
                    style={{ color: "var(--root-color-success-400)" }}
                  >
                    TooltipTrigger
                  </span>
                  {">Hover me</"}
                  <span
                    style={{ color: "var(--root-color-success-400)" }}
                  >
                    TooltipTrigger
                  </span>
                  {">\n"}
                  {"        <"}
                  <span
                    style={{ color: "var(--root-color-success-400)" }}
                  >
                    TooltipContent
                  </span>
                  {">Tooltip</"}
                  <span
                    style={{ color: "var(--root-color-success-400)" }}
                  >
                    TooltipContent
                  </span>
                  {">\n"}
                  {"      </"}
                  <span
                    style={{ color: "var(--root-color-success-400)" }}
                  >
                    Tooltip
                  </span>
                  {">\n"}
                  {"    </"}
                  <span
                    style={{ color: "var(--root-color-success-400)" }}
                  >
                    TooltipProvider
                  </span>
                  {">\n"}
                  {"  )\n"}
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
              extendsType="React.ComponentProps<TooltipPrimitive.Content>"
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
