"use client"

import { useState } from "react"
import { Spinner } from "@/registry/new-york/ui/spinner/spinner"
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
  { id: "default", label: "Default" },
  { id: "sizes", label: "Sizes" },
  { id: "custom-label", label: "Custom Label" },
  { id: "in-a-button", label: "In a Button" },
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
        description={
          <>
            A continuously rotating spinner that indicates loading. Uses{" "}
            <InlineCode>role=&quot;status&quot;</InlineCode> for screen
            reader announcements.
          </>
        }
      >
        <Spinner />
      </ComponentPreview>

      <ComponentPreview
        id="sizes"
        title="Sizes"
        description={
          <>
            Use the <InlineCode>size</InlineCode> prop with{" "}
            <InlineCode>sm</InlineCode> (16px),{" "}
            <InlineCode>md</InlineCode> (24px, default), or{" "}
            <InlineCode>lg</InlineCode> (32px).
          </>
        }
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
        description={
          <>
            Use the <InlineCode>label</InlineCode> prop to customize the
            text announced to screen readers. Defaults to{" "}
            <InlineCode>&quot;Loading&quot;</InlineCode>.
          </>
        }
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
        description={
          <>
            Compose with <InlineCode>Button</InlineCode> for async action
            feedback. The spinner inherits no conflicting styles and
            maintains its size.
          </>
        }
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

/* ----------------------------------------------------------------
 * Page
 * ---------------------------------------------------------------- */

type Tab = "overview" | "props"

export default function SpinnerPage() {
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
            Spinner
          </h1>
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            A loading indicator that signals ongoing processes. Animated
            circular spinner with semantic color tokens and built-in screen
            reader support.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add https://lyse-registry.vercel.app/r/spinner.json")
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
                <Spinner />
              }
              code={
                <>
                  <span style={{ color: "#c084fc" }}>import</span>
                  {" { "}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    Spinner
                  </span>
                  {" } "}
                  <span style={{ color: "#c084fc" }}>from</span>{" "}
                  <span
                    style={{ color: "var(--root-color-warning-400)" }}
                  >{`'@/components/ui/spinner'`}</span>
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
                    Spinner
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
          ) : (
            <div className="flex flex-col gap-4">
              <h2
                className="text-heading-small font-accent"
                style={{ color: "var(--text-base-strong)" }}
              >
                Spinner
              </h2>
              <PropsTable propDefs={propDefs} />
            </div>
          )}
        </div>
      </main>

      <TableOfContents sections={tab === "overview" ? overviewSections : []} />
    </>
  )
}
