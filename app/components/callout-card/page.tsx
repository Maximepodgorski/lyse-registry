"use client"

import { useState } from "react"
import { CalloutCard } from "@/registry/new-york/ui/callout-card/callout-card"
import { toast } from "@/registry/new-york/ui/toast/toast"
import { Copy, ExternalLink, Info, Sparkles, AlertTriangle } from "lucide-react"
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
  { id: "with-action", label: "With Action" },
  { id: "dismissible", label: "Dismissible" },
]

const propDefs: PropDef[] = [
  {
    name: "icon",
    type: ["ReactNode"],
    description: "Leading icon displayed next to the title.",
  },
  {
    name: "title",
    type: ["string"],
    description: "Callout title in brand color.",
  },
  {
    name: "description",
    type: ["string"],
    description: "Callout body text.",
  },
  {
    name: "action",
    type: ["ReactNode"],
    description: "Action slot rendered below the description (e.g. a Button).",
  },
  {
    name: "onDismiss",
    type: ["() => void"],
    description:
      "Dismiss callback. When provided, a close button is rendered.",
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
            The CalloutCard draws attention with an icon, branded title,
            and description.
          </>
        }
      >
        <div className="max-w-[16rem]">
          <CalloutCard
            icon={<Info />}
            title="Tip"
            description="Use design tokens for consistent spacing across your project."
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="with-action"
        title="With Action"
        description={
          <>
            Pass an <InlineCode>action</InlineCode> slot to add a CTA
            below the description.
          </>
        }
      >
        <div className="max-w-[16rem] flex flex-col gap-4">
          <CalloutCard
            icon={<Sparkles />}
            title="New Feature"
            description="AI-powered task creation is now available."
            action={<Button size="sm">Try it</Button>}
          />
          <CalloutCard
            icon={<AlertTriangle />}
            title="Deprecation Notice"
            description="The v1 API will be removed on March 15."
            action={<Button size="sm" variant="secondary">Learn more</Button>}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="dismissible"
        title="Dismissible"
        description={
          <>
            Pass an <InlineCode>onDismiss</InlineCode> callback to show a
            close button. The callout doesn&apos;t manage its own visibility —
            handle it in your state.
          </>
        }
      >
        <div className="max-w-[16rem]">
          <CalloutCard
            icon={<Info />}
            title="Heads up"
            description="This callout can be dismissed."
            onDismiss={() => toast.success("Dismissed!")}
          />
        </div>
      </ComponentPreview>
    </div>
  )
}

/* ----------------------------------------------------------------
 * Page
 * ---------------------------------------------------------------- */

type Tab = "overview" | "props"

export default function CalloutCardPage() {
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
            CalloutCard
          </h1>
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            A callout card for tips, announcements, or contextual messages.
            Supports an icon, title, description, action slot, and a
            dismiss button.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add @lyse/callout-card")
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
                <div className="max-w-[16rem]">
                  <CalloutCard
                    icon={<Info />}
                    title="Tip"
                    description="Use tokens for consistent spacing."
                  />
                </div>
              }
              code={
                <>
                  <span style={{ color: "#c084fc" }}>import</span>
                  {" { "}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    CalloutCard
                  </span>
                  {" } "}
                  <span style={{ color: "#c084fc" }}>from</span>{" "}
                  <span style={{ color: "var(--root-color-warning-400)" }}>
                    {`'@/components/ui/callout-card'`}
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
                  </span>
                  {" <"}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    CalloutCard
                  </span>
                  {"\n    "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>
                    title
                  </span>
                  {`="Tip"\n`}
                  {"    "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>
                    description
                  </span>
                  {`="Use tokens for consistent spacing."\n`}
                  {"  />\n"}
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
