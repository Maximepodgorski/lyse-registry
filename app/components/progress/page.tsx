"use client"

import { useState } from "react"
import {
  ProgressIndicator,
} from "@/registry/new-york/ui/progress/progress"
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
  { id: "default", label: "Default" },
  { id: "sizes", label: "Sizes" },
  { id: "steps", label: "Steps" },
  { id: "label-position", label: "Label Position" },
  { id: "interactive", label: "Interactive" },
]

const docSections: TocSection[] = [
  { id: "dos-donts", label: "Do / Don't" },
]

const dosDontsItems: DosDontsItem[] = [
  {
    do: {
      preview: (
        <div className="w-full max-w-xs">
          <ProgressIndicator value={60} labelPosition="right" />
        </div>
      ),
      description:
        'Use labelPosition="right" when horizontal space allows.',
    },
    dont: {
      preview: (
        <div style={{ width: "120px" }}>
          <ProgressIndicator value={60} labelPosition="bottom" />
        </div>
      ),
      description:
        'Don\'t use labelPosition="bottom" in tight horizontal layouts.',
    },
  },
  {
    do: {
      preview: (
        <div className="w-full max-w-xs">
          <ProgressIndicator value={60} steps={5} />
        </div>
      ),
      description:
        "Use steps={5} (default) for general progress indicators.",
    },
    dont: {
      preview: (
        <div className="w-full max-w-xs">
          <ProgressIndicator value={70} steps={15} />
        </div>
      ),
      description:
        "Don't use many steps (>10) — segments become too thin to read.",
    },
  },
  {
    do: {
      preview: (
        <div className="flex flex-col gap-[var(--layout-gap-sm)] w-full max-w-xs">
          <span className="text-content-caption font-accent" style={{ color: "var(--text-base-moderate)" }}>Profile setup</span>
          <ProgressIndicator value={60} labelPosition="right" />
        </div>
      ),
      description:
        "Pair with a text label above for context.",
    },
    dont: {
      preview: (
        <div className="w-full max-w-xs">
          <ProgressIndicator value={40} />
        </div>
      ),
      description:
        "Don't rely on the bar alone without surrounding context.",
    },
  },
  {
    do: {
      preview: (
        <div className="w-full max-w-xs">
          <ProgressIndicator value={80} size="sm" labelPosition="right" />
        </div>
      ),
      description:
        'Use size="sm" for compact inline metrics.',
    },
    dont: {
      preview: (
        <div className="w-full max-w-xs">
          <ProgressIndicator value={80} size="md" />
        </div>
      ),
      description:
        'Don\'t use size="md" inside dense data tables.',
    },
  },
]

