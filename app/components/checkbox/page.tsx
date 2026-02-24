"use client"

import { useState } from "react"
import { Checkbox } from "@/registry/new-york/ui/checkbox/checkbox"
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
  { id: "indeterminate", label: "Indeterminate" },
  { id: "disabled", label: "Disabled" },
  { id: "indicator-only", label: "Indicator Only" },
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
        description={
          <>
            A basic checkbox with a label. Click the label or the
            indicator to toggle.
          </>
        }
      >
        <div className="flex flex-col gap-[var(--layout-gap-md)]">
          <Checkbox label="Accept terms and conditions" />
          <Checkbox label="Subscribe to newsletter" defaultChecked />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="sizes"
        title="Sizes"
        description={
          <>
            Use the <InlineCode>size</InlineCode> prop with{" "}
            <InlineCode>sm</InlineCode> (default) or{" "}
            <InlineCode>md</InlineCode>. The size adjusts the indicator,
            label font size, and icon size.
          </>
        }
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
        description={
          <>
            Add a <InlineCode>description</InlineCode> prop to display
            supporting text below the label.
          </>
        }
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
        description={
          <>
            Set <InlineCode>checked=&quot;indeterminate&quot;</InlineCode>{" "}
            for a parent checkbox that controls a group. The parent
            shows a minus icon when some children are checked.
          </>
        }
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
        description={
          <>
            Use <InlineCode>disabled</InlineCode> to prevent interaction.
            Works with all states: unchecked, checked, and indeterminate.
          </>
        }
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
        description={
          <>
            Omit the <InlineCode>label</InlineCode> prop to render only
            the indicator. Always provide{" "}
            <InlineCode>aria-label</InlineCode> for accessibility when
            using this pattern.
          </>
        }
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

/* ----------------------------------------------------------------
 * Page
 * ---------------------------------------------------------------- */

type Tab = "overview" | "props"

export default function CheckboxPage() {
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
            Checkbox
          </h1>
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            A form control for toggling between checked, unchecked, and
            indeterminate states. Supports labels, descriptions, two sizes,
            and full keyboard and screen reader accessibility via Radix.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add @lyse/checkbox")
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
                <div className="flex flex-col gap-[var(--layout-gap-md)]">
                  <Checkbox label="Option one" defaultChecked />
                  <Checkbox label="Option two" />
                </div>
              }
              code={
                <>
                  <span style={{ color: "#c084fc" }}>import</span>
                  {" { "}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    Checkbox
                  </span>
                  {" } "}
                  <span style={{ color: "#c084fc" }}>from</span>{" "}
                  <span
                    style={{ color: "var(--root-color-warning-400)" }}
                  >{`'@/components/ui/checkbox'`}</span>
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
                    Checkbox
                  </span>
                  {' label="Option one" defaultChecked />\n'}
                  {"      <"}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    Checkbox
                  </span>
                  {' label="Option two" />\n'}
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
                Checkbox
              </h2>
              <PropsTable
                propDefs={propDefs}
                extendsType="Radix Checkbox.Root"
              />
            </div>
          )}
        </div>
      </main>

      <TableOfContents sections={tab === "overview" ? overviewSections : []} />
    </>
  )
}
