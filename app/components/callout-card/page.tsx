"use client"

import { useState } from "react"
import { CalloutCard } from "@/registry/new-york/ui/callout-card/callout-card"
import { toast } from "@/registry/new-york/ui/toast/toast"
import { Copy, ExternalLink, Info, Sparkles, AlertTriangle, Gift } from "lucide-react"
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

const importCode = `import { CalloutCard } from '@/components/ui/callout-card'

export default function Example() {
  return (
    <CalloutCard
      title="Tip"
      description="Use tokens for consistent spacing."
    />
  )
}`

const overviewSections: TocSection[] = [
  { id: "default", label: "Default" },
  { id: "with-action", label: "With Action" },
  { id: "dismissible", label: "Dismissible" },
]

const docSections: TocSection[] = [
  { id: "dos-donts", label: "Do / Don't" },
]

const dosDontsItems: DosDontsItem[] = [
  {
    do: {
      preview: (
        <div className="max-w-[14rem]">
          <CalloutCard
            icon={<Gift />}
            title="Free offer"
            description="100 tasks included."
            action={<Button size="sm">Claim</Button>}
          />
        </div>
      ),
      description:
        "Use inside menus and sidebars for contextual promotions.",
    },
    dont: {
      preview: (
        <div className="max-w-[14rem]">
          <CalloutCard
            icon={<AlertTriangle />}
            title="System error"
            description="Server is unreachable."
          />
        </div>
      ),
      description:
        "Don't use for system alerts — use Toast or BannerInfo instead.",
    },
  },
  {
    do: {
      preview: (
        <div className="max-w-[14rem]">
          <CalloutCard
            icon={<Sparkles />}
            title="New feature"
            description="AI task creation is live."
            action={<Button size="sm">Try it</Button>}
          />
        </div>
      ),
      description:
        "Pass a Button component to the action slot.",
    },
    dont: {
      preview: (
        <div className="max-w-[14rem]">
          <CalloutCard
            icon={<Sparkles />}
            title="New feature"
            description="AI task creation is live."
            action={<button>Try it</button>}
          />
        </div>
      ),
      description:
        "Don't put raw <button> elements without proper styling.",
    },
  },
  {
    do: {
      preview: (
        <div className="max-w-[14rem]">
          <CalloutCard
            icon={<Info />}
            title="Heads up"
            description="This callout can be dismissed."
            onDismiss={() => {}}
          />
        </div>
      ),
      description:
        "Provide onDismiss for non-critical content users can close.",
    },
    dont: {
      description:
        "Don't make critical information dismissible.",
    },
  },
  {
    do: {
      preview: (
        <div className="max-w-[14rem]">
          <CalloutCard
            icon={<Info />}
            title="Tip"
            description="Use tokens for consistent spacing."
          />
        </div>
      ),
      description:
        "Keep descriptions concise (1-2 lines).",
    },
    dont: {
      preview: (
        <div className="max-w-[14rem]">
          <CalloutCard
            icon={<Info />}
            title="Design system update"
            description="We have released a major update to our design token system that includes new color primitives, updated spacing scale, revised typography hierarchy, and dark mode improvements across all components."
          />
        </div>
      ),
      description:
        "Don't use as a rich content container with long text.",
    },
  },
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
        description="Draws attention with an icon, branded title, and description."
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
        description="Add a CTA below the description via the action slot."
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
        description="Pass an onDismiss callback to show a close button. Visibility is managed externally."
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

export default function CalloutCardPage() {
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
            CalloutCard
          </h1>
          <p
            className="text-content-highlight"
            style={{ color: "var(--text-base-moderate)" }}
          >
            The CalloutCard component is a branded callout used to surface
            tips, announcements, or contextual promotions. It draws attention
            to important messages that complement the main content.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add https://ui.getlyse.com/r/callout-card.json")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <><Copy /> Copy install command</>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a
                href="https://v0.app/chat?q=add%20component%20from%20https%3A%2F%2Fui.getlyse.com%2Fr%2Fcallout-card.json"
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
                <div className="max-w-[16rem]">
                  <CalloutCard
                    icon={<Info />}
                    title="Tip"
                    description="Use tokens for consistent spacing."
                  />
                </div>
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
              extendsType={`React.ComponentProps<"div">`}
            />
          ) : (
            <DocumentationTab />
          )}
        </div>
      </main>

      <TableOfContents sections={tab === "overview" ? overviewSections : tab === "documentation" ? docSections : []} />
    </>
  )
}
