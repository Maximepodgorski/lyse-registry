"use client"

import { useState } from "react"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/new-york/ui/accordion/accordion"
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

const importCode = `import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

export default function FAQ() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Lyse?</AccordionTrigger>
        <AccordionContent>
          An AI agent that eliminates the cognitive burden
          of organizing work for tech teams.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`

const overviewSections: TocSection[] = [
  { id: "single", label: "Single" },
  { id: "multiple", label: "Multiple" },
  { id: "disabled", label: "Disabled" },
  { id: "default-open", label: "Default open" },
]

const dosDontsItems: DosDontsItem[] = [
  {
    do: {
      preview: (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="do-1">
            <AccordionTrigger>Short, scannable label</AccordionTrigger>
            <AccordionContent>
              Keep trigger labels concise. Move details to the content area.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ),
      description:
        "Use collapsible in single mode so users can close all sections.",
    },
    dont: {
      preview: (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="dont-1">
            <AccordionTrigger>
              This is a very long trigger label that explains everything in the header itself
            </AccordionTrigger>
            <AccordionContent>Not much left to say here.</AccordionContent>
          </AccordionItem>
        </Accordion>
      ),
      description:
        "Don't put long descriptions in the trigger — move them to content.",
    },
  },
]

const accordionPropDefs: PropDef[] = [
  {
    name: "type",
    type: ["single", "multiple"],
    description: "Single allows one open at a time, multiple allows many.",
  },
  {
    name: "collapsible",
    type: ["boolean"],
    default: "false",
    description: "Allow closing all items in single mode.",
  },
  {
    name: "value",
    type: ["string", "string[]"],
    description: "Controlled open item(s).",
  },
  {
    name: "defaultValue",
    type: ["string", "string[]"],
    description: "Default open item(s).",
  },
  {
    name: "onValueChange",
    type: ["(value) => void"],
    description: "Called when open items change.",
  },
  {
    name: "disabled",
    type: ["boolean"],
    default: "false",
    description: "Disables all items.",
  },
  {
    name: "className",
    type: ["string"],
    description: "Additional class names merged via cn().",
  },
]

const itemPropDefs: PropDef[] = [
  {
    name: "value",
    type: ["string"],
    description: "Unique identifier for this item (required).",
  },
  {
    name: "disabled",
    type: ["boolean"],
    default: "false",
    description: "Disables this item.",
  },
]

/* ----------------------------------------------------------------
 * Tabs
 * ---------------------------------------------------------------- */

function OverviewTab() {
  return (
    <div className="flex flex-col gap-12">
      <ComponentPreview
        id="single"
        title="Single"
        description="Only one panel can be open at a time. Use collapsible to allow closing all panels."
      >
        <div className="w-full max-w-lg">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>What happens to our data?</AccordionTrigger>
              <AccordionContent>
                Your data is never used to train any AI model — ours or anyone
                else&apos;s. Every organization&apos;s data is isolated at the row level (RLS).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How long before Lyse is actually useful?</AccordionTrigger>
              <AccordionContent>
                Most teams see value within the first week. Lyse reads your existing
                conversations and starts suggesting tasks immediately.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I self-host Lyse?</AccordionTrigger>
              <AccordionContent>
                Not yet. We&apos;re exploring self-hosted options for enterprise customers.
                Contact us for details.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="multiple"
        title="Multiple"
        description="Multiple panels can be open simultaneously. Useful for settings or filter sections."
      >
        <div className="w-full max-w-lg">
          <Accordion type="multiple" defaultValue={["notifications"]}>
            <AccordionItem value="notifications">
              <AccordionTrigger>Notifications</AccordionTrigger>
              <AccordionContent>
                Configure your notification preferences for email, push, and in-app alerts.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="privacy">
              <AccordionTrigger>Privacy</AccordionTrigger>
              <AccordionContent>
                Manage your privacy settings, data sharing preferences, and account visibility.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="integrations">
              <AccordionTrigger>Integrations</AccordionTrigger>
              <AccordionContent>
                Connect Lyse to Slack, Linear, Figma, and other tools your team uses.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="disabled"
        title="Disabled"
        description="Individual items can be disabled to prevent interaction."
      >
        <div className="w-full max-w-lg">
          <Accordion type="single" collapsible>
            <AccordionItem value="active">
              <AccordionTrigger>Active section</AccordionTrigger>
              <AccordionContent>
                This section can be toggled normally.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="disabled" disabled>
              <AccordionTrigger>Disabled section</AccordionTrigger>
              <AccordionContent>
                This content is not reachable.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="default-open"
        title="Default open"
        description="Use defaultValue to pre-expand items on first render."
      >
        <div className="w-full max-w-lg">
          <Accordion type="single" collapsible defaultValue="open">
            <AccordionItem value="open">
              <AccordionTrigger>This starts expanded</AccordionTrigger>
              <AccordionContent>
                The panel is open by default via defaultValue.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="closed">
              <AccordionTrigger>This starts collapsed</AccordionTrigger>
              <AccordionContent>
                Click to expand this section.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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

export default function AccordionPage() {
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
            Accordion
          </h1>
          <p
            className="text-content-highlight"
            style={{ color: "var(--text-base-bolder)" }}
          >
            Stacked expandable panels for progressive content disclosure.
            Card-style items with plus/close icon toggle and smooth height animation.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add https://ui.getlyse.com/r/accordion.json")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <Copy /> Copy install command
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a
                href="https://v0.app/chat?q=add%20component%20from%20https%3A%2F%2Fui.getlyse.com%2Fr%2Faccordion.json"
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
                <div className="w-full max-w-lg">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="demo-1">
                      <AccordionTrigger>What is Lyse?</AccordionTrigger>
                      <AccordionContent>
                        An AI agent that eliminates the cognitive burden of organizing work for tech teams.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
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
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                <h2
                  className="text-heading-small font-accent"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  Accordion
                </h2>
                <PropsTable propDefs={accordionPropDefs} />
              </div>
              <div className="flex flex-col gap-4">
                <h2
                  className="text-heading-small font-accent"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  AccordionItem
                </h2>
                <PropsTable propDefs={itemPropDefs} />
              </div>
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
