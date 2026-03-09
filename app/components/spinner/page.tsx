"use client"

import { useState } from "react"
import { Spinner } from "@/registry/new-york/ui/spinner/spinner"
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

const importCode = `import { Spinner } from '@/components/ui/spinner'

export default function Example() {
  return <Spinner />
}`

const overviewSections: TocSection[] = [
  { id: "default", label: "Default" },
  { id: "sizes", label: "Sizes" },
  { id: "custom-label", label: "Custom Label" },
  { id: "in-a-button", label: "In a Button" },
]

const docSections: TocSection[] = [
  { id: "dos-donts", label: "Do / Don't" },
]

const dosDontsItems: DosDontsItem[] = [
  {
    do: {
      preview: (
        <div className="flex items-center gap-[var(--layout-gap-md)]">
          <Spinner size="sm" />
          <span className="text-content-note" style={{ color: "var(--text-base-moderate)" }}>Loading...</span>
        </div>
      ),
      description:
        'Use size="sm" when placing inside a button or inline with text.',
    },
    dont: {
      preview: (
        <div className="flex items-center justify-center w-16 h-16" style={{ border: "var(--layout-border-thin) solid var(--border-default)", borderRadius: "var(--layout-radius-md)" }}>
          <Spinner size="lg" />
        </div>
      ),
      description:
        'Don\'t use size="lg" inside a small container — it will look oversized.',
    },
  },
  {
    do: {
      preview: <Spinner label="Saving changes" />,
      description:
        'Provide a descriptive label for screen readers (e.g., "Loading messages").',
    },
    dont: {
      preview: <Spinner />,
      description:
        'Don\'t leave the default "Loading" when a more specific label is available.',
    },
  },
  {
    do: {
      preview: <Spinner size="md" />,
      description:
        "Show the spinner only after a short delay (200ms+) for fast operations.",
    },
    dont: {
      preview: <Spinner size="sm" />,
      description:
        "Don't flash the spinner for instant operations — it creates visual noise.",
    },
  },
]

const propDefs: PropDef[] = [
  {
    name: "size",
    type: ["sm", "md", "lg"],
    default: "md",
    description: "Diameter of the spinner.",
  },
  {
    name: "label",
    type: ["string"],
    default: '"Loading"',
    description:
      "Accessible label announced to screen readers via a visually hidden span.",
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
  const [loading, setLoading] = useState(false)

  return (
    <div className="flex flex-col gap-12">
      <ComponentPreview
        id="default"
        title="Default"
        description="Continuously rotating spinner that indicates loading."
      >
        <Spinner />
      </ComponentPreview>

      <ComponentPreview
        id="sizes"
        title="Sizes"
        description="Three sizes: sm (16px), md (24px, default), and lg (32px)."
      >
        <div className="flex items-center gap-[var(--layout-gap-2xl)]">
          <div className="flex flex-col items-center gap-[var(--layout-gap-md)]">
            <Spinner size="sm" />
            <span
              className="text-content-caption"
              style={{ color: "var(--text-base-moderate)" }}
            >
              sm
            </span>
          </div>
          <div className="flex flex-col items-center gap-[var(--layout-gap-md)]">
            <Spinner size="md" />
            <span
              className="text-content-caption"
              style={{ color: "var(--text-base-moderate)" }}
            >
              md
            </span>
          </div>
          <div className="flex flex-col items-center gap-[var(--layout-gap-md)]">
            <Spinner size="lg" />
            <span
              className="text-content-caption"
              style={{ color: "var(--text-base-moderate)" }}
            >
              lg
            </span>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="custom-label"
        title="Custom Label"
        description="Customizes the text announced to screen readers. Defaults to &quot;Loading&quot;."
      >
        <div className="flex items-center gap-[var(--layout-gap-2xl)]">
          <div className="flex items-center gap-[var(--layout-gap-md)]">
            <Spinner label="Saving changes" />
            <span
              className="text-content-note"
              style={{ color: "var(--text-base-moderate)" }}
            >
              label=&quot;Saving changes&quot;
            </span>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="in-a-button"
        title="In a Button"
        description="Compose with Button for async action feedback."
      >
        <div className="flex items-center gap-[var(--layout-gap-lg)]">
          <Button
            variant="primary"
            size="md"
            disabled={loading}
            onClick={() => {
              setLoading(true)
              setTimeout(() => setLoading(false), 2000)
            }}
          >
            {loading ? (
              <>
                <Spinner size="sm" label="Submitting" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
          <Button variant="secondary" size="md" disabled>
            <Spinner size="sm" />
            Loading...
          </Button>
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

export default function SpinnerPage() {
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
            Spinner
          </h1>
          <p
            className="text-content-highlight"
            style={{ color: "var(--text-base-moderate)" }}
          >
            The Spinner component is an animated loading indicator that
            communicates ongoing background processes. It provides visual
            feedback to users while content or actions are being processed.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add https://ui.getlyse.com/r/spinner.json")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <><Copy /> Copy install command</>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a
                href="https://v0.app/chat?q=add%20component%20from%20https%3A%2F%2Fui.getlyse.com%2Fr%2Fspinner.json"
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
                <Spinner />
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
                Spinner
              </h2>
              <PropsTable propDefs={propDefs} />
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
