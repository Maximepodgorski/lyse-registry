"use client"

import { useState } from "react"
import { toast } from "@/registry/new-york/ui/toast/toast"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from "@/registry/new-york/ui/popover/popover"
import { Button } from "@/registry/new-york/ui/button/button"
import { Input } from "@/registry/new-york/ui/input/input"
import { Checkbox } from "@/registry/new-york/ui/checkbox/checkbox"
import { Toggle } from "@/registry/new-york/ui/toggle/toggle"
import { Avatar } from "@/registry/new-york/ui/avatar/avatar"
import {
  Copy,
  ExternalLink,
  Filter,
  X,
  Settings,
} from "lucide-react"
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
  { id: "placement", label: "Placement" },
  { id: "with-close-button", label: "With Close Button" },
  { id: "controlled", label: "Controlled" },
  { id: "filter-panel", label: "Filter Panel" },
  { id: "user-card", label: "User Card" },
  { id: "form-content", label: "Form Content" },
]

const dosDontsItems: DosDontsItem[] = [
  {
    do: {
      preview: (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary" size="sm">
              <Filter />
              Filter
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" aria-label="Filter options">
            <p className="text-content-caption font-accent mb-[var(--layout-gap-sm)] [color:var(--text-base-moderate)]">
              Status
            </p>
            <div className="flex flex-col gap-[var(--layout-gap-sm)]">
              <Checkbox label="Active" defaultChecked />
              <Checkbox label="Archived" />
            </div>
          </PopoverContent>
        </Popover>
      ),
      description:
        "Use Popover for interactive floating content like filter panels or forms.",
    },
    dont: {
      preview: (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary" size="sm">Info</Button>
          </PopoverTrigger>
          <PopoverContent aria-label="Hint">
            <p className="text-content-note">This is just a simple text hint.</p>
          </PopoverContent>
        </Popover>
      ),
      description:
        "Don't use Popover for simple text hints — use Tooltip instead.",
    },
  },
  {
    do: {
      preview: (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary" size="sm">
              <Settings />
              Settings
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56" aria-label="Settings">
            <p className="text-content-note font-accent mb-[var(--layout-gap-sm)]">Settings</p>
            <p className="text-content-caption [color:var(--text-base-moderate)]">One focused task per popover.</p>
          </PopoverContent>
        </Popover>
      ),
      description:
        "Keep popover content focused — one task per popover.",
    },
    dont: {
      preview: (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary" size="sm">Everything</Button>
          </PopoverTrigger>
          <PopoverContent className="w-72" aria-label="Everything panel">
            <p className="text-content-note font-accent mb-[var(--layout-gap-sm)]">Profile</p>
            <p className="text-content-caption [color:var(--text-base-moderate)] mb-[var(--layout-gap-xs)]">Edit your profile settings here.</p>
            <p className="text-content-note font-accent mb-[var(--layout-gap-sm)]">Notifications</p>
            <p className="text-content-caption [color:var(--text-base-moderate)]">Manage your notification preferences.</p>
          </PopoverContent>
        </Popover>
      ),
      description:
        "Don't cram multiple unrelated sections — use a Modal instead.",
    },
  },
  {
    do: {
      preview: (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary" size="sm">Open</Button>
          </PopoverTrigger>
          <PopoverContent className="w-56" aria-label="Actions">
            <p className="text-content-note">Constrained to a reasonable width.</p>
          </PopoverContent>
        </Popover>
      ),
      description:
        "Constrain width with className — content grows to fit by default.",
    },
    dont: {
      preview: (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary" size="sm">Open</Button>
          </PopoverTrigger>
          <PopoverContent aria-label="Wide content">
            <p className="text-content-note">This popover has no width constraint and will expand with its content making it hard to read.</p>
          </PopoverContent>
        </Popover>
      ),
      description:
        "Don't let content stretch the popover unbounded.",
    },
  },
]

