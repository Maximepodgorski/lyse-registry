"use client"

import { useState } from "react"
import { Toggle } from "@/registry/new-york/ui/toggle/toggle"
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
  { id: "sizes", label: "Sizes" },
  { id: "with-description", label: "With Description" },
  { id: "disabled", label: "Disabled" },
  { id: "toggle-only", label: "Toggle Only" },
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
            A basic toggle with a label. Click the label or the switch to
            toggle.
          </>
        }
      >
        <div className="flex flex-col gap-[var(--layout-gap-lg)]">
          <Toggle label="Enable notifications" />
          <Toggle label="Dark mode" defaultChecked />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="sizes"
        title="Sizes"
        description={
          <>
            Use the <InlineCode>size</InlineCode> prop with{" "}
            <InlineCode>sm</InlineCode> (default) or{" "}
            <InlineCode>md</InlineCode>. The size adjusts the switch track,
            thumb, and label font size.
          </>
        }
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
        description={
          <>
            Add a <InlineCode>description</InlineCode> prop to display
            supporting text below the label.
          </>
        }
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
        description={
          <>
            Use <InlineCode>disabled</InlineCode> to prevent interaction.
            Works in both unchecked and checked states.
          </>
        }
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
        description={
          <>
            Omit the <InlineCode>label</InlineCode> prop to render only
            the switch control. Always provide{" "}
            <InlineCode>aria-label</InlineCode> for accessibility when
            using this pattern.
          </>
        }
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

/* ----------------------------------------------------------------
 * Page
 * ---------------------------------------------------------------- */

type Tab = "overview" | "props"

export default function TogglePage() {
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
            Toggle
          </h1>
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            A switch control that lets users turn a binary option on or off.
            Commonly used in settings, preferences, and interactive forms.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add @lyse/toggle")
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
                <div className="flex flex-col gap-[var(--layout-gap-lg)]">
                  <Toggle label="Enable notifications" defaultChecked />
                  <Toggle label="Dark mode" />
                </div>
              }
              code={
                <>
                  <span style={{ color: "#c084fc" }}>import</span>
                  {" { "}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    Toggle
                  </span>
                  {" } "}
                  <span style={{ color: "#c084fc" }}>from</span>{" "}
                  <span
                    style={{ color: "var(--root-color-warning-400)" }}
                  >{`'@/components/ui/toggle'`}</span>
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
                  {"    <>\n"}
                  {"      <"}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    Toggle
                  </span>
                  {' label="Enable notifications" defaultChecked />\n'}
                  {"      <"}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    Toggle
                  </span>
                  {' label="Dark mode" />\n'}
                  {"    </>\n"}
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
                Toggle
              </h2>
              <PropsTable
                propDefs={propDefs}
                extendsType="Radix Switch.Root"
              />
            </div>
          )}
        </div>
      </main>

      <TableOfContents sections={tab === "overview" ? overviewSections : []} />
    </>
  )
}
