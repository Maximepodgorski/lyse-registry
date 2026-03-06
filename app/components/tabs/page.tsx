"use client"

import { useState } from "react"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs/tabs"
import { Button } from "@/registry/new-york/ui/button/button"
import { toast } from "@/registry/new-york/ui/toast/toast"
import { Copy, ExternalLink } from "lucide-react"
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
  { id: "underline", label: "Underline" },
  { id: "pill", label: "Pill" },
  { id: "sizes", label: "Sizes" },
  { id: "disabled", label: "Disabled" },
]

const propDefs: PropDef[] = [
  {
    name: "variant",
    type: ["underline", "pill"],
    default: "underline",
    description: "Visual style of the tabs.",
  },
  {
    name: "size",
    type: ["sm", "md"],
    default: "md",
    description: "Height and font size of the tab triggers.",
  },
  {
    name: "defaultValue",
    type: ["string"],
    description: "Initial active tab (uncontrolled).",
  },
  {
    name: "value",
    type: ["string"],
    description: "Active tab value (controlled).",
  },
  {
    name: "onValueChange",
    type: ["(value: string) => void"],
    description: "Callback when the active tab changes.",
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
        id="underline"
        title="Underline"
        description={
          <>
            The default <InlineCode>underline</InlineCode> variant uses a bottom
            border indicator. Clean and minimal — great for content sections and
            page-level navigation.
          </>
        }
      >
        <Tabs defaultValue="overview" variant="underline">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
        </Tabs>
      </ComponentPreview>

      <ComponentPreview
        id="pill"
        title="Pill"
        description={
          <>
            The <InlineCode>pill</InlineCode> variant wraps triggers in a
            neutral container with a filled background for the active tab.
            Compact and modern — ideal for toggling between views within a card
            or panel.
          </>
        }
      >
        <Tabs defaultValue="grid" variant="pill">
          <TabsList>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
          </TabsList>
        </Tabs>
      </ComponentPreview>

      <ComponentPreview
        id="sizes"
        title="Sizes"
        description={
          <>
            Use the <InlineCode>size</InlineCode> prop with{" "}
            <InlineCode>sm</InlineCode> or <InlineCode>md</InlineCode>{" "}
            (default). Size applies to all triggers via context.
          </>
        }
      >
        <div className="flex flex-col gap-8 w-full">
          <Tabs defaultValue="a" variant="underline" size="sm">
            <TabsList>
              <TabsTrigger value="a">Small</TabsTrigger>
              <TabsTrigger value="b">Underline</TabsTrigger>
              <TabsTrigger value="c">Tabs</TabsTrigger>
            </TabsList>
          </Tabs>
          <Tabs defaultValue="a" variant="underline" size="md">
            <TabsList>
              <TabsTrigger value="a">Medium</TabsTrigger>
              <TabsTrigger value="b">Underline</TabsTrigger>
              <TabsTrigger value="c">Tabs</TabsTrigger>
            </TabsList>
          </Tabs>
          <Tabs defaultValue="a" variant="pill" size="sm">
            <TabsList>
              <TabsTrigger value="a">Small</TabsTrigger>
              <TabsTrigger value="b">Pill</TabsTrigger>
              <TabsTrigger value="c">Tabs</TabsTrigger>
            </TabsList>
          </Tabs>
          <Tabs defaultValue="a" variant="pill" size="md">
            <TabsList>
              <TabsTrigger value="a">Medium</TabsTrigger>
              <TabsTrigger value="b">Pill</TabsTrigger>
              <TabsTrigger value="c">Tabs</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="disabled"
        title="Disabled"
        description="Individual triggers can be disabled via the disabled prop."
      >
        <div className="flex flex-col gap-6 w-full">
          <Tabs defaultValue="active" variant="underline">
            <TabsList>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="disabled" disabled>
                Disabled
              </TabsTrigger>
              <TabsTrigger value="another">Another</TabsTrigger>
            </TabsList>
          </Tabs>
          <Tabs defaultValue="active" variant="pill">
            <TabsList>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="disabled" disabled>
                Disabled
              </TabsTrigger>
              <TabsTrigger value="another">Another</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </ComponentPreview>
    </div>
  )
}

/* ----------------------------------------------------------------
 * Page
 * ---------------------------------------------------------------- */

type Tab = "overview" | "props"

export default function TabsPage() {
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
            Tabs
          </h1>
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            Tabs organize content into distinct sections, allowing users to
            switch between views. Built on Radix Tabs for full keyboard
            navigation and accessibility. Two visual styles: underline for
            page-level navigation, pill for compact view toggles.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add https://lyse-registry.vercel.app/r/tabs.json")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <Copy /> Copy install command
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
                <Tabs defaultValue="tab1" variant="underline">
                  <TabsList>
                    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                  </TabsList>
                </Tabs>
              }
              code={
                <>
                  <span style={{ color: "#c084fc" }}>import</span>
                  {" { "}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    Tabs, TabsList, TabsTrigger, TabsContent
                  </span>
                  {" } "}
                  <span style={{ color: "#c084fc" }}>from</span>{" "}
                  <span
                    style={{ color: "var(--root-color-warning-400)" }}
                  >{`'@/components/ui/tabs'`}</span>
                  {"\n\n"}
                  <span style={{ color: "var(--root-color-brand-400)" }}>
                    {"<"}
                  </span>
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    Tabs
                  </span>
                  {' defaultValue="tab1">\n  '}
                  <span style={{ color: "var(--root-color-brand-400)" }}>
                    {"<"}
                  </span>
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    TabsList
                  </span>
                  {">\n    "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>
                    {"<"}
                  </span>
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    TabsTrigger
                  </span>
                  {' value="tab1">Tab 1</'}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    TabsTrigger
                  </span>
                  {">\n    "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>
                    {"<"}
                  </span>
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    TabsTrigger
                  </span>
                  {' value="tab2">Tab 2</'}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    TabsTrigger
                  </span>
                  {">\n  </"}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    TabsList
                  </span>
                  {">\n</"}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    Tabs
                  </span>
                  {">"}
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
              extendsType={`React.ComponentProps<typeof TabsPrimitive.Root>`}
            />
          )}
        </div>
      </main>

      <TableOfContents
        sections={tab === "overview" ? overviewSections : []}
      />
    </>
  )
}
