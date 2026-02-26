"use client"

import { useState } from "react"
import { toast } from "@/registry/new-york/ui/toast/toast"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectValue,
} from "@/registry/new-york/ui/select/select"
import { Button } from "@/registry/new-york/ui/button/button"
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
  { id: "default", label: "Default" },
  { id: "sizes", label: "Sizes" },
  { id: "variants", label: "Variants" },
  { id: "grouped", label: "Grouped" },
  { id: "disabled", label: "Disabled" },
]

const triggerPropDefs: PropDef[] = [
  {
    name: "variant",
    type: ["default", "destructive", "success"],
    default: "default",
    description:
      "Visual variant. Controls border and focus ring color.",
  },
  {
    name: "size",
    type: ["sm", "md", "lg"],
    default: "md",
    description: "Trigger height.",
  },
  {
    name: "disabled",
    type: ["boolean"],
    default: "false",
    description: "Disabled state — mutes colors and prevents interaction.",
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
    required: true,
    description: "Item value used for selection.",
  },
  {
    name: "disabled",
    type: ["boolean"],
    default: "false",
    description: "Disabled state — prevents selection.",
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
    description: "Label text displayed for this option.",
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
        description="A basic select with placeholder text."
      >
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="cherry">Cherry</SelectItem>
            <SelectItem value="grape">Grape</SelectItem>
          </SelectContent>
        </Select>
      </ComponentPreview>

      <ComponentPreview
        id="sizes"
        title="Sizes"
        description={
          <>
            Use the <InlineCode>size</InlineCode> prop on{" "}
            <InlineCode>SelectTrigger</InlineCode> to control height.
          </>
        }
      >
        <div className="flex items-end gap-4">
          <Select>
            <SelectTrigger size="sm" className="w-[180px]">
              <SelectValue placeholder="Small" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a">Option A</SelectItem>
              <SelectItem value="b">Option B</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger size="md" className="w-[180px]">
              <SelectValue placeholder="Medium" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a">Option A</SelectItem>
              <SelectItem value="b">Option B</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger size="lg" className="w-[180px]">
              <SelectValue placeholder="Large" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a">Option A</SelectItem>
              <SelectItem value="b">Option B</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="variants"
        title="Variants"
        description={
          <>
            Use <InlineCode>variant</InlineCode> to change the trigger
            border and focus ring color for validation states.
          </>
        }
      >
        <div className="flex items-end gap-4">
          <Select>
            <SelectTrigger variant="default" className="w-[180px]">
              <SelectValue placeholder="Default" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a">Option A</SelectItem>
              <SelectItem value="b">Option B</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger variant="destructive" className="w-[180px]">
              <SelectValue placeholder="Destructive" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a">Option A</SelectItem>
              <SelectItem value="b">Option B</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger variant="success" className="w-[180px]">
              <SelectValue placeholder="Success" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a">Option A</SelectItem>
              <SelectItem value="b">Option B</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="grouped"
        title="Grouped"
        description={
          <>
            Use <InlineCode>SelectGroup</InlineCode>,{" "}
            <InlineCode>SelectLabel</InlineCode>, and{" "}
            <InlineCode>SelectSeparator</InlineCode> to organize options.
          </>
        }
      >
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a timezone" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>North America</SelectLabel>
              <SelectItem value="est">Eastern (EST)</SelectItem>
              <SelectItem value="cst">Central (CST)</SelectItem>
              <SelectItem value="pst">Pacific (PST)</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Europe</SelectLabel>
              <SelectItem value="gmt">Greenwich (GMT)</SelectItem>
              <SelectItem value="cet">Central (CET)</SelectItem>
              <SelectItem value="eet">Eastern (EET)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </ComponentPreview>

      <ComponentPreview
        id="disabled"
        title="Disabled"
        description="Disable the entire select or individual items."
      >
        <div className="flex items-end gap-4">
          <Select disabled>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Disabled select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a">Option A</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Disabled items" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a">Available</SelectItem>
              <SelectItem value="b" disabled>
                Unavailable
              </SelectItem>
              <SelectItem value="c">Available</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </ComponentPreview>
    </div>
  )
}

/* ----------------------------------------------------------------
 * Page
 * ---------------------------------------------------------------- */

type Tab = "overview" | "props"

export default function SelectPage() {
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
            Select
          </h1>
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            A form select component for choosing a single value from a dropdown
            list. Built on Radix UI Select with full keyboard navigation, ARIA
            combobox pattern, and scroll management. Supports sizes, validation
            variants, groups, labels, and disabled states.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add @lyse/select")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <><Copy className="size-4" /> Copy install command</>
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
                <Select>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a">Option A</SelectItem>
                    <SelectItem value="b">Option B</SelectItem>
                  </SelectContent>
                </Select>
              }
              code={
                <>
                  <span style={{ color: "var(--root-color-brand-300)" }}>import</span>
                  {" { "}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    Select, SelectTrigger,{"\n"}
                    {"  "}SelectContent, SelectItem, SelectValue
                  </span>
                  {" } "}
                  <span style={{ color: "var(--root-color-brand-300)" }}>from</span>{" "}
                  <span style={{ color: "var(--root-color-warning-400)" }}>
                    {`'@/components/ui/select'`}
                  </span>
                  {"\n\n"}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"<"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>Select</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"\n  "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"<"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>SelectTrigger</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"\n    "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"<"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>SelectValue</span>
                  {" "}
                  <span style={{ color: "var(--root-color-brand-300)" }}>placeholder</span>
                  {"="}
                  <span style={{ color: "var(--root-color-warning-400)" }}>{`"Select..."`}</span>
                  {" />"}
                  {"\n  "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"</"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>SelectTrigger</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"\n  "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"<"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>SelectContent</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"\n    "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"<"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>SelectItem</span>
                  {" "}
                  <span style={{ color: "var(--root-color-brand-300)" }}>value</span>
                  {"="}
                  <span style={{ color: "var(--root-color-warning-400)" }}>{`"a"`}</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"Option A"}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"</"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>SelectItem</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"\n  "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"</"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>SelectContent</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"\n"}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"</"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>Select</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                </>
              }
            />
          )}

          {/* Tab content */}
          {tab === "overview" ? (
            <OverviewTab />
          ) : (
            <div className="flex flex-col gap-12">
              <div>
                <h3
                  className="text-heading-small mb-4"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  SelectTrigger
                </h3>
                <PropsTable
                  propDefs={triggerPropDefs}
                  extendsType="SelectPrimitive.TriggerProps"
                />
              </div>
              <div>
                <h3
                  className="text-heading-small mb-4"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  SelectItem
                </h3>
                <PropsTable
                  propDefs={itemPropDefs}
                  extendsType="SelectPrimitive.ItemProps"
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
