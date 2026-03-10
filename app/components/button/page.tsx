"use client"

import { useState } from "react"
import { Button } from "@/registry/new-york/ui/button/button"
import { toast } from "@/registry/new-york/ui/toast/toast"
import {
  Heart,
  Mail,
  Trash2,
  ArrowRight,
  Copy,
  ExternalLink,
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
  { id: "variants", label: "Variants" },
  { id: "sizes", label: "Sizes" },
  { id: "disabled", label: "Disabled" },
  { id: "with-icons", label: "With Icons" },
]

const dosDontsItems: DosDontsItem[] = [
  {
    do: {
      preview: <Button>Save changes</Button>,
      description:
        'Use variant="primary" for the single most important action on a page.',
    },
    dont: {
      preview: (
        <div className="flex items-center gap-[var(--layout-gap-sm)]">
          <Button>Save</Button>
          <Button>Cancel</Button>
        </div>
      ),
      description:
        "Don't place two primary buttons side-by-side — one action should lead.",
    },
  },
  {
    do: {
      preview: <Button variant="destructive"><Trash2 /> Delete</Button>,
      description:
        'Use variant="destructive" for irreversible actions like deletion.',
    },
    dont: {
      preview: <Button variant="destructive">Attention needed</Button>,
      description:
        "Don't use destructive for warning-only actions that don't permanently destroy data.",
    },
  },
  {
    do: {
      preview: (
        <Button isIconOnly size="md" aria-label="Add item">
          <Heart />
        </Button>
      ),
      description:
        'Use isIconOnly + aria-label for icon-only buttons.',
    },
    dont: {
      preview: (
        <Button isIconOnly size="md">
          <Heart />
        </Button>
      ),
      description:
        "Don't omit aria-label on icon-only buttons — screen readers will have no label.",
    },
  },
  {
    do: {
      preview: (
        <div className="flex items-center gap-[var(--layout-gap-sm)]">
          <Button>Save</Button>
          <Button variant="secondary">Cancel</Button>
        </div>
      ),
      description:
        'Keep button labels short and action-oriented ("Save", "Delete", "Add member").',
    },
    dont: {
      preview: (
        <div className="flex items-center gap-[var(--layout-gap-sm)]">
          <Button>Click here</Button>
          <Button variant="secondary">Submit</Button>
        </div>
      ),
      description:
        'Don\'t use vague labels like "Click here" or "Submit" with no context.',
    },
  },
]

const propDefs: PropDef[] = [
  {
    name: "variant",
    type: ["primary", "secondary", "terciary", "destructive"],
    default: "primary",
    description: "Visual style of the button.",
  },
  {
    name: "size",
    type: ["xs", "sm", "md", "lg"],
    default: "md",
    description: "Height, padding, font size, and icon size.",
  },
  {
    name: "isIconOnly",
    type: ["boolean"],
    default: "false",
    description: "Square button sized to the current size.",
  },
  {
    name: "asChild",
    type: ["boolean"],
    default: "false",
    description:
      "Merges props onto the child element instead of a <button>.",
  },
  {
    name: "disabled",
    type: ["boolean"],
    default: "false",
    description: "Disables interactions and applies muted styling.",
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
    description: "Button content — text, icons, or both.",
  },
  {
    name: "onClick",
    type: ["(e: MouseEvent) => void"],
    description: "Click event handler.",
  },
  {
    name: "type",
    type: ["button", "submit", "reset"],
    description: "HTML button type attribute.",
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
        description="Primary for main actions, secondary for alternatives, terciary for ghost actions, and destructive for dangerous operations."
      >
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="terciary">Terciary</Button>
        <Button variant="destructive">Destructive</Button>
      </ComponentPreview>

      <ComponentPreview
        id="sizes"
        title="Sizes"
        description="Four sizes from xs to lg. Each adjusts height, padding, font size, and icon size."
      >
        <Button size="xs">Extra Small</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </ComponentPreview>

      <ComponentPreview
        id="disabled"
        title="Disabled"
        description="Prevents interactions with muted styling and blocked pointer events."
      >
        <Button disabled>Primary</Button>
        <Button variant="secondary" disabled>
          Secondary
        </Button>
        <Button variant="terciary" disabled>
          Terciary
        </Button>
        <Button variant="destructive" disabled>
          Destructive
        </Button>
      </ComponentPreview>

      <ComponentPreview
        id="with-icons"
        title="With Icons"
        description="Place icons before or after the label. Icons scale automatically based on the button size. Use any icon library compatible with React."
      >
        <Button>
          <Mail /> Send Email
        </Button>
        <Button variant="secondary">
          Continue <ArrowRight />
        </Button>
        <Button variant="destructive">
          <Trash2 /> Delete
        </Button>
        <Button variant="terciary">
          <Heart /> Like
        </Button>
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

const importCode = `import { Button } from '@/components/ui/button'

export default function Example() {
  return <Button>Button</Button>
}`

type Tab = "overview" | "props" | "documentation"

export default function ButtonPage() {
  const [tab, setTab] = useState<Tab>("overview")

  return (
    <>
      <main
        className="flex-1 min-w-0 py-16 flex flex-col gap-10 max-w-none px-8 lg:px-16 xl:px-20"
      >
        {/* Hero */}
        <div className="flex flex-col gap-3">
          <h1
            className="font-bold"
            style={{ color: "var(--text-base-strong)", fontSize: "var(--root-font-size-5xl)" }}
          >
            Button
          </h1>
          <p
            className="text-content-highlight"
            style={{ color: "var(--text-base-bolder)" }}
          >
            The Button component is an interactive element used to trigger
            actions or events. It provides a consistent and accessible way for
            users to interact with the interface, featuring customizable styles
            and states.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add https://ui.getlyse.com/r/button.json")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <><Copy /> Copy install command</>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a
                href="https://v0.app/chat?q=add%20component%20from%20https%3A%2F%2Fui.getlyse.com%2Fr%2Fbutton.json"
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
              preview={<Button>Button</Button>}
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
