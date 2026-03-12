"use client"

import { useState } from "react"
import { Rocket } from "lucide-react"
import { Copy, ExternalLink } from "lucide-react"
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/registry/new-york/ui/alert/alert"
import { toast } from "@/registry/new-york/ui/toast/toast"
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
  { id: "with-action", label: "With Action" },
  { id: "dismissible", label: "Dismissible" },
  { id: "custom-icon", label: "Custom Icon" },
  { id: "no-icon", label: "Without Icon" },
  { id: "title-only", label: "Title Only" },
]

const bestPracticesSections: TocSection[] = [
  { id: "dos-donts", label: "Do's and Don'ts" },
]

const dosDontsItems: DosDontsItem[] = [
  {
    do: {
      preview: (
        <Alert variant="danger">
          <AlertTitle>Could not save changes</AlertTitle>
          <AlertDescription>
            Fix the following errors before submitting.
          </AlertDescription>
        </Alert>
      ),
      description:
        "Use danger for errors that block the user's task.",
    },
    dont: {
      preview: (
        <Alert variant="danger">
          <AlertTitle>Heads up</AlertTitle>
          <AlertDescription>
            Your settings have been updated.
          </AlertDescription>
        </Alert>
      ),
      description:
        "Don't use danger for soft warnings — use warning instead.",
    },
  },
  {
    do: {
      preview: (
        <Alert variant="brand" onDismiss={() => {}}>
          <AlertTitle>New features available</AlertTitle>
          <AlertDescription>
            Check the changelog for the latest updates.
          </AlertDescription>
        </Alert>
      ),
      description:
        "Use onDismiss only for non-critical notices the user can safely ignore.",
    },
    dont: {
      preview: (
        <Alert variant="danger" onDismiss={() => {}}>
          <AlertTitle>Connection lost</AlertTitle>
          <AlertDescription>
            Changes will not be saved until reconnected.
          </AlertDescription>
        </Alert>
      ),
      description:
        "Don't make a danger alert dismissible without resolving the underlying error.",
    },
  },
  {
    do: {
      preview: (
        <Alert variant="success">
          <AlertTitle>Email verified</AlertTitle>
          <AlertDescription>
            Your account is now active.
          </AlertDescription>
        </Alert>
      ),
      description:
        "Keep AlertTitle to one line and AlertDescription to 1-2 sentences.",
    },
    dont: {
      preview: (
        <Alert variant="warning">
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            Your trial expires in 3 days. Please note that after expiration all
            data will be archived and you will need to contact support to recover
            it. Make sure to export any important files before the deadline. Also
            consider upgrading your plan to maintain full access to all features.
          </AlertDescription>
        </Alert>
      ),
      description:
        "Don't write multi-paragraph content — use a dedicated section or modal.",
    },
  },
  {
    do: {
      preview: (
        <Alert variant="warning">
          <AlertTitle>Approaching storage limit</AlertTitle>
          <AlertDescription>
            You have used 90% of your allocated storage.
          </AlertDescription>
        </Alert>
      ),
      description:
        "Use the auto icon — it reinforces variant meaning for colorblind users.",
    },
    dont: {
      preview: (
        <Alert variant="warning" icon={null}>
          <AlertTitle>Approaching storage limit</AlertTitle>
          <AlertDescription>
            You have used 90% of your allocated storage.
          </AlertDescription>
        </Alert>
      ),
      description:
        "Don't remove icons from warning/danger variants — they aid recognition.",
    },
  },
  {
    do: {
      preview: (
        <Alert
          variant="warning"
          action={<Button variant="secondary" size="sm">Upgrade</Button>}
        >
          <AlertTitle>Trial ends in 3 days</AlertTitle>
          <AlertDescription>
            Upgrade to keep access to all features.
          </AlertDescription>
        </Alert>
      ),
      description:
        "Keep action labels short — one or two words that describe the action.",
    },
    dont: {
      preview: (
        <Alert
          variant="warning"
          action={<Button variant="secondary" size="sm">Click here to upgrade your plan now</Button>}
        >
          <AlertTitle>Trial ends in 3 days</AlertTitle>
          <AlertDescription>
            Upgrade to keep access to all features.
          </AlertDescription>
        </Alert>
      ),
      description:
        "Don't use long button labels — they compete with the alert message.",
    },
  },
]

const alertPropDefs: PropDef[] = [
  {
    name: "variant",
    type: ["brand", "success", "warning", "danger"],
    default: "brand",
    description: "Color scheme and auto icon selection.",
  },
  {
    name: "icon",
    type: ["React.ReactNode", "null"],
    default: "auto",
    description:
      "Override the auto icon. Pass null to suppress it entirely.",
  },
  {
    name: "action",
    type: ["React.ReactNode"],
    description:
      "Action element (e.g. Button) rendered inside the alert.",
  },
  {
    name: "actionPlacement",
    type: ["bottom", "right"],
    default: "bottom",
    description:
      "Where the action renders: below the text or to the right.",
  },
  {
    name: "onDismiss",
    type: ["() => void"],
    description:
      "Renders a dismiss button when provided. Caller controls visibility.",
  },
  {
    name: "children",
    type: ["React.ReactNode"],
    description: "AlertTitle, AlertDescription, or custom content.",
  },
  {
    name: "className",
    type: ["string"],
    description: "Additional class names merged via cn().",
  },
]

const alertTitlePropDefs: PropDef[] = [
  {
    name: "children",
    type: ["React.ReactNode"],
    description: "Title text.",
  },
  {
    name: "className",
    type: ["string"],
    description: "Additional CSS classes.",
  },
]

