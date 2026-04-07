"use client"

import { useState } from "react"
import { Stepper } from "@/registry/new-york/ui/stepper/stepper"
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

const importCode = `import { Stepper } from '@/components/ui/stepper'

export default function Example() {
  return <Stepper current={2} total={5} />
}`

const overviewSections: TocSection[] = [
  { id: "default", label: "Default" },
  { id: "variants", label: "Variants" },
  { id: "sizes", label: "Sizes" },
  { id: "interactive", label: "Interactive" },
]

const dosDontsItems: DosDontsItem[] = [
  {
    do: {
      preview: <Stepper current={2} total={5} />,
      description:
        "Use Stepper for wizard flows and onboarding sequences where users progress through discrete steps.",
    },
    dont: {
      preview: <Stepper current={3} total={10} />,
      description:
        "Don't use Stepper for generic progress — use the Progress component instead.",
    },
  },
  {
    do: {
      preview: <Stepper current={1} total={4} />,
      description:
        "Keep total steps between 3 and 7 for clear visual communication.",
    },
    dont: {
      preview: <Stepper current={5} total={15} />,
      description:
        "Don't use too many steps — dots become hard to distinguish at high counts.",
    },
  },
]

const propDefs: PropDef[] = [
  {
    name: "current",
    type: ["number"],
    default: "0",
    description: "Active step index (0-based).",
  },
  {
    name: "total",
    type: ["number"],
    description: "Total number of steps.",
  },
  {
    name: "variant",
    type: ["neutral", "brand"],
    default: "neutral",
    description: "Color variant. Brand uses accent colors for dots.",
  },
  {
    name: "size",
    type: ["sm", "md"],
    default: "md",
    description: "Size of the dots and active pill.",
  },
  {
    name: "onStepClick",
    type: ["(step: number) => void"],
    description:
      "Optional click handler. When provided, dots render as buttons.",
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
  const [current, setCurrent] = useState(2)

  return (
    <div className="flex flex-col gap-12">
      <ComponentPreview
        id="default"
        title="Default"
        description="Dot-based step indicator. The active step renders as a wider pill."
      >
        <Stepper current={2} total={5} />
      </ComponentPreview>

      <ComponentPreview
        id="variants"
        title="Variants"
        description="Neutral (default) uses greyscale tones. Brand uses accent colors for a stronger visual tie to your theme."
      >
        <div className="flex flex-col items-start gap-[var(--layout-gap-2xl)]">
          <div className="flex flex-col gap-[var(--layout-gap-md)]">
            <span
              className="text-content-caption"
              style={{ color: "var(--text-base-bolder)" }}
            >
              neutral
            </span>
            <Stepper current={2} total={5} variant="neutral" />
          </div>
          <div className="flex flex-col gap-[var(--layout-gap-md)]">
            <span
              className="text-content-caption"
              style={{ color: "var(--text-base-bolder)" }}
            >
              brand
            </span>
            <Stepper current={2} total={5} variant="brand" />
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="sizes"
        title="Sizes"
        description="Two sizes: sm and md (default)."
      >
        <div className="flex flex-col items-start gap-[var(--layout-gap-2xl)]">
          <div className="flex flex-col gap-[var(--layout-gap-md)]">
            <span
              className="text-content-caption"
              style={{ color: "var(--text-base-bolder)" }}
            >
              sm
            </span>
            <Stepper current={2} total={5} size="sm" />
          </div>
          <div className="flex flex-col gap-[var(--layout-gap-md)]">
            <span
              className="text-content-caption"
              style={{ color: "var(--text-base-bolder)" }}
            >
              md
            </span>
            <Stepper current={2} total={5} size="md" />
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="interactive"
        title="Interactive"
        description="With onStepClick, dots become clickable buttons. Click any dot to navigate."
      >
        <div className="flex flex-col items-start gap-[var(--layout-gap-lg)]">
          <Stepper
            current={current}
            total={7}
            onStepClick={(step) => setCurrent(step)}
          />
          <span
            className="text-content-note"
            style={{ color: "var(--text-base-bolder)" }}
          >
            Step {current + 1} of 7
          </span>
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

export default function StepperPage() {
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
            Stepper
          </h1>
          <p
            className="text-content-highlight"
            style={{ color: "var(--text-base-bolder)" }}
          >
            A dot-based step indicator for wizard flows and onboarding sequences.
            The active step renders as a wider pill, completed steps as filled
            dots, and incomplete steps as subtle dots.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add https://ui.getlyse.com/r/stepper.json")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <Copy /> Copy install command
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a
                href="https://v0.app/chat?q=add%20component%20from%20https%3A%2F%2Fui.getlyse.com%2Fr%2Fstepper.json"
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
                <Stepper current={2} total={5} />
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
                Stepper
              </h2>
              <PropsTable propDefs={propDefs} />
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
