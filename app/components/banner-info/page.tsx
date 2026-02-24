"use client"

import { useState } from "react"
import { BannerInfo } from "@/registry/new-york/ui/banner-info/banner-info"
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
  { id: "variants", label: "Variants" },
  { id: "without-icon", label: "Without Icon" },
  { id: "rich-content", label: "Rich Content" },
]

const propDefs: PropDef[] = [
  {
    name: "variant",
    type: ["brand", "neutral", "danger", "success", "warning"],
    default: "neutral",
    description: "Visual style matching the message intent.",
  },
  {
    name: "withIcon",
    type: ["boolean"],
    default: "true",
    description:
      "Show the variant-specific icon. When false, only the text content renders.",
  },
  {
    name: "children",
    type: ["React.ReactNode"],
    required: true,
    description: "Text or rich content displayed inside the banner.",
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
            The default variant is <InlineCode>neutral</InlineCode> with an icon
            visible. Provide children as the message content.
          </>
        }
      >
        <BannerInfo>
          This section is read-only. Contact an admin to request edit access.
        </BannerInfo>
      </ComponentPreview>

      <ComponentPreview
        id="variants"
        title="Variants"
        description={
          <>
            Use the <InlineCode>variant</InlineCode> prop to match the message
            intent. Each variant has its own background, border, text color, and
            icon.
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <BannerInfo variant="brand">
            New feature available for your workspace.
          </BannerInfo>
          <BannerInfo variant="neutral">
            This section is read-only.
          </BannerInfo>
          <BannerInfo variant="success">
            Payment processed successfully.
          </BannerInfo>
          <BannerInfo variant="danger">
            Unable to connect to the server. Please try again.
          </BannerInfo>
          <BannerInfo variant="warning">
            Your trial expires in 3 days.
          </BannerInfo>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="without-icon"
        title="Without Icon"
        description={
          <>
            Set <InlineCode>withIcon=&#123;false&#125;</InlineCode> to hide the
            variant icon.
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <BannerInfo variant="success" withIcon={false}>
            All systems operational.
          </BannerInfo>
          <BannerInfo variant="warning" withIcon={false}>
            Maintenance scheduled for tonight at 11 PM.
          </BannerInfo>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="rich-content"
        title="Rich Content"
        description={
          <>
            Children accept <InlineCode>React.ReactNode</InlineCode> — you can
            use bold text, links, or any inline content.
          </>
        }
      >
        <BannerInfo variant="warning">
          <strong>Action required:</strong> Please update your billing
          information before the end of the month to avoid service interruption.
        </BannerInfo>
      </ComponentPreview>
    </div>
  )
}

/* ----------------------------------------------------------------
 * Page
 * ---------------------------------------------------------------- */

type Tab = "overview" | "props"

export default function BannerInfoPage() {
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
            BannerInfo
          </h1>
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            A static banner that conveys contextual information to the user —
            confirmations, warnings, errors, or general notices. Supports five
            semantic variants with optional icons.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add @lyse/banner-info")
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
                <BannerInfo variant="success">
                  Your changes have been saved successfully.
                </BannerInfo>
              }
              code={
                <>
                  <span style={{ color: "#c084fc" }}>import</span>
                  {" { "}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    BannerInfo
                  </span>
                  {" } "}
                  <span style={{ color: "#c084fc" }}>from</span>{" "}
                  <span
                    style={{ color: "var(--root-color-warning-400)" }}
                  >{`'@/components/ui/banner-info'`}</span>
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
                  {" (\n"}
                  {"    <"}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    BannerInfo
                  </span>
                  {' variant="success">\n'}
                  {"      Your changes have been saved successfully.\n"}
                  {"    </"}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    BannerInfo
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
            <div className="flex flex-col gap-4">
              <h2
                className="text-heading-small font-accent"
                style={{ color: "var(--text-base-strong)" }}
              >
                BannerInfo
              </h2>
              <PropsTable
                propDefs={propDefs}
                extendsType="React.ComponentProps<'div'>"
              />
            </div>
          )}
        </div>
      </main>

      <TableOfContents sections={tab === "overview" ? overviewSections : []} />
    </>
  )
}
