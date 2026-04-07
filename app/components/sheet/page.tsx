"use client"

import { useState } from "react"
import { toast } from "@/registry/new-york/ui/toast/toast"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetBody,
  SheetFooter,
  SheetClose,
} from "@/registry/new-york/ui/sheet/sheet"
import {
  Input,
  InputField,
  InputLabel,
} from "@/registry/new-york/ui/input/input"
import {
  Textarea,
  TextareaField,
  TextareaLabel,
} from "@/registry/new-york/ui/textarea/textarea"
import { Button } from "@/registry/new-york/ui/button/button"
import { Toggle } from "@/registry/new-york/ui/toggle/toggle"
import { Copy, ExternalLink, User } from "lucide-react"
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
  { id: "sides", label: "Sides" },
  { id: "sizes", label: "Sizes" },
  { id: "with-form", label: "With Form" },
  { id: "controlled", label: "Controlled" },
]

const dosDontsItems: DosDontsItem[] = [
  {
    do: {
      preview: (
        <div className="flex flex-col gap-[var(--layout-gap-xs)] w-full max-w-[200px]">
          <div className="flex items-center justify-between">
            <div className="h-4 rounded" style={{ background: "var(--background-neutral-moderate-default)", width: "60%" }} />
            <div className="size-5 rounded" style={{ background: "var(--background-neutral-faint-default)", border: "var(--layout-border-thin) solid var(--border-default)" }} />
          </div>
          <div className="h-px" style={{ background: "var(--border-default)" }} />
          <div className="flex-1 flex flex-col gap-[var(--layout-gap-xs)]">
            <div className="h-3 rounded" style={{ background: "var(--background-neutral-moderate-default)", width: "80%" }} />
            <div className="h-3 rounded" style={{ background: "var(--background-neutral-moderate-default)", width: "65%" }} />
          </div>
        </div>
      ),
      description:
        "Use SheetHeader with SheetClose for a consistent header bar with built-in dismiss.",
    },
    dont: {
      preview: (
        <div className="flex flex-col gap-[var(--layout-gap-xs)] w-full max-w-[200px]">
          <div className="h-4 rounded" style={{ background: "var(--background-neutral-moderate-default)", width: "60%" }} />
          <div className="flex-1 flex flex-col gap-[var(--layout-gap-xs)]">
            <div className="h-3 rounded" style={{ background: "var(--background-neutral-moderate-default)", width: "80%" }} />
            <div className="h-3 rounded" style={{ background: "var(--background-neutral-moderate-default)", width: "65%" }} />
          </div>
        </div>
      ),
      description:
        "Don't omit SheetClose — users need a visible way to dismiss besides clicking outside.",
    },
  },
  {
    do: {
      preview: (
        <div className="flex flex-col gap-[var(--layout-gap-xs)] w-full max-w-[200px]">
          <div className="h-4 rounded" style={{ background: "var(--background-neutral-moderate-default)", width: "50%" }} />
          <div className="h-px" style={{ background: "var(--border-default)" }} />
          <div className="flex-1 flex flex-col gap-[var(--layout-gap-xs)]">
            <div className="h-8 rounded" style={{ background: "var(--background-neutral-faint-default)", border: "var(--layout-border-thin) solid var(--border-default)" }} />
            <div className="h-8 rounded" style={{ background: "var(--background-neutral-faint-default)", border: "var(--layout-border-thin) solid var(--border-default)" }} />
          </div>
          <div className="h-px" style={{ background: "var(--border-default)" }} />
          <div className="flex justify-end gap-[var(--layout-gap-xs)]">
            <Button variant="secondary" size="xs">Cancel</Button>
            <Button size="xs">Save</Button>
          </div>
        </div>
      ),
      description:
        "Use SheetBody for scrollable content between header and footer.",
    },
    dont: {
      preview: (
        <div className="flex flex-col gap-[var(--layout-gap-xs)] w-full max-w-[200px]">
          <div className="h-4 rounded" style={{ background: "var(--background-neutral-moderate-default)", width: "50%" }} />
          <div className="h-8 rounded" style={{ background: "var(--background-neutral-faint-default)", border: "var(--layout-border-thin) solid var(--border-default)" }} />
          <div className="h-8 rounded" style={{ background: "var(--background-neutral-faint-default)", border: "var(--layout-border-thin) solid var(--border-default)" }} />
          <div className="h-8 rounded" style={{ background: "var(--background-neutral-faint-default)", border: "var(--layout-border-thin) solid var(--border-default)" }} />
          <div className="h-8 rounded" style={{ background: "var(--background-neutral-faint-default)", border: "var(--layout-border-thin) solid var(--border-default)" }} />
        </div>
      ),
      description:
        "Don't place scrollable content directly in SheetContent — use SheetBody for proper overflow handling.",
    },
  },
  {
    do: {
      preview: (
        <div className="flex items-center gap-[var(--layout-gap-sm)]">
          <SheetClose asChild>
            <Button variant="secondary" size="sm">Cancel</Button>
          </SheetClose>
          <Button size="sm">Save changes</Button>
        </div>
      ),
      description:
        "Use SheetClose asChild on Cancel buttons for automatic dismiss.",
    },
    dont: {
      preview: (
        <div className="flex items-center gap-[var(--layout-gap-sm)]">
          <Button variant="secondary" size="sm">Cancel</Button>
          <Button size="sm">Save changes</Button>
        </div>
      ),
      description:
        "Don't add manual onClick={() => setOpen(false)} when SheetClose handles it.",
    },
  },
  {
    do: {
      preview: (
        <div className="flex flex-col gap-[var(--layout-gap-xs)]">
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>Update your display name and bio.</SheetDescription>
        </div>
      ),
      description:
        "Use SheetTitle + SheetDescription for accessible labeling (provides aria-labelledby).",
    },
    dont: {
      preview: (
        <div className="flex flex-col gap-[var(--layout-gap-xs)]">
          <p className="text-content-body font-accent" style={{ color: "var(--text-base-strong)" }}>Edit profile</p>
          <p className="text-content-caption" style={{ color: "var(--text-base-moderate)" }}>Update your display name and bio.</p>
        </div>
      ),
      description:
        "Don't use plain elements for the title — screen readers won't announce the dialog label.",
    },
  },
]

