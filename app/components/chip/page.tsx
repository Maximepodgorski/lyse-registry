"use client"

import { useState } from "react"
import { Chip } from "@/registry/new-york/ui/chip/chip"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/registry/new-york/ui/dropdown-menu/dropdown-menu"
import { toast } from "@/registry/new-york/ui/toast/toast"
import { Copy, ExternalLink, User, Filter, Settings } from "lucide-react"
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
  { id: "variants", label: "Variants" },
  { id: "with-icon", label: "With Icon" },
  { id: "with-dropdown", label: "With Dropdown" },
  { id: "disabled", label: "Disabled" },
]

const docSections: TocSection[] = [
  { id: "dos-donts", label: "Do / Don't" },
]

const dosDontsItems: DosDontsItem[] = [
  {
    do: {
      preview: <Chip variant="filled" hasDropdown>Status</Chip>,
      description:
        "Use hasDropdown when the chip opens a popover or menu.",
    },
    dont: {
      preview: <Chip variant="filled" hasDropdown icon={<Filter />}>Filter</Chip>,
      description:
        "Don't show both icon and hasDropdown — the icon is hidden. Use one or the other.",
    },
  },
  {
    do: {
      preview: (
        <div className="flex items-center gap-[var(--layout-gap-xs)]">
          <Chip variant="filled" hasDropdown>Status</Chip>
          <Chip variant="ghost" hasDropdown>Sort by</Chip>
        </div>
      ),
      description:
        'Use variant="ghost" for less prominent, secondary filters.',
    },
    dont: {
      preview: (
        <div className="flex items-center gap-[var(--layout-gap-xs)]">
          <Chip variant="ghost" hasDropdown>Status</Chip>
          <Chip variant="ghost" hasDropdown>Priority</Chip>
        </div>
      ),
      description:
        "Don't use ghost for the primary action in a filter bar — it's too subtle.",
    },
  },
  {
    do: {
      preview: (
        <div className="flex items-center gap-[var(--layout-gap-xs)]">
          <Chip variant="filled" hasDropdown>Status</Chip>
          <Chip variant="outline" icon={<User />}>Assignee</Chip>
        </div>
      ),
      description:
        'Keep labels short (1-2 words): "Status", "Priority", "Date".',
    },
    dont: {
      preview: <Chip variant="filled" hasDropdown>Filter by task priority level</Chip>,
      description:
        "Don't put long text in a chip — it breaks the compact layout.",
    },
  },
  {
    do: {
      description:
        'Use data-state="open" styling by wrapping in a DropdownMenuTrigger.',
    },
    dont: {
      description:
        "Don't manually toggle active styles — rely on Radix state attributes.",
    },
  },
]

const propDefs: PropDef[] = [
  {
    name: "variant",
    type: ["filled", "outline", "ghost"],
    default: "filled",
    description: "Visual style of the chip.",
  },
  {
    name: "hasDropdown",
    type: ["boolean"],
    default: "false",
    description:
      "Shows a chevron icon and adjusts padding for dropdown trigger usage.",
  },
  {
    name: "icon",
    type: ["ReactNode"],
    description:
      "Leading icon. Only rendered when hasDropdown is false.",
  },
  {
    name: "disabled",
    type: ["boolean"],
    default: "false",
    description: "Disables the chip interaction.",
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
    description: "Chip label content.",
  },
]

/* ----------------------------------------------------------------
 * Tabs
 * ---------------------------------------------------------------- */

