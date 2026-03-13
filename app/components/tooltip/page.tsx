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
  { id: "default", label: "Default" },
  { id: "sizes", label: "Sizes" },
  { id: "with-shortcut", label: "With Shortcut" },
  { id: "placement", label: "Placement" },
]

const dosDontsItems: DosDontsItem[] = [
  {
    do: {
      preview: (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" size="sm">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>Copy link</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
      description:
        'Use asChild on TooltipTrigger to avoid a redundant wrapping element.',
    },
    dont: {
      preview: (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="secondary" size="sm">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>Copy link</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
      description:
        "Don't nest a <button> inside TooltipTrigger without asChild \u2014 it produces invalid HTML.",
    },
  },
  {
    do: {
      preview: (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" size="sm" isIconOnly aria-label="Copy">
                <Copy />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy link</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
      description:
        "Keep tooltip text to a single short phrase (under 10 words).",
    },
    dont: {
      preview: (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" size="sm" isIconOnly aria-label="Copy">
                <Copy />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Click here to copy the shareable link to your clipboard for sharing</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
      description:
        "Don't write multi-sentence explanations \u2014 use a Popover or inline hint instead.",
    },
  },
  {
    do: {
      preview: (
        <div className="flex flex-col items-center gap-1">
          <span className="text-content-caption" style={{ color: "var(--text-base-bolder)" }}>App layout</span>
          <div className="flex items-center gap-[var(--layout-gap-sm)]" style={{ border: "var(--layout-border-thin) dashed var(--border-default)", borderRadius: "var(--layout-radius-md)", padding: "var(--layout-padding-sm) var(--layout-padding-md)" }}>
            <span className="text-content-caption font-accent" style={{ color: "var(--text-base-strong)" }}>TooltipProvider</span>
          </div>
        </div>
      ),
      description:
        "Place TooltipProvider once at the app or layout level.",
    },
    dont: {
      preview: (
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-[var(--layout-gap-xs)]">
            {["A", "B", "C"].map((label) => (
              <div key={label} className="flex flex-col items-center gap-0.5" style={{ border: "var(--layout-border-thin) dashed var(--border-default)", borderRadius: "var(--layout-radius-md)", padding: "var(--layout-padding-xs) var(--layout-padding-sm)" }}>
                <span className="text-content-caption" style={{ color: "var(--text-base-moderate)", fontSize: "9px" }}>Provider</span>
                <span className="text-content-caption font-accent" style={{ color: "var(--text-base-strong)", fontSize: "10px" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      ),
      description:
        "Don't wrap every individual tooltip in its own TooltipProvider.",
    },
  },
  {
    do: {
      preview: (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" size="sm" isIconOnly aria-label="Bold">
                <Bold />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bold</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
      description:
        "Provide aria-label on icon-only triggers for screen reader accessibility.",
    },
    dont: {
      preview: (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" size="sm" isIconOnly>
                <Bold />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bold</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
      description:
        "Don't rely on the tooltip as the sole accessible name \u2014 it is not announced until hover/focus.",
    },
  },
  {
    do: {
      preview: (
        <TooltipProvider delayDuration={100}>
          <div className="flex items-center gap-[var(--layout-gap-xs)]">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="sm" isIconOnly aria-label="Bold">
                  <Bold />
                </Button>
              </TooltipTrigger>
              <TooltipContent size="sm">Bold</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="sm" isIconOnly aria-label="Italic">
                  <Italic />
                </Button>
              </TooltipTrigger>
              <TooltipContent size="sm">Italic</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      ),
      description:
        'Use size="sm" in dense toolbars for compact tooltips.',
    },
    dont: {
      preview: (
        <TooltipProvider delayDuration={100}>
          <div className="flex items-center gap-[var(--layout-gap-xs)]">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="sm" isIconOnly aria-label="Bold">
                  <Bold />
                </Button>
              </TooltipTrigger>
              <TooltipContent size="md">Bold</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="sm" isIconOnly aria-label="Italic">
                  <Italic />
                </Button>
              </TooltipTrigger>
              <TooltipContent size="sm">Italic</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      ),
      description:
        'Don\'t mix size="md" and size="sm" in the same toolbar.',
    },
  },
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
          description="Two sizes: md (default) and sm. Each adjusts padding and font size."
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
          description="Displays a keyboard shortcut indicator alongside the tooltip label."
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
          description="Controls which side the tooltip appears on. Auto-flips when space is constrained."
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

const importCode = `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export default function Example() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}`

type Tab = "overview" | "props" | "documentation"

export default function TooltipPage() {
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
            Tooltip
          </h1>
          <p
            className="text-content-highlight"
            style={{ color: "var(--text-base-bolder)" }}
          >
            The Tooltip component provides additional context or descriptions
            through a non-interactive overlay. It appears on hover or keyboard
            focus, helping users understand interface elements without
            cluttering the layout.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add https://ui.getlyse.com/r/tooltip.json")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <><Copy /> Copy install command</>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a
                href="https://v0.app/chat?q=add%20component%20from%20https%3A%2F%2Fui.getlyse.com%2Fr%2Ftooltip.json"
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
              extendsType="React.ComponentProps<TooltipPrimitive.Content>"
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
