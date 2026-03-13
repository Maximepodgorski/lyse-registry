"use client"

import { useState } from "react"
import { toast } from "@/registry/new-york/ui/toast/toast"
import {
  Menu,
  MenuGroup,
  MenuItem,
} from "@/registry/new-york/ui/menu/menu"
import {
  Archive,
  BarChart3,
  Bell,
  Copy,
  ExternalLink,
  FileText,
  Home,
  MessageSquare,
  Search,
  Settings,
  Sparkles,
  Star,
  Trash2,
  Users,
} from "lucide-react"
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
  { id: "active", label: "Active" },
  { id: "disabled", label: "Disabled" },
  { id: "shortcut", label: "Shortcut" },
  { id: "badge", label: "Badge" },
  { id: "dot", label: "Dot" },
  { id: "grouped", label: "Grouped" },
]

const dosDontsItems: DosDontsItem[] = [
  {
    do: {
      preview: (
        <div className="w-[240px] flex flex-col">
          <MenuItem icon={<Home />} shortcut="&#8984;H">Home</MenuItem>
          <MenuItem icon={<Bell />} badge="3">Notifications</MenuItem>
        </div>
      ),
      description:
        "Use icon, badge, shortcut, and dot props on a standard MenuItem.",
    },
    dont: {
      preview: (
        <div className="w-[240px] flex flex-col">
          <MenuItem asChild icon={<Home />} shortcut="&#8984;H">
            <a href="#">Home</a>
          </MenuItem>
        </div>
      ),
      description:
        "Don't expect icon/badge/shortcut/dot slots to render when using asChild \u2014 they are skipped.",
    },
  },
  {
    do: {
      preview: (
        <div className="w-[240px] flex flex-col">
          <MenuGroup label="Navigation">
            <MenuItem icon={<Home />} size="sm">Home</MenuItem>
            <MenuItem icon={<FileText />} size="sm">Documents</MenuItem>
          </MenuGroup>
        </div>
      ),
      description:
        "Use MenuGroup label for visible section headings.",
    },
    dont: {
      preview: (
        <div className="w-[240px] flex flex-col">
          <MenuGroup>
            <span className="text-content-caption px-3 py-1" style={{ color: "var(--text-base-bolder)" }}>Navigation</span>
            <MenuItem icon={<Home />} size="sm">Home</MenuItem>
            <MenuItem icon={<FileText />} size="sm">Documents</MenuItem>
          </MenuGroup>
        </div>
      ),
      description:
        "Don't add a plain text node as the first child of a MenuGroup for labeling.",
    },
  },
  {
    do: {
      preview: (
        <div className="w-[240px] flex flex-col">
          <MenuItem icon={<Home />}>Overview</MenuItem>
          <MenuItem icon={<BarChart3 />} active>Analytics</MenuItem>
          <MenuItem icon={<Settings />}>Settings</MenuItem>
        </div>
      ),
      description:
        'Use active for the currently active route \u2014 only one item at a time.',
    },
    dont: {
      preview: (
        <div className="w-[240px] flex flex-col">
          <MenuItem icon={<Home />} active>Overview</MenuItem>
          <MenuItem icon={<BarChart3 />} active>Analytics</MenuItem>
        </div>
      ),
      description:
        "Don't use active on multiple items simultaneously.",
    },
  },
  {
    do: {
      preview: (
        <div className="w-[240px] flex flex-col">
          <MenuItem icon={<Home />}>Home</MenuItem>
          <MenuItem icon={<Sparkles />} variant="accent">What&apos;s new</MenuItem>
        </div>
      ),
      description:
        'Use variant="accent" sparingly for one primary action in the menu.',
    },
    dont: {
      preview: (
        <div className="w-[240px] flex flex-col">
          <MenuItem icon={<Home />} variant="accent">Home</MenuItem>
          <MenuItem icon={<Settings />} variant="accent">Settings</MenuItem>
        </div>
      ),
      description:
        'Don\'t apply variant="accent" to all items in a group.',
    },
  },
]

