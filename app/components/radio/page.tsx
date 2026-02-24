"use client"

import { useState } from "react"
import { RadioGroup, Radio } from "@/registry/new-york/ui/radio/radio"
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
  { id: "indicator-only", label: "Indicator Only" },
]

const radioGroupPropDefs: PropDef[] = [
  {
    name: "value",
    type: ["string"],
    description: "Controlled selected value.",
  },
  {
    name: "defaultValue",
    type: ["string"],
    description: "Initial value when uncontrolled.",
  },
  {
    name: "onValueChange",
    type: ["(value: string) => void"],
    description: "Callback when the selected value changes.",
  },
  {
    name: "name",
    type: ["string"],
    description: "Name attribute for form submission.",
  },
  {
    name: "disabled",
    type: ["boolean"],
    default: "false",
    description: "Disable all radio items in the group.",
  },
  {
    name: "className",
    type: ["string"],
    description: "Additional class names merged via cn().",
  },
]

const radioPropDefs: PropDef[] = [
  {
    name: "value",
    type: ["string"],
    required: true,
    description: "The value submitted with the form when this item is selected.",
  },
  {
    name: "size",
    type: ["sm", "md"],
    default: "sm",
    description:
      "Size of the radio indicator and associated text.",
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
    description: "Disable this specific radio item.",
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
            Wrap <InlineCode>Radio</InlineCode> items inside a{" "}
            <InlineCode>RadioGroup</InlineCode>. Set{" "}
            <InlineCode>defaultValue</InlineCode> to pre-select an option.
          </>
        }
      >
        <RadioGroup defaultValue="option-1">
          <Radio value="option-1" label="Option one" />
          <Radio value="option-2" label="Option two" />
          <Radio value="option-3" label="Option three" />
        </RadioGroup>
      </ComponentPreview>

      <ComponentPreview
        id="sizes"
        title="Sizes"
        description={
          <>
            Use the <InlineCode>size</InlineCode> prop with{" "}
            <InlineCode>sm</InlineCode> (default) or{" "}
            <InlineCode>md</InlineCode>. The size adjusts the indicator,
            label font size, and dot size.
          </>
        }
      >
        <div className="flex gap-16">
          <RadioGroup defaultValue="sm-1">
            <Radio value="sm-1" label="Small one" size="sm" />
            <Radio value="sm-2" label="Small two" size="sm" />
          </RadioGroup>
          <RadioGroup defaultValue="md-1">
            <Radio value="md-1" label="Medium one" size="md" />
            <Radio value="md-2" label="Medium two" size="md" />
          </RadioGroup>
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
        <RadioGroup defaultValue="comfort">
          <Radio
            value="comfort"
            label="Comfort"
            description="Optimized for everyday use with relaxed settings."
          />
          <Radio
            value="compact"
            label="Compact"
            description="Reduced spacing for dense information displays."
          />
          <Radio
            value="custom"
            label="Custom"
            description="Fine-tune every setting to match your workflow."
          />
        </RadioGroup>
      </ComponentPreview>

      <ComponentPreview
        id="disabled"
        title="Disabled"
        description={
          <>
            Disable a single item with <InlineCode>disabled</InlineCode> on{" "}
            <InlineCode>Radio</InlineCode>, or the entire group via{" "}
            <InlineCode>RadioGroup</InlineCode>.
          </>
        }
      >
        <div className="flex gap-16">
          <RadioGroup defaultValue="enabled">
            <Radio value="enabled" label="Enabled" />
            <Radio value="also-enabled" label="Also enabled" />
            <Radio value="disabled-item" label="Disabled item" disabled />
          </RadioGroup>
          <RadioGroup defaultValue="all-1" disabled>
            <Radio value="all-1" label="All disabled" />
            <Radio value="all-2" label="All disabled" />
          </RadioGroup>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="indicator-only"
        title="Indicator Only"
        description={
          <>
            Omit the <InlineCode>label</InlineCode> prop to render only the
            indicator. Always provide{" "}
            <InlineCode>aria-label</InlineCode> for accessibility when using
            this pattern.
          </>
        }
      >
        <RadioGroup defaultValue="a" className="flex flex-row gap-[var(--layout-gap-lg)]">
          <Radio value="a" aria-label="Option A" />
          <Radio value="b" aria-label="Option B" />
          <Radio value="c" aria-label="Option C" />
        </RadioGroup>
      </ComponentPreview>
    </div>
  )
}

/* ----------------------------------------------------------------
 * Page
 * ---------------------------------------------------------------- */

type Tab = "overview" | "props"

export default function RadioPage() {
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
            Radio
          </h1>
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            The Radio component allows users to select a single option from a
            group. It supports two sizes, optional labels and descriptions,
            and integrates with Radix for full keyboard and screen reader
            accessibility.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add @lyse/radio")
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
                <RadioGroup defaultValue="one">
                  <Radio value="one" label="Option one" />
                  <Radio value="two" label="Option two" />
                </RadioGroup>
              }
              code={
                <>
                  <span style={{ color: "#c084fc" }}>import</span>
                  {" { "}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    RadioGroup
                  </span>
                  {", "}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    Radio
                  </span>
                  {" } "}
                  <span style={{ color: "#c084fc" }}>from</span>{" "}
                  <span
                    style={{ color: "var(--root-color-warning-400)" }}
                  >{`'@/components/ui/radio'`}</span>
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
                  {"    <"}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    RadioGroup
                  </span>
                  {' defaultValue="one">\n'}
                  {"      <"}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    Radio
                  </span>
                  {' value="one" label="Option one" />\n'}
                  {"      <"}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    Radio
                  </span>
                  {' value="two" label="Option two" />\n'}
                  {"    </"}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    RadioGroup
                  </span>
                  {">\n"}
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
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-4">
                <h2
                  className="text-heading-small font-accent"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  RadioGroup
                </h2>
                <PropsTable
                  propDefs={radioGroupPropDefs}
                  extendsType="Radix RadioGroup.Root"
                />
              </div>
              <div className="flex flex-col gap-4">
                <h2
                  className="text-heading-small font-accent"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  Radio
                </h2>
                <PropsTable
                  propDefs={radioPropDefs}
                  extendsType="Radix RadioGroup.Item"
                />
              </div>
            </div>
          )}
        </div>
      </main>

      <TableOfContents sections={tab === "overview" ? overviewSections : []} />
    </>
  )
}
