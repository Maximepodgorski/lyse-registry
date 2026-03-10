"use client"

import { useState } from "react"
import {
  Toast,
  Toaster,
  toast,
} from "@/registry/new-york/ui/toast/toast"
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
  { id: "variants", label: "Variants" },
  { id: "stacking", label: "Stacking" },
]

const dosDontsItems: DosDontsItem[] = [
  {
    do: {
      preview: (
        <Toast variant="success" onClose={() => {}}>
          Changes saved
        </Toast>
      ),
      description:
        "Use toast.success / toast.danger shorthands \u2014 they are explicit and readable.",
    },
    dont: {
      preview: (
        <Toast variant="success" onClose={() => {}}>
          Changes saved
        </Toast>
      ),
      description:
        'Don\'t use toast("text", { variant: "success" }) when the shorthand exists.',
    },
  },
  {
    do: {
      preview: (
        <Toast variant="success" onClose={() => {}}>
          Copied to clipboard
        </Toast>
      ),
      description:
        "Keep messages under ~60 characters \u2014 toasts are glanceable.",
    },
    dont: {
      preview: (
        <Toast variant="success" onClose={() => {}}>
          Your changes have been successfully saved to the database and synchronized across all devices
        </Toast>
      ),
      description:
        "Don't write multi-sentence explanations \u2014 truncation will occur.",
    },
  },
  {
    do: {
      preview: (
        <Toast variant="danger" onClose={() => {}}>
          Failed to save changes
        </Toast>
      ),
      description:
        "Use toast.danger for recoverable errors only.",
    },
    dont: {
      preview: (
        <div
          className="flex flex-col gap-2 rounded-lg px-4 py-3"
          style={{
            border: "var(--layout-border-thin) solid var(--border-default)",
            background: "var(--background-base-default)",
          }}
        >
          <span
            className="text-content-note font-accent"
            style={{ color: "var(--text-danger-strong)" }}
          >
            Critical: Account locked
          </span>
          <span
            className="text-content-caption"
            style={{ color: "var(--text-base-bolder)" }}
          >
            Verify your identity to continue.
          </span>
          <Button size="xs" variant="destructive">
            Verify now
          </Button>
        </div>
      ),
      description:
        "Don't show toast.danger for critical errors that require immediate user action \u2014 use a Dialog instead.",
    },
  },
  {
    do: {
      preview: (
        <div
          className="flex items-center gap-2 text-content-caption"
          style={{ color: "var(--text-base-bolder)" }}
        >
          <span>Layout:</span>
          <span style={{ color: "var(--text-base-strong)" }}>
            {'<Toaster />'}
          </span>
          <span>in root only</span>
        </div>
      ),
      description:
        "Render <Toaster /> once in the root layout.",
    },
    dont: {
      preview: (
        <div
          className="flex flex-col gap-1 text-content-caption"
          style={{ color: "var(--text-base-bolder)" }}
        >
          <span>
            Page A: <span style={{ color: "var(--text-danger-strong)" }}>{'<Toaster />'}</span>
          </span>
          <span>
            Page B: <span style={{ color: "var(--text-danger-strong)" }}>{'<Toaster />'}</span>
          </span>
          <span style={{ color: "var(--text-danger-strong)" }}>
            = duplicate stacks
          </span>
        </div>
      ),
      description:
        "Don't render <Toaster /> in multiple places \u2014 it will create duplicate stacks.",
    },
  },
]

const propDefs: PropDef[] = [
  {
    name: "variant",
    type: ["brand", "success", "danger", "warning"],
    default: "success",
    description: "Color variant — determines the icon and its color.",
  },
  {
    name: "onClose",
    type: ["() => void"],
    description: "If provided, renders a dismiss button.",
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
    description: "Toast message content.",
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
        description="Four variants with auto-selected icons: success (check), danger (alert), brand (info), and warning (triangle)."
      >
        <div className="flex flex-col gap-3">
          <Toast variant="success" onClose={() => {}}>
            Changes saved successfully
          </Toast>
          <Toast variant="danger" onClose={() => {}}>
            Failed to save changes
          </Toast>
          <Toast variant="brand" onClose={() => {}}>
            New update available
          </Toast>
          <Toast variant="warning" onClose={() => {}}>
            Storage is almost full
          </Toast>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="stacking"
        title="Stacking"
        description="Toasts stack with an overlay animation. Hover the stack to expand. Click buttons below to trigger toasts."
      >
        <div className="flex items-center flex-wrap gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => toast.success("Changes saved successfully")}
          >
            Success
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => toast.danger("Failed to save changes")}
          >
            Danger
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => toast.brand("New update available")}
          >
            Brand
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => toast.warning("Storage is almost full")}
          >
            Warning
          </Button>
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

const importCode = `import { toast, Toaster } from '@/components/ui/toast'

export default function Example() {
  return (
    <>
      <Toaster />
      <button onClick={() => toast.success('Saved!')}>
        Save
      </button>
    </>
  )
}`

type Tab = "overview" | "props" | "documentation"

export default function ToastPage() {
  const [tab, setTab] = useState<Tab>("overview")

  return (
    <>
      <Toaster />
      <main
        className="flex-1 min-w-0 py-16 flex flex-col gap-10 max-w-none px-8 lg:px-16 xl:px-20"
      >
        {/* Hero */}
        <div className="flex flex-col gap-3">
          <h1
            className="font-bold"
            style={{ color: "var(--text-base-strong)", fontSize: "var(--root-font-size-5xl)" }}
          >
            Toast
          </h1>
          <p
            className="text-content-highlight"
            style={{ color: "var(--text-base-bolder)" }}
          >
            The Toast component delivers brief, non-intrusive notifications
            in response to user actions. It provides real-time feedback without
            interrupting the current workflow, automatically dismissing after a
            set duration.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add https://ui.getlyse.com/r/toast.json")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <><Copy /> Copy install command</>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a
                href="https://v0.app/chat?q=add%20component%20from%20https%3A%2F%2Fui.getlyse.com%2Fr%2Ftoast.json"
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
                <Toast variant="success" onClose={() => {}}>
                  Saved
                </Toast>
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
              extendsType={`React.ComponentProps<"div">`}
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
