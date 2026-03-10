"use client"

import { useState } from "react"
import { Checkbox } from "@/registry/new-york/ui/checkbox/checkbox"
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
  { id: "indeterminate", label: "Indeterminate" },
  { id: "disabled", label: "Disabled" },
  { id: "indicator-only", label: "Indicator Only" },
]

const dosDontsItems: DosDontsItem[] = [
  {
    do: {
      preview: <Checkbox label="Accept terms and conditions" />,
      description:
        "Use the label prop for text — it wires htmlFor for accessibility.",
    },
    dont: {
      preview: (
        <div className="flex items-center gap-[var(--layout-gap-sm)]">
          <Checkbox />
          <span>Accept terms</span>
        </div>
      ),
      description:
        "Don't use a separate <label> without htmlFor association.",
    },
  },
  {
    do: {
      preview: <Checkbox checked="indeterminate" label="Select all" />,
      description:
        'Use checked="indeterminate" for parent checkboxes in select-all patterns.',
    },
    dont: {
      preview: <Checkbox defaultChecked label="Select all" />,
      description:
        "Don't use checked={true} with a custom half-filled icon for partial selection.",
    },
  },
  {
    do: {
      preview: <Checkbox size="md" label="Receive notifications" />,
      description:
        'Use size="md" when the checkbox sits alongside text-content-body text.',
    },
    dont: {
      preview: (
        <div className="flex items-center gap-[var(--layout-gap-sm)]">
          <Checkbox size="sm" />
          <span className="text-content-body">Large body text</span>
        </div>
      ),
      description:
        'Don\'t mix size="sm" checkbox with large body text — sizes should match.',
    },
  },
  {
    do: {
      preview: <Checkbox label="Unavailable option" disabled />,
      description:
        "Use disabled for unavailable options to preserve discoverability.",
    },
    dont: {
      preview: (
        <div className="flex flex-col gap-[var(--layout-gap-md)]">
          <Checkbox label="Available option" defaultChecked />
          {/* Empty space where the hidden option would be */}
        </div>
      ),
      description:
        "Don't hide the checkbox entirely — show it disabled so users know the option exists.",
    },
  },
]

const propDefs: PropDef[] = [
  {
    name: "checked",
    type: ["boolean", '"indeterminate"'],
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
    type: ['(checked: boolean | "indeterminate") => void'],
    description: "Callback when the checked state changes.",
  },
  {
    name: "size",
    type: ["sm", "md"],
    default: "sm",
    description:
      "Size of the checkbox indicator and associated text.",
  },
  {
    name: "label",
    type: ["string"],
    description:
      "Label text. When omitted, only the indicator renders — provide aria-label for accessibility.",
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
  const [parentChecked, setParentChecked] = useState<
    boolean | "indeterminate"
  >("indeterminate")
  const [items, setItems] = useState([true, false, false])

  const handleParentChange = (checked: boolean | "indeterminate") => {
    const next = !!checked
    setParentChecked(next)
    setItems([next, next, next])
  }

  const handleItemChange = (index: number, checked: boolean | "indeterminate") => {
    const next = [...items]
    next[index] = !!checked
    setItems(next)
    const all = next.every(Boolean)
    const none = next.every((v) => !v)
    setParentChecked(all ? true : none ? false : "indeterminate")
  }

  return (
    <div className="flex flex-col gap-12">
      <ComponentPreview
        id="default"
        title="Default"
        description="Basic checkbox with a label. Click label or indicator to toggle."
      >
        <div className="flex flex-col gap-[var(--layout-gap-md)]">
          <Checkbox label="Accept terms and conditions" />
          <Checkbox label="Subscribe to newsletter" defaultChecked />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="sizes"
        title="Sizes"
        description="Two sizes: sm (default) and md. Adjusts indicator, label, and icon."
      >
        <div className="flex gap-16">
          <div className="flex flex-col gap-[var(--layout-gap-md)]">
            <Checkbox size="sm" label="Small one" />
            <Checkbox size="sm" label="Small two" defaultChecked />
          </div>
          <div className="flex flex-col gap-[var(--layout-gap-md)]">
            <Checkbox size="md" label="Medium one" />
            <Checkbox size="md" label="Medium two" defaultChecked />
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="with-description"
        title="With Description"
        description="Displays supporting text below the label."
      >
        <div className="flex flex-col gap-[var(--layout-gap-md)]">
          <Checkbox
            label="Email notifications"
            description="Receive updates about your account activity."
            defaultChecked
          />
          <Checkbox
            label="Marketing emails"
            description="Get tips, product updates, and promotions."
          />
          <Checkbox
            label="Security alerts"
            description="Always be notified about unusual sign-in attempts."
            defaultChecked
            disabled
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="indeterminate"
        title="Indeterminate"
        description="Parent checkbox shows a minus icon when some children are checked."
      >
        <div className="flex flex-col gap-[var(--layout-gap-md)]">
          <Checkbox
            label="Select all"
            checked={parentChecked}
            onCheckedChange={handleParentChange}
          />
          <div className="flex flex-col gap-[var(--layout-gap-md)] pl-6">
            <Checkbox
              label="Item one"
              checked={items[0]}
              onCheckedChange={(v) => handleItemChange(0, v)}
            />
            <Checkbox
              label="Item two"
              checked={items[1]}
              onCheckedChange={(v) => handleItemChange(1, v)}
            />
            <Checkbox
              label="Item three"
              checked={items[2]}
              onCheckedChange={(v) => handleItemChange(2, v)}
            />
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="disabled"
        title="Disabled"
        description="Prevents interaction. Works with all states."
      >
        <div className="flex gap-16">
          <div className="flex flex-col gap-[var(--layout-gap-md)]">
            <Checkbox label="Disabled unchecked" disabled />
            <Checkbox label="Disabled checked" disabled defaultChecked />
          </div>
          <div className="flex flex-col gap-[var(--layout-gap-md)]">
            <Checkbox
              label="Disabled indeterminate"
              disabled
              checked="indeterminate"
            />
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="indicator-only"
        title="Indicator Only"
        description="Renders only the indicator. Provide aria-label for accessibility."
      >
        <div className="flex items-center gap-[var(--layout-gap-lg)]">
          <Checkbox aria-label="Option A" />
          <Checkbox aria-label="Option B" defaultChecked />
          <Checkbox aria-label="Option C" checked="indeterminate" />
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

const importCode = `import { Checkbox } from '@/components/ui/checkbox'

export default function Example() {
  return (
    <>
      <Checkbox label="Option one" defaultChecked />
      <Checkbox label="Option two" />
    </>
  )
}`

type Tab = "overview" | "props" | "documentation"

export default function CheckboxPage() {
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
            Checkbox
          </h1>
          <p
            className="text-content-highlight"
            style={{ color: "var(--text-base-bolder)" }}
          >
            The Checkbox component is a form control that allows users to
            toggle between checked, unchecked, and indeterminate states. It
            provides a clear and accessible way to capture binary or
            multi-select choices in forms.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add https://ui.getlyse.com/r/checkbox.json")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <><Copy /> Copy install command</>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a
                href="https://v0.app/chat?q=add%20component%20from%20https%3A%2F%2Fui.getlyse.com%2Fr%2Fcheckbox.json"
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
                <div className="flex flex-col gap-[var(--layout-gap-md)]">
                  <Checkbox label="Option one" defaultChecked />
                  <Checkbox label="Option two" />
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
                Checkbox
              </h2>
              <PropsTable
                propDefs={propDefs}
                extendsType="Radix Checkbox.Root"
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