function OverviewTab() {
  return (
    <div className="flex flex-col gap-12">
      <ComponentPreview
        id="variants"
        title="Variants"
        description="Three visual styles: filled (default), outline (border only), and ghost (no background)."
      >
        <Chip variant="filled" hasDropdown>
          Filled
        </Chip>
        <Chip variant="outline" hasDropdown>
          Outline
        </Chip>
        <Chip variant="ghost" hasDropdown>
          Ghost
        </Chip>
      </ComponentPreview>

      <ComponentPreview
        id="with-icon"
        title="With Icon"
        description="Displays a leading icon at 12px. Only shown when hasDropdown is false."
      >
        <Chip variant="filled" icon={<User />}>
          Maxime
        </Chip>
        <Chip variant="outline" icon={<Filter />}>
          Filter
        </Chip>
        <Chip variant="ghost" icon={<Settings />}>
          Settings
        </Chip>
      </ComponentPreview>

      <ComponentPreview
        id="with-dropdown"
        title="With Dropdown"
        description="Wrap in a DropdownMenuTrigger with asChild and set hasDropdown. Shows a pressed state when the menu is open."
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Chip variant="filled" hasDropdown>
              Status
            </Chip>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Active</DropdownMenuItem>
            <DropdownMenuItem>Inactive</DropdownMenuItem>
            <DropdownMenuItem>Archived</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Chip variant="outline" hasDropdown>
              Priority
            </Chip>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>High</DropdownMenuItem>
            <DropdownMenuItem>Medium</DropdownMenuItem>
            <DropdownMenuItem>Low</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Chip variant="ghost" hasDropdown>
              Sort by
            </Chip>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Newest</DropdownMenuItem>
            <DropdownMenuItem>Oldest</DropdownMenuItem>
            <DropdownMenuItem>Name</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ComponentPreview>

      <ComponentPreview
        id="disabled"
        title="Disabled"
        description="All variants support the disabled state via the native disabled attribute."
      >
        <Chip variant="filled" hasDropdown disabled>
          Filled
        </Chip>
        <Chip variant="outline" hasDropdown disabled>
          Outline
        </Chip>
        <Chip variant="ghost" hasDropdown disabled>
          Ghost
        </Chip>
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

export default function ChipPage() {
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
            Chip
          </h1>
          <p
            className="text-content-highlight"
            style={{ color: "var(--text-base-moderate)" }}
          >
            The Chip component is a compact, clickable selector used for
            filtering or toggling options. It provides an inline way to make
            quick selections, optionally paired with a dropdown for more
            choices.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add https://ui.getlyse.com/r/chip.json")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <><Copy /> Copy install command</>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a
                href="https://v0.app/chat?q=add%20component%20from%20https%3A%2F%2Fui.getlyse.com%2Fr%2Fchip.json"
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
                <Chip variant="filled" hasDropdown>
                  Label
                </Chip>
              }
              code={
                <>
                  <span style={{ color: "#c084fc" }}>import</span>
                  {" { "}
                  <span
                    style={{ color: "var(--root-color-success-400)" }}
                  >
                    Chip
                  </span>
                  {" } "}
                  <span style={{ color: "#c084fc" }}>from</span>{" "}
                  <span
                    style={{ color: "var(--root-color-warning-400)" }}
                  >{`'@/components/ui/chip'`}</span>
                  {"\n\n"}
                  <span
                    style={{ color: "var(--root-color-brand-400)" }}
                  >
                    export default
                  </span>{" "}
                  <span
                    style={{ color: "var(--root-color-brand-400)" }}
                  >
                    function
                  </span>{" "}
                  <span
                    style={{ color: "var(--root-color-success-400)" }}
                  >
                    Example
                  </span>
                  {"() {\n"}
                  {"  "}
                  <span
                    style={{ color: "var(--root-color-brand-400)" }}
                  >
                    return
                  </span>{" "}
                  {"<"}
                  <span
                    style={{ color: "var(--root-color-success-400)" }}
                  >
                    Chip
                  </span>
                  {" "}
                  <span
                    style={{ color: "var(--root-color-brand-400)" }}
                  >
                    hasDropdown
                  </span>
                  {">"}
                  Label
                  {"</"}
                  <span
                    style={{ color: "var(--root-color-success-400)" }}
                  >
                    Chip
                  </span>
                  {">\n"}
                  {"}"}
                </>
              }
            />
          )}

          {/* Tab content */}
          {tab === "overview" ? (
            <OverviewTab />
          ) : tab === "props" ? (
            <PropsTable
              propDefs={propDefs}
              extendsType={`React.ComponentProps<"button">`}
            />
          ) : (
            <DocumentationTab />
          )}
        </div>
      </main>

      <TableOfContents sections={tab === "overview" ? overviewSections : tab === "documentation" ? docSections : []} />
    </>
  )
}