const indicatorPropDefs: PropDef[] = [
  {
    name: "value",
    type: ["number"],
    default: "0",
    description: "Progress value from 0 to 100.",
  },
  {
    name: "steps",
    type: ["number"],
    default: "5",
    description: "Number of discrete segments in the bar.",
  },
  {
    name: "size",
    type: ["sm", "md"],
    default: "md",
    description: "Height of the progress bar segments.",
  },
  {
    name: "labelPosition",
    type: ["none", "right", "bottom"],
    default: "none",
    description: "Where to display the percentage label.",
  },
  {
    name: "label",
    type: ["string"],
    default: '"Progress"',
    description:
      "Accessible label for the progressbar role (aria-label).",
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
  const [value, setValue] = useState(60)

  return (
    <div className="flex flex-col gap-12">
      <ComponentPreview
        id="default"
        title="Default"
        description="A segmented progress bar with discrete steps and ARIA progressbar semantics."
      >
        <div className="w-full max-w-sm">
          <ProgressIndicator value={60} />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="sizes"
        title="Sizes"
        description="Two heights: sm (4px) and md (8px, default)."
      >
        <div className="flex flex-col gap-[var(--layout-gap-2xl)] w-full max-w-sm">
          <div className="flex flex-col gap-[var(--layout-gap-sm)]">
            <span
              className="text-content-caption"
              style={{ color: "var(--text-base-moderate)" }}
            >
              sm
            </span>
            <ProgressIndicator value={60} size="sm" />
          </div>
          <div className="flex flex-col gap-[var(--layout-gap-sm)]">
            <span
              className="text-content-caption"
              style={{ color: "var(--text-base-moderate)" }}
            >
              md
            </span>
            <ProgressIndicator value={60} size="md" />
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="steps"
        title="Steps"
        description="Controls the number of discrete segments. Defaults to 5."
      >
        <div className="flex flex-col gap-[var(--layout-gap-2xl)] w-full max-w-sm">
          <div className="flex flex-col gap-[var(--layout-gap-sm)]">
            <span
              className="text-content-caption"
              style={{ color: "var(--text-base-moderate)" }}
            >
              3 steps
            </span>
            <ProgressIndicator value={66} steps={3} />
          </div>
          <div className="flex flex-col gap-[var(--layout-gap-sm)]">
            <span
              className="text-content-caption"
              style={{ color: "var(--text-base-moderate)" }}
            >
              5 steps (default)
            </span>
            <ProgressIndicator value={60} steps={5} />
          </div>
          <div className="flex flex-col gap-[var(--layout-gap-sm)]">
            <span
              className="text-content-caption"
              style={{ color: "var(--text-base-moderate)" }}
            >
              10 steps
            </span>
            <ProgressIndicator value={70} steps={10} />
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="label-position"
        title="Label Position"
        description="Shows the percentage label to the right or bottom of the bar."
      >
        <div className="flex flex-col gap-[var(--layout-gap-2xl)] w-full max-w-sm">
          <div className="flex flex-col gap-[var(--layout-gap-sm)]">
            <span
              className="text-content-caption"
              style={{ color: "var(--text-base-moderate)" }}
            >
              none (default)
            </span>
            <ProgressIndicator value={60} labelPosition="none" />
          </div>
          <div className="flex flex-col gap-[var(--layout-gap-sm)]">
            <span
              className="text-content-caption"
              style={{ color: "var(--text-base-moderate)" }}
            >
              right
            </span>
            <ProgressIndicator value={60} labelPosition="right" />
          </div>
          <div className="flex flex-col gap-[var(--layout-gap-sm)]">
            <span
              className="text-content-caption"
              style={{ color: "var(--text-base-moderate)" }}
            >
              bottom
            </span>
            <ProgressIndicator value={60} labelPosition="bottom" />
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="interactive"
        title="Interactive"
        description="Drag the buttons to change the progress value and see the bar update in real time."
      >
        <div className="flex flex-col gap-[var(--layout-gap-xl)] w-full max-w-sm">
          <ProgressIndicator
            value={value}
            steps={5}
            labelPosition="right"
          />
          <div className="flex items-center gap-[var(--layout-gap-md)]">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setValue((v) => Math.max(0, v - 20))}
            >
              − 20
            </Button>
            <span
              className="text-content-note font-accent min-w-[3ch] text-center"
              style={{ color: "var(--text-base-strong)" }}
            >
              {value}%
            </span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setValue((v) => Math.min(100, v + 20))}
            >
              + 20
            </Button>
          </div>
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

export default function ProgressPage() {
  const [tab, setTab] = useState<Tab>("overview")

  return (
    <>
      <main className="flex-1 min-w-0 py-16 flex flex-col gap-10 max-w-none px-8 lg:px-16 xl:px-20">
        {/* Hero */}
        <div className="flex flex-col gap-3">
          <h1
            className="font-bold"
            style={{ color: "var(--text-base-strong)", fontSize: "var(--root-font-size-5xl)" }}
          >
            Progress
          </h1>
          <p
            className="text-content-highlight"
            style={{ color: "var(--text-base-moderate)" }}
          >
            The Progress component visualizes task completion through a
            segmented bar. It helps users understand how far along a process
            is, providing clear feedback on multi-step workflows.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add https://ui.getlyse.com/r/progress.json")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <><Copy /> Copy install command</>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a
                href="https://v0.app/chat?q=add%20component%20from%20https%3A%2F%2Fui.getlyse.com%2Fr%2Fprogress.json"
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
                <div className="w-full max-w-xs">
                  <ProgressIndicator value={60} labelPosition="right" />
                </div>
              }
              code={
                <>
                  <span style={{ color: "#c084fc" }}>import</span>
                  {" { "}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    ProgressIndicator
                  </span>
                  {" } "}
                  <span style={{ color: "#c084fc" }}>from</span>{" "}
                  <span
                    style={{ color: "var(--root-color-warning-400)" }}
                  >{`'@/components/ui/progress'`}</span>
                  {"\n\n"}
                  <span style={{ color: "var(--root-color-brand-400)" }}>
                    export default
                  </span>{" "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>
                    function
                  </span>{" "}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    Example
                  </span>
                  {"() {\n"}
                  {"  "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>
                    return
                  </span>
                  {" <"}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    ProgressIndicator
                  </span>
                  {" "}
                  <span style={{ color: "var(--root-color-brand-300)" }}>
                    value
                  </span>
                  {"={"}
                  <span style={{ color: "var(--root-color-warning-400)" }}>
                    60
                  </span>
                  {"} "}
                  <span style={{ color: "var(--root-color-brand-300)" }}>
                    labelPosition
                  </span>
                  {"="}
                  <span style={{ color: "var(--root-color-warning-400)" }}>
                    {'"right"'}
                  </span>
                  {" />\n"}
                  {"}"}
                </>
              }
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
                ProgressIndicator
              </h2>
              <PropsTable propDefs={indicatorPropDefs} />
            </div>
          ) : (
            <DocumentationTab />
          )}
        </div>
      </main>

      <TableOfContents sections={tab === "overview" ? overviewSections : tab === "documentation" ? docSections : []} />
    </>
  )
}
