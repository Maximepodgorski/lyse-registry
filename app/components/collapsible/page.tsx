"use client"

import { useState } from "react"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/registry/new-york/ui/collapsible/collapsible"
import { Card } from "@/registry/new-york/ui/card/card"
import { Button } from "@/registry/new-york/ui/button/button"
import { toast } from "@/registry/new-york/ui/toast/toast"
import { ChevronDown, Copy, ExternalLink } from "lucide-react"
import { SiGitlab, SiGithub, SiFigma } from "@icons-pack/react-simple-icons"
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
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible'

export default function Disclosure() {
  return (
    <Collapsible>
      <CollapsibleTrigger>
        Show more
      </CollapsibleTrigger>
      <CollapsibleContent>
        Content revealed when open.
      </CollapsibleContent>
    </Collapsible>
  )
}`

const overviewSections: TocSection[] = [
  { id: "basic", label: "Basic" },
  { id: "with-card", label: "With Card" },
  { id: "controlled", label: "Controlled" },
  { id: "disabled", label: "Disabled" },
]

const dosDontsItems: DosDontsItem[] = [
  {
    do: {
      preview: (
        <Collapsible className="w-full">
          <CollapsibleTrigger className="flex items-center gap-[var(--layout-gap-sm)] text-content-note font-accent [color:var(--text-base-strong)]">
            About integration
            <ChevronDown className="size-4 transition-transform duration-200 [.collapsible-trigger[data-panel-open]_&]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <p className="pt-[var(--layout-padding-md)] text-content-note [color:var(--text-base-bolder)]">
              Compose your own indicator inside the trigger. Rotate it via
              the `data-panel-open` attribute.
            </p>
          </CollapsibleContent>
        </Collapsible>
      ),
      description:
        "Compose your own indicator (chevron, plus, custom icon) inside the trigger.",
    },
    dont: {
      preview: (
        <Collapsible className="w-full">
          <CollapsibleTrigger className="text-content-note font-accent [color:var(--text-base-strong)]">
            Open
          </CollapsibleTrigger>
          <CollapsibleContent>
            <p className="pt-[var(--layout-padding-md)] text-content-note [color:var(--text-base-bolder)]">
              Without an indicator, users may not realize the trigger is interactive.
            </p>
          </CollapsibleContent>
        </Collapsible>
      ),
      description:
        "Don't ship a trigger with no visual affordance — users won't know it's expandable.",
    },
  },
  {
    do: {
      preview: (
        <Card variant="outline" className="w-full !p-0 !gap-0 overflow-hidden">
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-[var(--layout-padding-xl)] text-content-note font-accent [color:var(--text-base-strong)]">
              <span className="flex items-center gap-[var(--layout-gap-md)]">
                <span className="flex items-center justify-center size-7 rounded-[var(--layout-radius-sm)] [background-color:var(--background-neutral-lighter-default)]">
                  <SiGitlab size={18} color="default" />
                </span>
                Gitlab
              </span>
              <span className="flex items-center gap-[var(--layout-gap-sm)]">
                About integration
                <ChevronDown className="size-4 transition-transform duration-200 [.collapsible-trigger[data-panel-open]_&]:rotate-180" />
              </span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div
                style={{
                  borderTop:
                    "var(--layout-border-thin) solid var(--border-default)",
                }}
                className="p-[var(--layout-padding-xl)] flex flex-col gap-[var(--layout-gap-md)]"
              >
                <span className="text-content-note font-accent [color:var(--text-base-strong)]">
                  Overview
                </span>
                <p className="text-content-note [color:var(--text-base-bolder)]">
                  The GitLab integration keeps design-generated issues in sync
                  with your development workflow.
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      ),
      description:
        "Wrap Collapsible in a Card to supply visual chrome (background, border, padding).",
    },
    dont: {
      preview: (
        <Collapsible defaultOpen className="w-full">
          <CollapsibleTrigger className="flex items-center justify-between w-full text-content-note font-accent [color:var(--text-base-strong)]">
            <span>Gitlab</span>
            <ChevronDown className="size-4 transition-transform duration-200 [.collapsible-trigger[data-panel-open]_&]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <p className="pt-[var(--layout-padding-md)] text-content-note [color:var(--text-base-bolder)]">
              The collapsible primitive ships unstyled — without a container,
              the layout looks unfinished.
            </p>
          </CollapsibleContent>
        </Collapsible>
      ),
      description:
        "Don't rely on Collapsible for visual chrome — it's a primitive, not a container.",
    },
  },
]

const collapsiblePropDefs: PropDef[] = [
  {
    name: "open",
    type: ["boolean"],
    description: "Controlled open state.",
  },
  {
    name: "defaultOpen",
    type: ["boolean"],
    default: "false",
    description: "Uncontrolled initial open state.",
  },
  {
    name: "onOpenChange",
    type: ["(open: boolean) => void"],
    description: "Called when open state changes.",
  },
  {
    name: "disabled",
    type: ["boolean"],
    default: "false",
    description: "Disables the trigger interaction. Propagates [data-disabled] to the trigger.",
  },
  {
    name: "className",
    type: ["string"],
    description: "Additional class names merged via cn().",
  },
]

const triggerPropDefs: PropDef[] = [
  {
    name: "nativeButton",
    type: ["boolean"],
    default: "true",
    description: "Render as a native <button>. Set false when slotting a non-button via render.",
  },
  {
    name: "className",
    type: ["string"],
    description: "Additional class names merged via cn().",
  },
]

const contentPropDefs: PropDef[] = [
  {
    name: "keepMounted",
    type: ["boolean"],
    default: "false",
    description: "Keep the panel mounted in the DOM when closed.",
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

function ControlledDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-col gap-[var(--layout-gap-md)] w-full max-w-md">
      <div className="flex items-center gap-[var(--layout-gap-md)]">
        <Button variant="secondary" size="sm" onClick={() => setOpen((o) => !o)}>
          {open ? "Close panel" : "Open panel"}
        </Button>
        <span className="text-content-note [color:var(--text-base-moderate)]">
          open: {String(open)}
        </span>
      </div>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger className="flex items-center gap-[var(--layout-gap-sm)] text-content-note font-accent [color:var(--text-base-strong)]">
          Toggle from inside
          <ChevronDown className="size-4 transition-transform duration-200 [.collapsible-trigger[data-panel-open]_&]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p className="pt-[var(--layout-padding-md)] text-content-note [color:var(--text-base-bolder)]">
            Both the external button and the trigger update the same state.
          </p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

function OverviewTab() {
  return (
    <div className="flex flex-col gap-12">
      <ComponentPreview
        id="basic"
        title="Basic"
        description="Single trigger toggling a content panel. Compose any chevron or label inside the trigger."
      >
        <div className="w-full max-w-md">
          <Collapsible>
            <CollapsibleTrigger className="flex items-center gap-[var(--layout-gap-sm)] text-content-note font-accent [color:var(--text-base-strong)]">
              Show more
              <ChevronDown className="size-4 transition-transform duration-200 [.collapsible-trigger[data-panel-open]_&]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <p className="pt-[var(--layout-padding-md)] text-content-note [color:var(--text-base-bolder)]">
                Collapsible is unstyled by default — only focus ring and the
                height animation are themed. This keeps it composable inside
                any container.
              </p>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="with-card"
        title="With Card"
        description="Wrap Collapsible inside a Card to recreate the integration-card pattern. Brand logos via @icons-pack/react-simple-icons."
      >
        <div className="flex flex-col gap-[var(--layout-gap-md)] w-full max-w-2xl">
          {[
            { Icon: SiGitlab, label: "Gitlab" },
            { Icon: SiGithub, label: "GitHub" },
            { Icon: SiFigma, label: "Figma" },
          ].map(({ Icon, label }, i) => (
            <Card
              key={label}
              variant="outline"
              className="!p-0 !gap-0 overflow-hidden"
            >
              <Collapsible defaultOpen={i === 0}>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-[var(--layout-padding-xl)] text-content-note font-accent [color:var(--text-base-strong)]">
                  <span className="flex items-center gap-[var(--layout-gap-md)]">
                    <span className="flex items-center justify-center size-7 rounded-[var(--layout-radius-sm)] [background-color:var(--background-neutral-lighter-default)]">
                      <Icon size={18} color="default" />
                    </span>
                    {label}
                  </span>
                  <span className="flex items-center gap-[var(--layout-gap-sm)]">
                    About integration
                    <ChevronDown className="size-4 transition-transform duration-200 [.collapsible-trigger[data-panel-open]_&]:rotate-180" />
                  </span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div
                    style={{
                      borderTop:
                        "var(--layout-border-thin) solid var(--border-default)",
                    }}
                    className="p-[var(--layout-padding-xl)] flex flex-col gap-[var(--layout-gap-md)]"
                  >
                    <span className="text-content-note font-accent [color:var(--text-base-strong)]">
                      Overview
                    </span>
                    <p className="text-content-note [color:var(--text-base-bolder)]">
                      The {label} integration keeps design-generated issues in
                      sync with your development workflow. Issues created from
                      Lyse are automatically pushed and stay updated as changes
                      occur.
                    </p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="controlled"
        title="Controlled"
        description="Drive open state from a parent component via open + onOpenChange."
      >
        <ControlledDemo />
      </ComponentPreview>

      <ComponentPreview
        id="disabled"
        title="Disabled"
        description="Setting disabled on the root blocks interaction. Base UI propagates [data-disabled] to the trigger."
      >
        <div className="w-full max-w-md">
          <Collapsible disabled>
            <CollapsibleTrigger className="flex items-center gap-[var(--layout-gap-sm)] text-content-note font-accent [color:var(--text-base-strong)]">
              Cannot open
              <ChevronDown className="size-4" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <p className="pt-[var(--layout-padding-md)] text-content-note [color:var(--text-base-bolder)]">
                Never reachable while disabled.
              </p>
            </CollapsibleContent>
          </Collapsible>
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

export default function CollapsiblePage() {
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
            Collapsible
          </h1>
          <p
            className="text-content-highlight"
            style={{ color: "var(--text-base-bolder)" }}
          >
            Simple expandable panel with smooth height animation. Unstyled
            primitive — compose your own trigger and chrome.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add https://ui.getlyse.com/r/collapsible.json")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <Copy /> Copy install command
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a
                href="https://v0.app/chat?q=add%20component%20from%20https%3A%2F%2Fui.getlyse.com%2Fr%2Fcollapsible.json"
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
                <div className="w-full max-w-md">
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center gap-[var(--layout-gap-sm)] text-content-note font-accent [color:var(--text-base-strong)]">
                      Show more
                      <ChevronDown className="size-4 transition-transform duration-200 [.collapsible-trigger[data-panel-open]_&]:rotate-180" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <p className="pt-[var(--layout-padding-md)] text-content-note [color:var(--text-base-bolder)]">
                        Content revealed when open.
                      </p>
                    </CollapsibleContent>
                  </Collapsible>
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
                  Collapsible
                </h2>
                <PropsTable propDefs={collapsiblePropDefs} />
              </div>
              <div className="flex flex-col gap-4">
                <h2
                  className="text-heading-small font-accent"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  CollapsibleTrigger
                </h2>
                <PropsTable propDefs={triggerPropDefs} />
              </div>
              <div className="flex flex-col gap-4">
                <h2
                  className="text-heading-small font-accent"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  CollapsibleContent
                </h2>
                <PropsTable propDefs={contentPropDefs} />
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
