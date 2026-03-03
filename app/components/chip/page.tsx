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
  { id: "variants", label: "Variants" },
  { id: "with-icon", label: "With Icon" },
  { id: "with-dropdown", label: "With Dropdown" },
  { id: "disabled", label: "Disabled" },
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
        description={
          <>
            Use the <InlineCode>variant</InlineCode> prop to control the
            visual style. <InlineCode>filled</InlineCode> (default) has a
            neutral background, <InlineCode>outline</InlineCode> has a
            border only, and <InlineCode>ghost</InlineCode> has no
            background.
          </>
        }
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
        description={
          <>
            Pass an <InlineCode>icon</InlineCode> prop to display a leading
            icon. Icons are rendered at 12px and only shown when{" "}
            <InlineCode>hasDropdown</InlineCode> is false.
          </>
        }
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
        description={
          <>
            Compose with <InlineCode>DropdownMenu</InlineCode> for
            selectable options. Wrap the Chip in{" "}
            <InlineCode>DropdownMenuTrigger</InlineCode> with{" "}
            <InlineCode>asChild</InlineCode> and set{" "}
            <InlineCode>hasDropdown</InlineCode> to show the chevron. The
            chip automatically shows a pressed state when the menu is open
            via Radix&apos;s <InlineCode>data-state</InlineCode> attribute.
          </>
        }
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
        description={
          <>
            Use the native <InlineCode>disabled</InlineCode> attribute to
            disable the chip. All variants support the disabled state.
          </>
        }
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

/* ----------------------------------------------------------------
 * Page
 * ---------------------------------------------------------------- */

type Tab = "overview" | "props"

export default function ChipPage() {
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
            Chip
          </h1>
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            A compact, inline selector styled as a clickable chip with an
            optional dropdown chevron. Compose with DropdownMenu for
            selectable options, or use standalone with an icon.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add @lyse/chip")
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
          ) : (
            <PropsTable
              propDefs={propDefs}
              extendsType={`React.ComponentProps<"button">`}
            />
          )}
        </div>
      </main>

      <TableOfContents sections={tab === "overview" ? overviewSections : []} />
    </>
  )
}
