"use client"

import { useState } from "react"
import { toast } from "@/registry/new-york/ui/toast/toast"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/registry/new-york/ui/dropdown-menu/dropdown-menu"
import { Button } from "@/registry/new-york/ui/button/button"
import {
  Copy,
  ExternalLink,
  Settings,
  User,
  LogOut,
  Trash2,
  FileText,
  Download,
  Share2,
  MoreHorizontal,
  Pencil,
} from "lucide-react"
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
  { id: "with-icons", label: "With Icons" },
  { id: "with-shortcuts", label: "With Shortcuts" },
  { id: "destructive", label: "Destructive" },
  { id: "grouped", label: "Grouped" },
  { id: "disabled-items", label: "Disabled Items" },
]

const docSections: TocSection[] = [
  { id: "dos-donts", label: "Do / Don't" },
]

const dosDontsItems: DosDontsItem[] = [
  {
    do: {
      preview: (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="sm">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem icon={<Pencil />}>Edit</DropdownMenuItem>
            <DropdownMenuItem icon={<Share2 />}>Share</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem icon={<Trash2 />} variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      description:
        "Use for action menus (edit, delete, share) triggered by a button.",
    },
    dont: {
      preview: (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="sm">
              Select status
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Active</DropdownMenuItem>
            <DropdownMenuItem>Inactive</DropdownMenuItem>
            <DropdownMenuItem>Archived</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      description:
        "Don't use for value selection in forms — use Select instead.",
    },
  },
  {
    do: {
      preview: (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="sm">Actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem icon={<Pencil />}>Edit</DropdownMenuItem>
            <DropdownMenuItem icon={<Copy />}>Duplicate</DropdownMenuItem>
            <DropdownMenuItem icon={<Download />}>Export</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      description:
        "Keep items short and scannable with clear action labels.",
    },
    dont: {
      preview: (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="sm">Actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit this item and update all fields</DropdownMenuItem>
            <DropdownMenuItem>Make a copy of the current document</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      description:
        "Don't add complex or multi-line content inside menu items.",
    },
  },
  {
    do: {
      preview: (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="sm">Account</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem icon={<User />}>Profile</DropdownMenuItem>
              <DropdownMenuItem icon={<Settings />}>Settings</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem icon={<LogOut />}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      description:
        "Group related actions with labels and separators for scannability.",
    },
    dont: {
      preview: (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="sm">Account</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem icon={<User />}>Profile</DropdownMenuItem>
            <DropdownMenuItem icon={<Settings />}>Settings</DropdownMenuItem>
            <DropdownMenuItem icon={<LogOut />}>Log out</DropdownMenuItem>
            <DropdownMenuItem icon={<Trash2 />} variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      description:
        "Don't mix unrelated actions in a flat list without separators.",
    },
  },
  {
    do: {
      preview: (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="sm">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem icon={<Pencil />}>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem icon={<Trash2 />} variant="destructive">Delete project</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      description:
        "Use the destructive variant for dangerous actions like delete or remove.",
    },
    dont: {
      preview: (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="sm">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem icon={<Pencil />} variant="destructive">Edit</DropdownMenuItem>
            <DropdownMenuItem icon={<Share2 />} variant="destructive">Share</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      description:
        "Don't use the destructive variant for non-dangerous items.",
    },
  },
]

const propDefs: PropDef[] = [
  {
    name: "variant",
    type: ["default", "destructive"],
    default: "default",
    description:
      "Visual variant. Destructive uses danger color tokens for delete/remove actions.",
  },
  {
    name: "size",
    type: ["sm", "md"],
    default: "md",
    description: "Item height and density.",
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
  {
    name: "children",
    type: ["ReactNode"],
    required: true,
    description: "Label text.",
  },
]

const importCode = `import {
  DropdownMenu, DropdownMenuTrigger,
  DropdownMenuContent, DropdownMenuItem
} from '@/components/ui/dropdown-menu'

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    ...
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`

/* ----------------------------------------------------------------
 * Tabs
 * ---------------------------------------------------------------- */

function OverviewTab() {
  return (
    <div className="flex flex-col gap-12">
      <ComponentPreview
        id="default"
        title="Default"
        description="Basic dropdown menu triggered by a button."
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="sm">
              Open menu
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Help</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ComponentPreview>

      <ComponentPreview
        id="with-icons"
        title="With Icons"
        description="Leading icons for visual context."
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="sm">
              Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem icon={<Pencil />}>Edit</DropdownMenuItem>
            <DropdownMenuItem icon={<Copy />}>Duplicate</DropdownMenuItem>
            <DropdownMenuItem icon={<Download />}>Download</DropdownMenuItem>
            <DropdownMenuItem icon={<Share2 />}>Share</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ComponentPreview>

      <ComponentPreview
        id="with-shortcuts"
        title="With Shortcuts"
        description="Display keyboard shortcut hints on the trailing side."
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="sm">
              Edit
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem icon={<Copy />} shortcut="⌘C">
              Copy
            </DropdownMenuItem>
            <DropdownMenuItem icon={<FileText />} shortcut="⌘V">
              Paste
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem icon={<Trash2 />} shortcut="⌫" variant="destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ComponentPreview>

      <ComponentPreview
        id="destructive"
        title="Destructive"
        description="Red styling for dangerous actions like delete or remove."
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="sm">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem icon={<Pencil />}>Edit</DropdownMenuItem>
            <DropdownMenuItem icon={<Share2 />}>Share</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem icon={<Trash2 />} variant="destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ComponentPreview>

      <ComponentPreview
        id="grouped"
        title="Grouped"
        description="Organize items with groups, labels, and separators."
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="sm">
              Account
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem icon={<User />}>Profile</DropdownMenuItem>
              <DropdownMenuItem icon={<Settings />} shortcut="⌘,">
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem icon={<LogOut />}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ComponentPreview>

      <ComponentPreview
        id="disabled-items"
        title="Disabled Items"
        description="Non-interactive items with muted styling."
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="sm">
              Options
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem icon={<Copy />}>Copy</DropdownMenuItem>
            <DropdownMenuItem icon={<Download />} disabled>
              Download (unavailable)
            </DropdownMenuItem>
            <DropdownMenuItem icon={<Share2 />}>Share</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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

export default function DropdownMenuPage() {
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
            DropdownMenu
          </h1>
          <p
            className="text-content-highlight"
            style={{ color: "var(--text-base-moderate)" }}
          >
            The DropdownMenu component is an action menu triggered by a button
            or control. It organizes contextual actions into a structured
            overlay, helping users access commands without leaving their current
            view.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add https://ui.getlyse.com/r/dropdown-menu.json")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <><Copy className="size-4" /> Copy install command</>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a
                href="https://v0.app/chat?q=add%20component%20from%20https%3A%2F%2Fui.getlyse.com%2Fr%2Fdropdown-menu.json"
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="sm">
                      Open
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
              extendsType="DropdownMenuPrimitive.ItemProps"
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
            : tab === "documentation"
              ? docSections
              : []
        }
      />
    </>
  )
}