const contentPropDefs: PropDef[] = [
  {
    name: "side",
    type: ["right", "left", "top", "bottom"],
    default: "right",
    description: "Edge the sheet slides in from.",
  },
  {
    name: "size",
    type: ["sm", "md", "lg", "full"],
    default: "md",
    description: "Panel width (right/left) or height (top/bottom): 20rem / 26.25rem / 33.75rem / 100vw.",
  },
  {
    name: "onInteractOutside",
    type: ["(e: Event) => void"],
    description:
      "Callback on outside click. Call e.preventDefault() to block dismiss.",
  },
  {
    name: "className",
    type: ["string"],
    description: "Additional class names merged via cn().",
  },
]

const titlePropDefs: PropDef[] = [
  {
    name: "className",
    type: ["string"],
    description:
      'Override classes. Default: text-content-body font-accent.',
  },
  {
    name: "children",
    type: ["ReactNode"],
    required: true,
    description: "Title text. Provides aria-labelledby for the dialog.",
  },
]

const closePropDefs: PropDef[] = [
  {
    name: "children",
    type: ["ReactNode"],
    description: "Custom close element. Renders default X icon if omitted.",
  },
  {
    name: "className",
    type: ["string"],
    description: "Additional class names merged via cn().",
  },
]

const importCode = `import {
  Sheet, SheetTrigger,
  SheetContent, SheetHeader,
  SheetTitle, SheetDescription,
  SheetBody, SheetFooter, SheetClose
} from '@/components/ui/sheet'

<Sheet>
  <SheetTrigger asChild>
    <Button variant="secondary">Open sheet</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Title</SheetTitle>
      <SheetClose />
    </SheetHeader>
    <SheetBody>...content</SheetBody>
    <SheetFooter>...actions</SheetFooter>
  </SheetContent>
</Sheet>`

/* ----------------------------------------------------------------
 * Tabs
 * ---------------------------------------------------------------- */