const alertDescriptionPropDefs: PropDef[] = [
  {
    name: "children",
    type: ["React.ReactNode"],
    description: "Description text.",
  },
  {
    name: "className",
    type: ["string"],
    description: "Additional CSS classes.",
  },
]

const importCode = `import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

export default function Example() {
  return (
    <Alert variant="brand">
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>
        This workspace is in read-only mode.
      </AlertDescription>
    </Alert>
  )
}`

/* ----------------------------------------------------------------
 * Tabs
 * ---------------------------------------------------------------- */

function OverviewTab() {
  const [showDismissible, setShowDismissible] = useState(true)

  return (
    <div className="flex flex-col gap-12">
      <ComponentPreview
        id="variants"
        title="Variants"
        description="Each variant has its own background, left accent border, and auto icon."
      >
        <div className="w-full flex flex-col gap-4">
          <Alert variant="brand">
            <AlertTitle>Info</AlertTitle>
            <AlertDescription>
              Informational message with brand styling.
            </AlertDescription>
          </Alert>
          <Alert variant="success">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Your changes have been saved successfully.
            </AlertDescription>
          </Alert>
          <Alert variant="warning">
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              You are approaching your storage limit.
            </AlertDescription>
          </Alert>
          <Alert variant="danger">
            <AlertTitle>Danger</AlertTitle>
            <AlertDescription>
              Your session has expired. Please sign in again.
            </AlertDescription>
          </Alert>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="with-action"
        title="With Action"
        description="Pass an action prop to render a button. Use actionPlacement to control layout."
      >
        <div className="w-full flex flex-col gap-4">
          <Alert
            variant="warning"
            action={<Button variant="secondary" size="sm">Upgrade</Button>}
          >
            <AlertTitle>Trial ends in 3 days</AlertTitle>
            <AlertDescription>
              Upgrade to keep access to all features.
            </AlertDescription>
          </Alert>
          <Alert
            variant="brand"
            actionPlacement="right"
            action={<Button variant="secondary" size="sm">View</Button>}
          >
            <AlertTitle>New features available</AlertTitle>
            <AlertDescription>
              Check the changelog for the latest updates.
            </AlertDescription>
          </Alert>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="dismissible"
        title="Dismissible"
        description="Pass onDismiss to render a close button. The caller controls visibility."
      >
        <div className="w-full">
          {showDismissible ? (
            <Alert variant="brand" onDismiss={() => setShowDismissible(false)}>
              <AlertTitle>New features available</AlertTitle>
              <AlertDescription>
                Check the changelog for the latest updates.
              </AlertDescription>
            </Alert>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowDismissible(true)}
            >
              Show alert again
            </Button>
          )}
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="custom-icon"
        title="Custom Icon"
        description="Override the auto icon with any ReactNode."
      >
        <div className="w-full">
          <Alert variant="brand" icon={<Rocket className="size-4" />}>
            <AlertTitle>Deployment started</AlertTitle>
            <AlertDescription>
              Your app is being built and deployed.
            </AlertDescription>
          </Alert>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="no-icon"
        title="Without Icon"
        description="Pass icon={null} to suppress the icon entirely."
      >
        <div className="w-full flex flex-col gap-4">
          <Alert variant="success" icon={null}>
            <AlertTitle>All changes saved</AlertTitle>
            <AlertDescription>
              Your document has been updated.
            </AlertDescription>
          </Alert>
          <Alert variant="warning" icon={null}>
            <AlertTitle>Maintenance scheduled</AlertTitle>
            <AlertDescription>
              Expected downtime tonight at 11 PM.
            </AlertDescription>
          </Alert>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="title-only"
        title="Title Only"
        description="AlertDescription is optional — the alert works with just a title."
      >
        <div className="w-full flex flex-col gap-4">
          <Alert variant="success">
            <AlertTitle>Email verified</AlertTitle>
          </Alert>
          <Alert variant="brand">
            <AlertTitle>Two-factor authentication is not enabled</AlertTitle>
          </Alert>
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

export default function AlertPage() {
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
            Alert
          </h1>
          <p
            className="text-content-highlight"
            style={{ color: "var(--text-base-bolder)" }}
          >
            A compound banner that communicates contextual feedback — brand,
            success, warning, or danger — with icon, title, description, and
            optional dismiss.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add https://ui.getlyse.com/r/alert.json")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <><Copy /> Copy install command</>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a
                href="https://v0.app/chat?q=add%20component%20from%20https%3A%2F%2Fui.getlyse.com%2Fr%2Falert.json"
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
                <Alert variant="brand" className="max-w-[25rem]">
                  <AlertTitle>Heads up</AlertTitle>
                  <AlertDescription>
                    This workspace is in read-only mode.
                  </AlertDescription>
                </Alert>
              }
              codeString={importCode}
              language="tsx"
            />
          )}

          {/* Tab content */}
          {tab === "overview" ? (
            <OverviewTab />
          ) : tab === "props" ? (
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                <h2
                  className="text-heading-small font-accent"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  Alert
                </h2>
                <PropsTable
                  propDefs={alertPropDefs}
                  extendsType="React.ComponentProps<'div'>"
                />
              </div>
              <div className="flex flex-col gap-4">
                <h2
                  className="text-heading-small font-accent"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  AlertTitle
                </h2>
                <PropsTable
                  propDefs={alertTitlePropDefs}
                  extendsType="React.ComponentProps<'p'>"
                />
              </div>
              <div className="flex flex-col gap-4">
                <h2
                  className="text-heading-small font-accent"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  AlertDescription
                </h2>
                <PropsTable
                  propDefs={alertDescriptionPropDefs}
                  extendsType="React.ComponentProps<'p'>"
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
            : tab === "documentation"
              ? bestPracticesSections
              : []
        }
      />
    </>
  )
}