const propDefs: PropDef[] = [
  {
    name: "side",
    type: ["top", "right", "bottom", "left"],
    default: "bottom",
    description:
      "Preferred side relative to the trigger. Auto-flips on collision.",
  },
  {
    name: "align",
    type: ["start", "center", "end"],
    default: "center",
    description: "Alignment along the side axis.",
  },
  {
    name: "sideOffset",
    type: ["number"],
    default: "6",
    description: "Distance in px between the trigger and the panel.",
  },
  {
    name: "alignOffset",
    type: ["number"],
    default: "0",
    description: "Offset in px along the align axis.",
  },
  {
    name: "className",
    type: ["string"],
    description: "Additional class names merged via cn().",
  },
  {
    name: "children",
    type: ["ReactNode"],
    required: true,
    description: "Popover panel content.",
  },
]

const importCode = `import {
  Popover, PopoverTrigger,
  PopoverContent, PopoverClose
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

<Popover>
  <PopoverTrigger asChild>
    <Button variant="secondary">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent className="w-72" aria-label="Notifications">
    <div className="flex flex-col gap-[var(--layout-gap-md)]">
      <p className="text-content-note font-accent">
        Notifications
      </p>
      {/* interactive content */}
    </div>
  </PopoverContent>
</Popover>`

/* ----------------------------------------------------------------
 * Tabs
 * ---------------------------------------------------------------- */

