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

/* ----------------------------------------------------------------
 * Page
 * ---------------------------------------------------------------- */

type Tab = "overview" | "props"

export default function ToastPage() {
  const [tab, setTab] = useState<Tab>("overview")

  return (
    <>
      <Toaster />
      <main
        className="flex-1 min-w-0 py-16 flex flex-col gap-10 max-w-none"
        style={{ paddingLeft: "80px", paddingRight: "80px" }}
      >
        {/* Hero */}
        <div className="flex flex-col gap-3">
          <h1
            className="text-heading-large"
            style={{ color: "var(--text-base-strong)" }}
          >
            Toast
          </h1>
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            A lightweight, temporary notification that provides real-time
            feedback, alerts, or status updates without disrupting workflow.
            Supports four color variants with auto-selected icons, a dismiss
            button, and a stacking overlay animation.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                navigator.clipboard.writeText(
                  "npx shadcn@latest add @lyse/toast"
                )
              }
            >
              <Copy /> Copy install command
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
                className="text-content-note font-accent px-4 py-2 -mb-px transition-colors cursor-pointer"
                style={{
                  color:
                    tab === t.key
                      ? "var(--text-base-strong)"
                      : "var(--text-base-moderate)",
                  borderBottom:
                    tab === t.key
                      ? "2px solid var(--text-base-strong)"
                      : "2px solid transparent",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Code example */}
          <CodeBlock
            preview={
              <Toast variant="success" onClose={() => {}}>
                Saved
              </Toast>
            }
            code={
              <>
                <span style={{ color: "#c084fc" }}>import</span>
                {" { "}
                <span
                  style={{ color: "var(--root-color-success-400)" }}
                >
                  toast
                </span>
                {", "}
                <span
                  style={{ color: "var(--root-color-success-400)" }}
                >
                  Toaster
                </span>
                {" } "}
                <span style={{ color: "#c084fc" }}>from</span>{" "}
                <span
                  style={{ color: "var(--root-color-warning-400)" }}
                >{`'@/components/ui/toast'`}</span>
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
                </span>
                {" (\n    <>\n      <"}
                <span
                  style={{ color: "var(--root-color-success-400)" }}
                >
                  Toaster
                </span>
                {" />\n      <"}
                <span
                  style={{ color: "var(--root-color-success-400)" }}
                >
                  button
                </span>
                {" "}
                <span
                  style={{ color: "var(--root-color-brand-400)" }}
                >
                  onClick
                </span>
                {"={() => "}
                <span
                  style={{ color: "var(--root-color-success-400)" }}
                >
                  toast
                </span>
                {".success("}
                <span
                  style={{ color: "var(--root-color-warning-400)" }}
                >
                  {`'Saved!'`}
                </span>
                {")}>\n        Save\n      </"}
                <span
                  style={{ color: "var(--root-color-success-400)" }}
                >
                  button
                </span>
                {">\n    </>\n  )\n}"}
              </>
            }
          />

          {/* Tab content */}
          {tab === "overview" ? (
            <OverviewTab />
          ) : (
            <PropsTable
              propDefs={propDefs}
              extendsType={`React.ComponentProps<"div">`}
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
