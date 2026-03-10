"use client"

import { useState } from "react"
import { Toggle } from "@/registry/new-york/ui/toggle/toggle"
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
  { id: "sizes", label: "Sizes" },
  { id: "with-description", label: "With Description" },
  { id: "disabled", label: "Disabled" },
  { id: "toggle-only", label: "Toggle Only" },
]

const dosDontsItems: DosDontsItem[] = [
  {
    do: {
      preview: <Toggle label="Enable notifications" />,
      description:
        "Use the label prop for text — it wires htmlFor for accessibility.",
    },
    dont: {
      preview: (
        <div className="flex items-center gap-[var(--layout-gap-sm)]">
          <Toggle />
          <span>Enable notifications</span>
        </div>
      ),
      description:
        "Don't use a separate <label> without proper association.",
    },
  },
  {
    do: {
      preview: <Toggle label="Dark mode" defaultChecked />,
      description:
        "Use Toggle for settings that take effect immediately.",
    },
    dont: {
      preview: <Toggle label="Accept terms" />,
      description:
        "Don't use Toggle for selections that require a submit action — use Checkbox instead.",
    },
  },
  {
    do: {
      preview: <Toggle size="md" label="Receive updates" />,
      description:
        'Use size="md" when the toggle sits alongside text-content-body text.',
    },
    dont: {
      preview: (
        <div className="flex items-center gap-[var(--layout-gap-sm)]">
          <Toggle size="sm" />
          <span className="text-content-body">Large body text</span>
        </div>
      ),
      description:
        'Don\'t mix size="sm" toggle with large body text.',
    },
  },
  {
    do: {
      preview: <Toggle label="Unavailable feature" disabled />,
      description:
        "Use disabled for unavailable features to preserve discoverability.",
    },
    dont: {
      preview: (
        <div className="flex flex-col gap-[var(--layout-gap-lg)]">
          <Toggle label="Available feature" defaultChecked />
          {/* Empty space where the hidden toggle would be */}
        </div>
      ),
      description:
        "Don't hide the toggle entirely — show it disabled so users know the feature exists.",
    },
  },
]

const propDefs: PropDef[] = [
  {
    name: "checked",
    type: ["boolean"],
    default: "false",
    description: "Controlled checked state.",
  },
  {
    name: "defaultChecked",
    type: ["boolean"],
    description: "Initial checked state when uncontrolled.",
  },
  {
    name: "onCheckedChange",
    type: ["(checked: boolean) => void"],
    description: "Callback when the toggle state changes.",
  },
  {
    name: "size",
    type: ["sm", "md"],
    default: "sm",
    description: "Size of the toggle and associated text.",
  },
  {
    name: "label",
    type: ["string"],
    description:
      "Label text. When omitted, only the switch renders — provide aria-label for accessibility.",
  },
  {
    name: "description",
    type: ["string"],
    description: "Description text displayed below the label.",
  },
  {
    name: "disabled",
    type: ["boolean"],
    default: "false",
    description: "Disable interaction.",
  },
  {
    name: "required",
    type: ["boolean"],
    default: "false",
    description: "Mark as required for form validation.",
  },
  {
    name: "name",
    type: ["string"],
    description: "Name attribute for form submission.",
  },
  {
    name: "value",
    type: ["string"],
    default: '"on"',
    description: "Value submitted with the form when checked.",
  },
  {
    name: "className",
    type: ["string"],
    description: "Additional class names merged via cn().",
  },
]

const importCode = `import { Toggle } from '@/components/ui/toggle'

export default function Example() {
  return (
    <>
      <Toggle label="Enable notifications" defaultChecked />
      <Toggle label="Dark mode" />
    </>
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
        description="Basic toggle with a label. Click label or switch to toggle."
      >
        <div className="flex flex-col gap-[var(--layout-gap-lg)]">
          <Toggle label="Enable notifications" />
          <Toggle label="Dark mode" defaultChecked />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="sizes"
        title="Sizes"
        description="Two sizes: sm (default) and md. Adjusts track, thumb, and label."
      >
        <div className="flex gap-16">
          <div className="flex flex-col gap-[var(--layout-gap-lg)]">
            <Toggle size="sm" label="Small off" />
            <Toggle size="sm" label="Small on" defaultChecked />
          </div>
          <div className="flex flex-col gap-[var(--layout-gap-lg)]">
            <Toggle size="md" label="Medium off" />
            <Toggle size="md" label="Medium on" defaultChecked />
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="with-description"
        title="With Description"
        description="Displays supporting text below the label."
      >
        <div className="flex flex-col gap-[var(--layout-gap-lg)]">
          <Toggle
            label="Email notifications"
            description="Receive updates about your account activity."
            defaultChecked
          />
          <Toggle
            label="Push notifications"
            description="Get notified on your device."
          />
          <Toggle
            label="Security alerts"
            description="Always be notified about unusual sign-in attempts."
            defaultChecked
            disabled
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="disabled"
        title="Disabled"
        description="Prevents interaction. Works in both states."
      >
        <div className="flex gap-16">
          <div className="flex flex-col gap-[var(--layout-gap-lg)]">
            <Toggle label="Disabled off" disabled />
            <Toggle label="Disabled on" disabled defaultChecked />
          </div>
          <div className="flex flex-col gap-[var(--layout-gap-lg)]">
            <Toggle
              size="md"
              label="Disabled off"
              description="Medium size, disabled."
              disabled
            />
            <Toggle
              size="md"
              label="Disabled on"
              description="Medium size, disabled."
              disabled
              defaultChecked
            />
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="toggle-only"
        title="Toggle Only"
        description="Renders only the switch control. Provide aria-label for accessibility."
      >
        <div className="flex items-center gap-[var(--layout-gap-xl)]">
          <Toggle aria-label="Feature A" />
          <Toggle aria-label="Feature B" defaultChecked />
          <Toggle aria-label="Feature C" size="md" />
          <Toggle aria-label="Feature D" size="md" defaultChecked />
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

export default function TogglePage() {
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
            Toggle
          </h1>
          <p
            className="text-content-highlight"
            style={{ color: "var(--text-base-bolder)" }}
          >
            The Toggle component is a switch control for turning a binary
            option on or off. It provides an intuitive way to manage settings
            and preferences with immediate visual feedback.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add https://ui.getlyse.com/r/toggle.json")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <><Copy /> Copy install command</>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a
                href="https://v0.app/chat?q=add%20component%20from%20https%3A%2F%2Fui.getlyse.com%2Fr%2Ftoggle.json"
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
                <div className="flex flex-col gap-[var(--layout-gap-lg)]">
                  <Toggle label="Enable notifications" defaultChecked />
                  <Toggle label="Dark mode" />
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
            <div className="flex flex-col gap-4">
              <h2
                className="text-heading-small font-accent"
                style={{ color: "var(--text-base-strong)" }}
              >
                Toggle
              </h2>
              <PropsTable
                propDefs={propDefs}
                extendsType="Radix Switch.Root"
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
