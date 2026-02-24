"use client"

import { useState } from "react"
import {
  Menu,
  MenuGroup,
  MenuItem,
} from "@/registry/new-york/ui/menu/menu"
import {
  Layers,
  Settings,
  Users,
  Home,
  FileText,
  Star,
  Trash2,
  Copy,
  ExternalLink,
  Bell,
  Search,
  Archive,
  Sparkles,
  MessageSquare,
} from "lucide-react"
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
  { id: "active", label: "Active" },
  { id: "disabled", label: "Disabled" },
  { id: "shortcut", label: "Shortcut" },
  { id: "badge", label: "Badge" },
  { id: "dot", label: "Dot" },
  { id: "grouped", label: "Grouped" },
]

const propDefs: PropDef[] = [
  {
    name: "variant",
    type: ["default", "accent"],
    default: "default",
    description: "Visual variant. Accent uses brand color for text and icon.",
  },
  {
    name: "isActive",
    type: ["boolean"],
    default: "false",
    description:
      "Active state — highlights the item with a subtle background and border.",
  },
  {
    name: "isDisabled",
    type: ["boolean"],
    default: "false",
    description: "Disabled state — mutes colors and prevents interaction.",
  },
  {
    name: "icon",
    type: ["ReactNode"],
    description: "Leading icon slot. Pass a lucide-react icon or any SVG.",
  },
  {
    name: "shortcut",
    type: ["string"],
    description: "Keyboard shortcut label displayed on the trailing side.",
  },
  {
    name: "badge",
    type: ["ReactNode"],
    description: "Badge slot — renders a pill indicator (e.g., count).",
  },
  {
    name: "dot",
    type: ["boolean"],
    default: "false",
    description: "Trailing dot indicator.",
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
    description: "Label text.",
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
            Use the <InlineCode>variant</InlineCode> prop.{" "}
            <InlineCode>default</InlineCode> uses base text colors,{" "}
            <InlineCode>accent</InlineCode> uses brand color for the label and
            icon.
          </>
        }
      >
        <div className="w-[240px] flex flex-col">
          <MenuItem icon={<Home />}>Default</MenuItem>
          <MenuItem icon={<Star />} variant="accent">
            Accent
          </MenuItem>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="with-icon"
        title="With Icon"
        description="Pass an icon to the leading slot. Icons are sized to 24px and use contextual colors."
      >
        <div className="w-[240px] flex flex-col">
          <MenuItem icon={<Home />}>Home</MenuItem>
          <MenuItem icon={<FileText />}>Documents</MenuItem>
          <MenuItem icon={<Users />}>Team</MenuItem>
          <MenuItem icon={<Settings />}>Settings</MenuItem>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="active"
        title="Active"
        description={
          <>
            Use <InlineCode>isActive</InlineCode> to highlight the current
            page or selection. Adds a subtle background and border.
          </>
        }
      >
        <div className="w-[240px] flex flex-col">
          <MenuItem icon={<Home />}>Home</MenuItem>
          <MenuItem icon={<FileText />} isActive>
            Documents
          </MenuItem>
          <MenuItem icon={<Users />}>Team</MenuItem>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="disabled"
        title="Disabled"
        description={
          <>
            Use <InlineCode>isDisabled</InlineCode> to prevent interaction.
            Text and icons are muted.
          </>
        }
      >
        <div className="w-[240px] flex flex-col">
          <MenuItem icon={<Home />}>Home</MenuItem>
          <MenuItem icon={<Archive />} isDisabled>
            Archived
          </MenuItem>
          <MenuItem icon={<Settings />}>Settings</MenuItem>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="shortcut"
        title="Shortcut"
        description={
          <>
            Pass a <InlineCode>shortcut</InlineCode> string to display a
            keyboard shortcut badge on the trailing side.
          </>
        }
      >
        <div className="w-[240px] flex flex-col">
          <MenuItem icon={<Search />} shortcut="⌘K">
            Search
          </MenuItem>
          <MenuItem icon={<Copy />} shortcut="⌘C">
            Copy
          </MenuItem>
          <MenuItem icon={<Trash2 />} shortcut="⌫">
            Delete
          </MenuItem>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="badge"
        title="Badge"
        description={
          <>
            Pass a <InlineCode>badge</InlineCode> to show a pill indicator
            -- useful for unread counts or status.
          </>
        }
      >
        <div className="w-[240px] flex flex-col">
          <MenuItem icon={<Bell />} badge="3">
            Notifications
          </MenuItem>
          <MenuItem icon={<FileText />} badge="12">
            Documents
          </MenuItem>
          <MenuItem icon={<Users />}>Team</MenuItem>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="dot"
        title="Dot"
        description="A trailing dot indicator for status or attention signals."
      >
        <div className="w-[240px] flex flex-col">
          <MenuItem icon={<Bell />} dot>
            Notifications
          </MenuItem>
          <MenuItem icon={<Home />}>Home</MenuItem>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="grouped"
        title="Grouped"
        description={
          <>
            Compose with <InlineCode>Menu</InlineCode>,{" "}
            <InlineCode>MenuGroup</InlineCode>, and{" "}
            <InlineCode>MenuDivider</InlineCode> to build full navigation
            sidebars.
          </>
        }
      >
        <div className="flex gap-10">
          {/* Sidebar — Main */}
          <div
            className="w-[240px] h-[800px] flex flex-col p-[var(--layout-padding-md)]"
            style={{
              borderRight: "var(--layout-border-thin) solid var(--border-default)",
            }}
          >
            <div className="flex-1">
              <Menu>
                <MenuGroup label="Workspace">
                  <MenuItem size="sm" icon={<Home />} isActive>
                    Members
                  </MenuItem>
                  <MenuItem size="sm" icon={<Layers />}>Usage</MenuItem>
                </MenuGroup>
                <MenuGroup label="Teams">
                  <MenuItem size="sm" icon={<Users />}>Members</MenuItem>
                  <MenuItem size="sm" icon={<Layers />}>Usage</MenuItem>
                  <MenuItem size="sm" icon={<Layers />}>Usage</MenuItem>
                  <MenuItem size="sm" icon={<Layers />}>Usage</MenuItem>
                </MenuGroup>
              </Menu>
            </div>
            <Menu>
              <MenuGroup>
                <MenuItem size="sm" icon={<Sparkles />} variant="accent">
                  What&apos;s new
                </MenuItem>
                <MenuItem size="sm" icon={<Users />}>Join the community</MenuItem>
                <MenuItem size="sm" icon={<MessageSquare />}>
                  Share feedback
                </MenuItem>
              </MenuGroup>
              <MenuGroup>
                <MenuItem size="sm" icon={<Settings />}>Settings</MenuItem>
              </MenuGroup>
            </Menu>
          </div>

        </div>
      </ComponentPreview>
    </div>
  )
}