const propDefs: PropDef[] = [
  {
    name: "variant",
    type: ["default", "accent"],
    default: "default",
    description: "Visual variant. Accent uses brand color for text and icon.",
  },
  {
    name: "active",
    type: ["boolean"],
    default: "false",
    description:
      "Active state — highlights the item with a subtle background and border.",
  },
  {
    name: "disabled",
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
        description="Default uses base text colors, accent uses brand color for label and icon."
      >
        <div className="w-[240px] flex flex-col">
          <MenuItem icon={<Home />}>Default</MenuItem>
          <MenuItem icon={<Sparkles />} variant="accent">
            Accent
          </MenuItem>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="with-icon"
        title="With Icon"
        description="Pass an icon to the leading slot. Icons are sized to 24×24 and use contextual colors."
      >
        <div className="w-[240px] flex flex-col">
          <MenuItem icon={<Search />}>Search</MenuItem>
          <MenuItem icon={<FileText />}>Documents</MenuItem>
          <MenuItem icon={<Users />}>Team</MenuItem>
          <MenuItem icon={<Settings />}>Settings</MenuItem>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="active"
        title="Active"
        description="Highlights the current page or selection with a subtle background and border."
      >
        <div className="w-[240px] flex flex-col">
          <MenuItem icon={<Home />}>Overview</MenuItem>
          <MenuItem icon={<BarChart3 />} active>
            Analytics
          </MenuItem>
          <MenuItem icon={<Settings />}>Settings</MenuItem>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="disabled"
        title="Disabled"
        description="Prevents interaction. Text and icons are muted."
      >
        <div className="w-[240px] flex flex-col">
          <MenuItem icon={<Star />}>Favorites</MenuItem>
          <MenuItem icon={<Archive />} disabled>
            Archived
          </MenuItem>
          <MenuItem icon={<Trash2 />} disabled>
            Deleted
          </MenuItem>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="shortcut"
        title="Shortcut"
        description="Displays a keyboard shortcut badge on the trailing side."
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
        description="Shows a pill indicator for unread counts or status."
      >
        <div className="w-[240px] flex flex-col">
          <MenuItem icon={<Bell />} badge="3">
            Notifications
          </MenuItem>
          <MenuItem icon={<MessageSquare />} badge="12">
            Messages
          </MenuItem>
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
          <MenuItem icon={<Sparkles />} dot>
            What&apos;s new
          </MenuItem>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="grouped"
        title="Grouped"
        description="Full navigation panel with grouped sections, labels, and dividers."
      >
        <div
          className="w-[240px] h-[50rem] flex flex-col p-[var(--layout-padding-md)]"
          style={{
            borderRight: "var(--layout-border-thin) solid var(--border-default)",
          }}
        >
          <div className="flex-1">
            <Menu className="gap-[var(--layout-gap-lg)]">
              <div className="p-[var(--layout-padding-xs)]">
                <img src="/logotype.svg" alt="Lyse" className="h-6 w-auto" />
              </div>
              <MenuGroup label="Platform">
                <MenuItem size="sm" icon={<Home />} active>
                  Dashboard
                </MenuItem>
                <MenuItem size="sm" icon={<BarChart3 />}>
                  Analytics
                </MenuItem>
                <MenuItem size="sm" icon={<Users />}>
                  Team
                </MenuItem>
              </MenuGroup>
              <MenuGroup label="Resources">
                <MenuItem size="sm" icon={<FileText />}>
                  Documentation
                </MenuItem>
                <MenuItem size="sm" icon={<MessageSquare />}>
                  Support
                </MenuItem>
              </MenuGroup>
            </Menu>
          </div>
          <Menu>
            <MenuGroup>
              <MenuItem size="sm" icon={<Sparkles />} variant="accent">
                What&apos;s new
              </MenuItem>
              <MenuItem size="sm" icon={<Settings />}>
                Settings
              </MenuItem>
            </MenuGroup>
          </Menu>
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

const importCode = `import { MenuItem } from '@/components/ui/menu'

export default function Example() {
  return <MenuItem icon={<Home />}>Home</MenuItem>
}`

type Tab = "overview" | "props" | "documentation"

export default function MenuPage() {
  const [tab, setTab] = useState<Tab>("overview")

  return (
    <>
      <main
        className="flex-1 min-w-0 py-16 flex flex-col gap-10 max-w-none px-5 sm:px-8 lg:px-16 xl:px-20"
      >
        {/* Hero */}
        <div className="flex flex-col gap-3">
          <h1
            className="font-bold"
            style={{ color: "var(--text-base-strong)", fontSize: "var(--root-font-size-5xl)" }}
          >
            Menu
          </h1>
          <p
            className="text-content-highlight"
            style={{ color: "var(--text-base-bolder)" }}
          >
            The Menu component provides a vertical navigation structure for
            sidebars and panels. It organizes links and actions into logical
            groups, helping users navigate through the application efficiently.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add https://ui.getlyse.com/r/menu.json")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <><Copy className="size-4" /> Copy install command</>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a
                href="https://v0.app/chat?q=add%20component%20from%20https%3A%2F%2Fui.getlyse.com%2Fr%2Fmenu.json"
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
                <div className="w-[240px]">
                  <MenuItem icon={<Home />}>Home</MenuItem>
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
            <PropsTable
              propDefs={propDefs}
              extendsType={`React.ComponentProps<"button">`}
            />
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
