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
  { id: "with-icons", label: "With Icons" },
  { id: "with-shortcuts", label: "With Shortcuts" },
  { id: "destructive", label: "Destructive" },
  { id: "grouped", label: "Grouped" },
  { id: "disabled-items", label: "Disabled Items" },
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

/* ----------------------------------------------------------------
 * Tabs
 * ---------------------------------------------------------------- */

function OverviewTab() {
  return (
    <div className="flex flex-col gap-12">
      <ComponentPreview
        id="default"
        title="Default"
        description="A basic dropdown menu triggered by a button."
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
        description="Pass an icon to the leading slot for visual context."
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
        description={
          <>
            Use the <InlineCode>shortcut</InlineCode> prop to display keyboard
            shortcut hints.
          </>
        }
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
        description={
          <>
            Use <InlineCode>variant=&quot;destructive&quot;</InlineCode> for
            dangerous actions like delete or remove.
          </>
        }
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
        description={
          <>
            Use <InlineCode>DropdownMenuGroup</InlineCode>,{" "}
            <InlineCode>DropdownMenuLabel</InlineCode>, and{" "}
            <InlineCode>DropdownMenuSeparator</InlineCode> to organize items.
          </>
        }
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
        description="Disabled items are non-interactive with muted styling."
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

/* ----------------------------------------------------------------
 * Page
 * ---------------------------------------------------------------- */

type Tab = "overview" | "props"

export default function DropdownMenuPage() {
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
            DropdownMenu
          </h1>
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            An action menu triggered by a button or control. Built on Radix UI
            DropdownMenu with full keyboard navigation, focus management, and
            ARIA attributes. Supports icons, shortcuts, destructive variants,
            groups, labels, and separators.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add @lyse/dropdown-menu")
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
              code={
                <>
                  <span style={{ color: "var(--root-color-brand-300)" }}>import</span>
                  {" { "}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    DropdownMenu, DropdownMenuTrigger,{"\n"}
                    {"  "}DropdownMenuContent, DropdownMenuItem
                  </span>
                  {" } "}
                  <span style={{ color: "var(--root-color-brand-300)" }}>from</span>{" "}
                  <span style={{ color: "var(--root-color-warning-400)" }}>
                    {`'@/components/ui/dropdown-menu'`}
                  </span>
                  {"\n\n"}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"<"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>DropdownMenu</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"\n  "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"<"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>DropdownMenuTrigger</span>
                  {" "}
                  <span style={{ color: "var(--root-color-brand-300)" }}>asChild</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"\n    "}
                  {"..."}
                  {"\n  "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"</"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>DropdownMenuTrigger</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"\n  "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"<"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>DropdownMenuContent</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"\n    "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"<"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>DropdownMenuItem</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"Profile"}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"</"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>DropdownMenuItem</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"\n  "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"</"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>DropdownMenuContent</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"\n"}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"</"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>DropdownMenu</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
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
              extendsType="DropdownMenuPrimitive.ItemProps"
            />
          )}
        </div>
      </main>

      <TableOfContents sections={tab === "overview" ? overviewSections : []} />
    </>
  )
}