/* ----------------------------------------------------------------
 * Page
 * ---------------------------------------------------------------- */

type Tab = "overview" | "props"

export default function MenuPage() {
  const [tab, setTab] = useState<Tab>("overview")
  const [copied, setCopied] = useState(false)

  return (
    <>
      <main
        className="flex-1 min-w-0 py-16 flex flex-col gap-10 max-w-none px-8 lg:px-16 xl:px-20"
      >
        {/* Hero */}
        <div className="flex flex-col gap-3">
          <h1
            className="text-heading-large"
            style={{ color: "var(--text-base-strong)" }}
          >
            Menu
          </h1>
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            A vertical navigation component for sidebars and panels. Menu
            provides the container, MenuGroup organizes items with optional
            labels, MenuItem renders interactive rows with icon, label, shortcut,
            badge, and dot slots. Supports default and accent variants, active
            and disabled states.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add @lyse/menu")
                  .then(() => {
                    setCopied(true)
                    setTimeout(() => setCopied(false), 2000)
                  })
                  .catch(() => {})
              }}
            >
              {copied ? "Copied!" : <><Copy className="size-4" /> Copy install command</>}
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
          <CodeBlock
            preview={
              <div className="w-[240px]">
                <MenuItem icon={<Home />}>Home</MenuItem>
              </div>
            }
            code={
              <>
                <span style={{ color: "var(--root-color-brand-300)" }}>import</span>
                {" { "}
                <span
                  style={{ color: "var(--root-color-success-400)" }}
                >
                  MenuItem
                </span>
                {" } "}
                <span style={{ color: "var(--root-color-brand-300)" }}>from</span>{" "}
                <span
                  style={{ color: "var(--root-color-warning-400)" }}
                >{`'@/components/ui/menu'`}</span>
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
                  MenuItem
                </span>
                {" "}
                <span style={{ color: "var(--root-color-brand-300)" }}>
                  icon
                </span>
                {"={<"}
                <span
                  style={{ color: "var(--root-color-success-400)" }}
                >
                  Home
                </span>
                {" />}>"}
                Home
                {"</"}
                <span
                  style={{ color: "var(--root-color-success-400)" }}
                >
                  MenuItem
                </span>
                {">\n"}
                {"}"}
              </>
            }
          />

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

      {tab === "overview" && (
        <TableOfContents sections={overviewSections} />
      )}
    </>
  )
}
