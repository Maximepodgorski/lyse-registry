"use client"

import { useState } from "react"
import { SpotlightCard } from "@/registry/new-york/ui/spotlight-card/spotlight-card"
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
  { id: "with-image", label: "With Image" },
  { id: "grid", label: "Grid Layout" },
]

const propDefs: PropDef[] = [
  {
    name: "title",
    type: ["string"],
    description: "Card title.",
  },
  {
    name: "description",
    type: ["string"],
    description: "Supporting text below the title.",
  },
  {
    name: "image",
    type: ["ReactNode"],
    description:
      "Image slot. Falls back to a gradient placeholder if not provided.",
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
        description={
          <>
            The SpotlightCard displays a prominent image area above a
            title and description. Without an image, a gradient fallback
            is shown.
          </>
        }
      >
        <div className="w-[16rem] h-64">
          <SpotlightCard
            title="Slack integration"
            description="Turn conversations into tasks automatically."
            className="h-full"
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="with-image"
        title="With Image"
        description={
          <>
            Pass an <InlineCode>image</InlineCode> slot with an{" "}
            <InlineCode>{"<img>"}</InlineCode> element. The image is
            rendered with <InlineCode>object-fit: cover</InlineCode>.
          </>
        }
      >
        <div className="w-[16rem] h-64">
          <SpotlightCard
            title="Sprint Review"
            description="Recap what shipped this week."
            className="h-full"
            image={
              <div
                className="w-full h-full"
                style={{
                  background:
                    "linear-gradient(135deg, var(--background-brand-faint-default), var(--background-brand-lighter-default))",
                }}
              />
            }
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="grid"
        title="Grid Layout"
        description="SpotlightCards work well in responsive grids."
      >
        <div className="grid grid-cols-3 gap-4">
          {[
            { title: "Roadmap", description: "Plan what's next." },
            { title: "Changelog", description: "Track every release." },
            { title: "Analytics", description: "Measure what matters." },
          ].map((item) => (
            <div key={item.title} className="w-[16rem] h-56">
              <SpotlightCard
                title={item.title}
                description={item.description}
                className="h-full"
              />
            </div>
          ))}
        </div>
      </ComponentPreview>
    </div>
  )
}

/* ----------------------------------------------------------------
 * Page
 * ---------------------------------------------------------------- */

type Tab = "overview" | "props"

export default function SpotlightCardPage() {
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
            SpotlightCard
          </h1>
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            A vertical card with a prominent image area, title, and
            description. Ideal for feature showcases, galleries, or content
            highlights.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add @lyse/spotlight-card")
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
                <div className="w-[16rem] h-56">
                  <SpotlightCard
                    title="Slack integration"
                    description="Turn conversations into tasks."
                    className="h-full"
                  />
                </div>
              }
              code={
                <>
                  <span style={{ color: "#c084fc" }}>import</span>
                  {" { "}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    SpotlightCard
                  </span>
                  {" } "}
                  <span style={{ color: "#c084fc" }}>from</span>{" "}
                  <span style={{ color: "var(--root-color-warning-400)" }}>
                    {`'@/components/ui/spotlight-card'`}
                  </span>
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
                  </span>{" "}
                  {"<"}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    SpotlightCard
                  </span>
                  {" "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>
                    title
                  </span>
                  {`="Slack integration" `}
                  <span style={{ color: "var(--root-color-brand-400)" }}>
                    description
                  </span>
                  {`="Turn conversations into tasks." />\n`}
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
              extendsType={`React.ComponentProps<"div">`}
            />
          )}
        </div>
      </main>

      <TableOfContents sections={tab === "overview" ? overviewSections : []} />
    </>
  )
}