function OverviewTab() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-12">
      <ComponentPreview
        id="default"
        title="Default"
        description="Settings panel with toggles and a select in the body."
      >
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="secondary" size="sm">Open sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <div className="flex flex-1 flex-col gap-[var(--layout-gap-sm)]">
                <SheetTitle>Settings</SheetTitle>
                <SheetDescription>Manage your workspace preferences.</SheetDescription>
              </div>
              <SheetClose />
            </SheetHeader>
            <SheetBody>
              <div className="flex flex-col gap-[var(--layout-gap-xl)]">
                <Toggle
                  size="sm"
                  className="flex-row-reverse justify-between"
                  label="Email notifications"
                  description="Receive a daily digest of activity."
                  defaultChecked
                />
                <Toggle
                  size="sm"
                  className="flex-row-reverse justify-between"
                  label="Push notifications"
                  description="Get notified in real-time on your device."
                />
                <Toggle
                  size="sm"
                  className="flex-row-reverse justify-between"
                  label="Marketing emails"
                  description="Product updates and announcements."
                  defaultChecked
                />

              </div>
            </SheetBody>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="secondary" size="sm">Cancel</Button>
              </SheetClose>
              <Button size="sm">Save changes</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </ComponentPreview>

      <ComponentPreview
        id="sides"
        title="Sides"
        description="Sheet can slide in from any edge: right, left, top, or bottom."
      >
        <div className="flex flex-wrap gap-3">
          {(["right", "left", "top", "bottom"] as const).map((side) => (
            <Sheet key={side}>
              <SheetTrigger asChild>
                <Button variant="secondary" size="sm" className="capitalize">
                  {side}
                </Button>
              </SheetTrigger>
              <SheetContent side={side} aria-describedby={undefined}>
                <SheetHeader>
                  <SheetTitle className="capitalize">{side} sheet</SheetTitle>
                  <SheetClose />
                </SheetHeader>
                <SheetBody>
                  <p className="text-content-note" style={{ color: "var(--text-base-moderate)" }}>
                    This sheet slides in from the {side}.
                  </p>
                </SheetBody>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="sizes"
        title="Sizes"
        description="Control panel width (right/left) or height (top/bottom): sm, md, lg, full."
      >
        <div className="flex flex-wrap gap-3">
          {(["sm", "md", "lg", "full"] as const).map((size) => (
            <Sheet key={size}>
              <SheetTrigger asChild>
                <Button variant="secondary" size="sm">
                  {size}
                </Button>
              </SheetTrigger>
              <SheetContent size={size} aria-describedby={undefined}>
                <SheetHeader>
                  <SheetTitle>Size: {size}</SheetTitle>
                  <SheetClose />
                </SheetHeader>
                <SheetBody>
                  <p className="text-content-note" style={{ color: "var(--text-base-moderate)" }}>
                    This sheet uses size=&quot;{size}&quot;.
                  </p>
                </SheetBody>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="with-form"
        title="With Form"
        description="Sheet with form inputs in the body and action buttons in the footer."
      >
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="secondary" size="sm">
              <User className="size-[var(--layout-size-xs)]" /> Edit profile
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <div className="flex flex-1 flex-col gap-[var(--layout-gap-sm)]">
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>Update your display name and bio.</SheetDescription>
              </div>
              <SheetClose />
            </SheetHeader>
            <SheetBody>
              <div className="flex flex-col gap-[var(--layout-gap-lg)]">
                <InputField>
                  <InputLabel>Display name</InputLabel>
                  <Input size="sm" defaultValue="Maxime" />
                </InputField>
                <TextareaField>
                  <TextareaLabel>Bio</TextareaLabel>
                  <Textarea size="sm" placeholder="Tell us about yourself..." />
                </TextareaField>
              </div>
            </SheetBody>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="secondary" size="sm">Cancel</Button>
              </SheetClose>
              <Button size="sm">Save changes</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </ComponentPreview>

      <ComponentPreview
        id="controlled"
        title="Controlled"
        description="Open and close the sheet programmatically."
      >
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setOpen(true)}
          >
            Open controlled sheet
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent aria-describedby={undefined}>
              <SheetHeader>
                <SheetTitle>Controlled sheet</SheetTitle>
                <SheetClose />
              </SheetHeader>
              <SheetBody>
                <p className="text-content-note" style={{ color: "var(--text-base-moderate)" }}>
                  This sheet is controlled via open / onOpenChange props.
                </p>
              </SheetBody>
              <SheetFooter>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setOpen(false)}
                >
                  Done
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
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

export default function SheetPage() {
  const [tab, setTab] = useState<Tab>("overview")

  return (
    <>
      <main className="flex-1 min-w-0 py-16 flex flex-col gap-10 max-w-none px-5 sm:px-8 lg:px-16 xl:px-20">
        {/* Hero */}
        <div className="flex flex-col gap-3">
          <h1
            className="font-bold"
            style={{ color: "var(--text-base-strong)", fontSize: "var(--root-font-size-5xl)" }}
          >
            Sheet
          </h1>
          <p
            className="text-content-highlight"
            style={{ color: "var(--text-base-bolder)" }}
          >
            A sliding side panel that slides in from any screen edge. Use it for
            secondary navigation, forms, settings, or detail views that don&apos;t
            require a full page transition.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add https://ui.getlyse.com/r/sheet.json")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <><Copy className="size-[var(--layout-size-xs)]" /> Copy install command</>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a
                href="https://v0.app/chat?q=add%20component%20from%20https%3A%2F%2Fui.getlyse.com%2Fr%2Fsheet.json"
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
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="secondary" size="sm">
                      Open sheet
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <div className="flex flex-1 flex-col gap-[var(--layout-gap-sm)]">
                        <SheetTitle>Settings</SheetTitle>
                        <SheetDescription>Manage your workspace preferences.</SheetDescription>
                      </div>
                      <SheetClose />
                    </SheetHeader>
                    <SheetBody>
                      <p className="text-content-note" style={{ color: "var(--text-base-moderate)" }}>
                        Your scrollable content goes here.
                      </p>
                    </SheetBody>
                    <SheetFooter>
                      <SheetClose asChild>
                        <Button variant="secondary" size="sm">Cancel</Button>
                      </SheetClose>
                      <Button size="sm">Save changes</Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              }
              codeString={importCode}
              language="tsx"
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
                  SheetContent
                </h3>
                <PropsTable
                  propDefs={contentPropDefs}
                  extendsType="Radix Dialog.ContentProps"
                />
              </div>
              <div>
                <h3
                  className="text-heading-small mb-4"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  SheetTitle
                </h3>
                <PropsTable
                  propDefs={titlePropDefs}
                  extendsType="Radix Dialog.TitleProps"
                />
              </div>
              <div>
                <h3
                  className="text-heading-small mb-4"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  SheetClose
                </h3>
                <PropsTable
                  propDefs={closePropDefs}
                  extendsType="Radix Dialog.CloseProps"
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
            : []
        }
      />
    </>
  )
}