function OverviewTab() {
  const [controlled, setControlled] = useState(false)

  return (
    <div className="flex flex-col gap-12">
      <ComponentPreview
        id="default"
        title="Default"
        description="Basic popover with structured content anchored to a trigger."
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary" size="sm">
              Open popover
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" aria-label="Notifications">
            <div className="flex flex-col gap-[var(--layout-gap-lg)]">
              <div className="flex flex-col gap-[var(--layout-gap-xs)]">
                <p className="text-content-note font-accent">Notifications</p>
                <p className="text-content-caption [color:var(--text-base-moderate)]">
                  Choose what you want to be notified about.
                </p>
              </div>
              <div className="flex flex-col gap-[var(--layout-gap-md)]">
                <Toggle label="Push notifications" defaultChecked />
                <Toggle label="Email digests" defaultChecked />
                <Toggle label="Slack alerts" />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </ComponentPreview>

      <ComponentPreview
        id="placement"
        title="Placement"
        description="Use side and align props to control position relative to the trigger."
      >
        <div className="flex flex-wrap items-center gap-3">
          {(["bottom", "top", "left", "right"] as const).map((side) => (
            <Popover key={side}>
              <PopoverTrigger asChild>
                <Button variant="secondary" size="sm">
                  {side}
                </Button>
              </PopoverTrigger>
              <PopoverContent side={side} className="w-40" aria-label={`${side} placement`}>
                <p className="text-content-caption [color:var(--text-base-moderate)]">
                  Opens on the {side}
                </p>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="with-close-button"
        title="With Close Button"
        description="Use PopoverClose to add an explicit dismiss button."
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary" size="sm">
              <Settings />
              Settings
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72" aria-label="Preferences">
            <div className="flex flex-col gap-[var(--layout-gap-md)]">
              <div className="flex items-start justify-between gap-[var(--layout-gap-md)]">
                <div className="flex flex-col gap-[var(--layout-gap-xs)]">
                  <p className="text-content-note font-accent">Preferences</p>
                  <p className="text-content-caption [color:var(--text-base-moderate)]">
                    Configure your workspace settings.
                  </p>
                </div>
                <PopoverClose asChild>
                  <Button isIconOnly variant="terciary" size="xs" className="shrink-0">
                    <X />
                  </Button>
                </PopoverClose>
              </div>
              <div className="flex flex-col gap-[var(--layout-gap-sm)]">
                <Checkbox label="Show notifications" defaultChecked />
                <Checkbox label="Enable sounds" />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </ComponentPreview>

      <ComponentPreview
        id="controlled"
        title="Controlled"
        description="Use open and onOpenChange for external state control."
      >
        <Popover open={controlled} onOpenChange={setControlled}>
          <PopoverTrigger asChild>
            <Button variant="secondary" size="sm">
              {controlled ? "Close" : "Open"} popover
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72" aria-label="Controlled popover">
            <div className="flex flex-col gap-[var(--layout-gap-md)]">
              <div className="flex flex-col gap-[var(--layout-gap-xs)]">
                <p className="text-content-note font-accent">Controlled state</p>
                <p className="text-content-caption [color:var(--text-base-moderate)]">
                  This popover is managed via external state.
                </p>
              </div>
              <Button size="sm" onClick={() => setControlled(false)}>
                Done
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </ComponentPreview>

      <ComponentPreview
        id="filter-panel"
        title="Filter Panel"
        description="Interactive filter content inside a popover."
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary" size="sm">
              <Filter />
              Filter
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56" align="start" aria-label="Filter by status">
            <div className="flex flex-col gap-[var(--layout-gap-md)]">
              <p className="text-content-caption font-accent [color:var(--text-base-moderate)]">
                Status
              </p>
              <div className="flex flex-col gap-[var(--layout-gap-sm)]">
                <Checkbox label="Active" defaultChecked />
                <Checkbox label="Archived" />
                <Checkbox label="Draft" />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </ComponentPreview>

      <ComponentPreview
        id="user-card"
        title="User Card"
        description="Rich content popover showing user details."
      >
        <Popover>
          <PopoverTrigger asChild>
            <button className="cursor-pointer">
              <Avatar initials="MP" size="sm" />
            </button>
          </PopoverTrigger>
          <PopoverContent side="bottom" align="start" className="w-64" aria-label="User details">
            <div className="flex items-center gap-[var(--layout-gap-md)]">
              <Avatar initials="MP" size="md" />
              <div className="flex flex-col gap-[var(--layout-gap-xs)]">
                <p className="text-content-note font-accent">Maxime Podgorski</p>
                <p className="text-content-caption [color:var(--text-base-moderate)]">maxime@getlyse.com</p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </ComponentPreview>

      <ComponentPreview
        id="form-content"
        title="Form Content"
        description="Popover with a grid of labeled inputs for inline editing."
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary" size="sm">
              Dimensions
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" aria-label="Dimensions">
            <div className="flex flex-col gap-[var(--layout-gap-md)]">
              <div className="flex flex-col gap-[var(--layout-gap-xs)]">
                <p className="text-content-note font-accent">Dimensions</p>
                <p className="text-content-caption [color:var(--text-base-moderate)]">
                  Set the dimensions for the layer.
                </p>
              </div>
              <div className="grid grid-cols-3 items-center gap-[var(--layout-gap-sm)]">
                <label className="text-content-caption" htmlFor="dim-w">Width</label>
                <Input id="dim-w" defaultValue="100%" size="sm" className="col-span-2" />
                <label className="text-content-caption" htmlFor="dim-mw">Max. width</label>
                <Input id="dim-mw" defaultValue="300px" size="sm" className="col-span-2" />
                <label className="text-content-caption" htmlFor="dim-h">Height</label>
                <Input id="dim-h" defaultValue="25px" size="sm" className="col-span-2" />
                <label className="text-content-caption" htmlFor="dim-mh">Max. height</label>
                <Input id="dim-mh" defaultValue="none" size="sm" className="col-span-2" />
              </div>
            </div>
          </PopoverContent>
        </Popover>
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

export default function PopoverPage() {
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
            Popover
          </h1>
          <p
            className="text-content-highlight"
            style={{ color: "var(--text-base-bolder)" }}
          >
            A floating panel anchored to a trigger element, used for rich
            non-modal content like filter panels, date pickers, and contextual
            forms. Built on Radix Popover with portal rendering and collision
            detection.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add https://ui.getlyse.com/r/popover.json")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <><Copy className="size-4" /> Copy install command</>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a
                href="https://v0.app/chat?q=add%20component%20from%20https%3A%2F%2Fui.getlyse.com%2Fr%2Fpopover.json"
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
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="secondary" size="sm">
                      Open popover
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" aria-label="Notifications">
                    <div className="flex flex-col gap-[var(--layout-gap-lg)]">
                      <div className="flex flex-col gap-[var(--layout-gap-xs)]">
                        <p className="text-content-note font-accent">Notifications</p>
                        <p className="text-content-caption [color:var(--text-base-moderate)]">
                          Choose what you want to be notified about.
                        </p>
                      </div>
                      <div className="flex flex-col gap-[var(--layout-gap-md)]">
                        <Toggle label="Push notifications" defaultChecked />
                        <Toggle label="Email digests" />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
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
              extendsType="PopoverPrimitive.ContentProps"
            />
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
