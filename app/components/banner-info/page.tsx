"use client"

import { useState } from "react"
import { BannerInfo } from "@/registry/new-york/ui/banner-info/banner-info"
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
  { id: "variants", label: "Variants" },
  { id: "without-icon", label: "Without Icon" },
  { id: "rich-content", label: "Rich Content" },
]

const dosDontsItems: DosDontsItem[] = [
  {
    do: {
      preview: (
        <BannerInfo variant="danger">
          Unable to connect to the server. Please try again.
        </BannerInfo>
      ),
      description:
        "Use variant to match the message intent.",
    },
    dont: {
      preview: (
        <BannerInfo variant="danger">
          Your settings have been updated.
        </BannerInfo>
      ),
      description:
        "Don't use danger for non-critical informational messages.",
    },
  },
  {
    do: {
      preview: (
        <BannerInfo variant="danger" role="alert">
          Your session has expired. Please sign in again.
        </BannerInfo>
      ),
      description:
        'Use role="alert" only for critical, time-sensitive messages.',
    },
    dont: {
      preview: (
        <BannerInfo variant="neutral" role="alert">
          This section is read-only.
        </BannerInfo>
      ),
      description:
        "Don't use role=\"alert\" on every banner — it interrupts screen readers.",
    },
  },
  {
    do: {
      preview: (
        <BannerInfo variant="warning">
          Your trial expires in 3 days.
        </BannerInfo>
      ),
      description:
        "Keep text concise — one or two sentences.",
    },
    dont: {
      preview: (
        <BannerInfo variant="warning">
          Your trial expires in 3 days. Please note that after expiration all
          data will be archived and you will need to contact support to recover
          it. Make sure to export any important files before the deadline passes.
        </BannerInfo>
      ),
      description:
        "Don't put lengthy paragraphs inside a banner.",
    },
  },
  {
    do: {
      preview: (
        <BannerInfo variant="success" withIcon={false}>
          All systems operational.
        </BannerInfo>
      ),
      description:
        "Use withIcon={false} when the icon adds no value.",
    },
    dont: {
      preview: (
        <div className="flex flex-col gap-4">
          <BannerInfo variant="danger" withIcon={false}>
            Unable to connect to the server.
          </BannerInfo>
          <BannerInfo variant="warning" withIcon={false}>
            Your trial expires in 3 days.
          </BannerInfo>
        </div>
      ),
      description:
        "Don't remove the icon from danger/warning variants — the icon aids recognition.",
    },
  },
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

const importCode = `import { BannerInfo } from '@/components/ui/banner-info'

export default function Example() {
  return (
    <BannerInfo variant="success">
      Your changes have been saved successfully.
    </BannerInfo>
  )
}`

/* ----------------------------------------------------------------
 * Tabs
 * ---------------------------------------------------------------- */

function OverviewTab() {
  return (
    <div className="flex flex-col gap-12">
      <ComponentPreview
        id="default"
        title="Default"
        description="Default neutral variant with icon visible."
      >
        <BannerInfo>
          This section is read-only. Contact an admin to request edit access.
        </BannerInfo>
      </ComponentPreview>

      <ComponentPreview
        id="variants"
        title="Variants"
        description="Each variant has its own background, border, text color, and icon."
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
        description="Hides the variant icon."
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
        description="Children accept any React node -- bold text, links, or inline content."
      >
        <BannerInfo variant="warning">
          <strong>Action required:</strong> Please update your billing
          information before the end of the month to avoid service interruption.
        </BannerInfo>
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

export default function BannerInfoPage() {
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
            BannerInfo
          </h1>
          <p
            className="text-content-highlight"
            style={{ color: "var(--text-base-bolder)" }}
          >
            The BannerInfo component displays a static, contextual message to
            inform users about important states or outcomes. It helps
            communicate confirmations, warnings, errors, or general notices
            within a page section.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add https://ui.getlyse.com/r/banner-info.json")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <><Copy /> Copy install command</>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a
                href="https://v0.app/chat?q=add%20component%20from%20https%3A%2F%2Fui.getlyse.com%2Fr%2Fbanner-info.json"
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
                <BannerInfo variant="success">
                  Your changes have been saved successfully.
                </BannerInfo>
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
                BannerInfo
              </h2>
              <PropsTable
                propDefs={propDefs}
                extendsType="React.ComponentProps<'div'>"
              />
            </div>
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
