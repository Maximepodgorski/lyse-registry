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
  { id: "variants", label: "Variants" },
  { id: "grouped", label: "Grouped" },
  { id: "disabled", label: "Disabled" },
]

const docSections: TocSection[] = [
  { id: "dos-donts", label: "Do / Don't" },
]

const dosDontsItems: DosDontsItem[] = [
  {
    do: {
      preview: (
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectContent>
        </Select>
      ),
      description:
        "Use for single-value selection in forms.",
    },
    dont: {
      description:
        "Don't use for action menus — use DropdownMenu instead.",
    },
  },
  {
    do: {
      preview: (
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Choose an option..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Option A</SelectItem>
          </SelectContent>
        </Select>
      ),
      description:
        "Provide a clear placeholder that describes the expected selection.",
    },
    dont: {
      preview: (
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Option A</SelectItem>
          </SelectContent>
        </Select>
      ),
      description:
        "Don't leave the placeholder empty — the user won't know what to select.",
    },
  },
  {
    do: {
      preview: (
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a timezone" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>North America</SelectLabel>
              <SelectItem value="est">Eastern (EST)</SelectItem>
              <SelectItem value="pst">Pacific (PST)</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Europe</SelectLabel>
              <SelectItem value="gmt">Greenwich (GMT)</SelectItem>
              <SelectItem value="cet">Central (CET)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      ),
      description:
        "Group related options with labels and separators for organization.",
    },
    dont: {
      preview: (
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Pick one" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="est">Eastern (EST)</SelectItem>
            <SelectItem value="pst">Pacific (PST)</SelectItem>
            <SelectItem value="gmt">Greenwich (GMT)</SelectItem>
            <SelectItem value="cet">Central (CET)</SelectItem>
          </SelectContent>
        </Select>
      ),
      description:
        "Don't mix unrelated options in a flat list without separators.",
    },
  },
  {
    do: {
      preview: (
        <Select>
          <SelectTrigger variant="destructive" className="w-[200px]">
            <SelectValue placeholder="Error state" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Option A</SelectItem>
          </SelectContent>
        </Select>
      ),
      description:
        "Use validation variants (destructive, success) for form feedback.",
    },
    dont: {
      preview: (
        <Select>
          <SelectTrigger variant="destructive" className="w-[200px]">
            <SelectValue placeholder="Highlighted" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Option A</SelectItem>
          </SelectContent>
        </Select>
      ),
      description:
        "Don't use the destructive variant for non-error states.",
    },
  },
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
        description="Basic select with placeholder text."
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
        description="Controls trigger height."
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
        description="Border and focus ring color for validation states."
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
        description="Organize options with groups, labels, and separators."
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

export default function SelectPage() {
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
            Select
          </h1>
          <p
            className="text-content-highlight"
            style={{ color: "var(--text-base-moderate)" }}
          >
            The Select component is a form control for choosing a single value
            from a dropdown list. It provides a compact and accessible way to
            make selections when the list of options is too long for radio
            buttons.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add https://ui.getlyse.com/r/select.json")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <><Copy className="size-4" /> Copy install command</>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a
                href="https://v0.app/chat?q=add%20component%20from%20https%3A%2F%2Fui.getlyse.com%2Fr%2Fselect.json"
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
          ) : tab === "props" ? (
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
          ) : (
            <DocumentationTab />
          )}
        </div>
      </main>

      <TableOfContents
        sections={
          tab === "overview"
            ? overviewSections
            : tab === "documentation"
              ? docSections
              : []
        }
      />
    </>
  )
}
