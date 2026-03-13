"use client"

import { useState } from "react"
import { ActionCard } from "@/registry/new-york/ui/action-card/action-card"
import { toast } from "@/registry/new-york/ui/toast/toast"
import { Toggle } from "@/registry/new-york/ui/toggle/toggle"
import { Copy, ExternalLink, Zap, Globe, Shield, Bell, Lock, Settings } from "lucide-react"
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

const importCode = `import { ActionCard } from '@/components/ui/action-card'

export default function Example() {
  return (
    <ActionCard
      icon={<Zap />}
      title="Integrations"
      description="Connect your tools."
      action={<Button size="sm">Connect</Button>}
    />
  )
}`

/* Brand logos (colored) */
function FigmaLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
      <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
      <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
      <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
      <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
    </svg>
  )
}

function SlackLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.34 34.13a5.67 5.67 0 1 1-5.67-5.67h5.67v5.67Zm2.84 0a5.67 5.67 0 1 1 11.34 0v14.18a5.67 5.67 0 1 1-11.34 0V34.13Z" fill="#E01E5A"/>
      <path d="M19.85 11.34a5.67 5.67 0 1 1 5.67-5.67v5.67h-5.67Zm0 2.84a5.67 5.67 0 1 1 0 11.34H5.67a5.67 5.67 0 1 1 0-11.34h14.18Z" fill="#36C5F0"/>
      <path d="M42.66 19.85a5.67 5.67 0 1 1 5.67 5.67h-5.67v-5.67Zm-2.84 0a5.67 5.67 0 1 1-11.34 0V5.67a5.67 5.67 0 1 1 11.34 0v14.18Z" fill="#2EB67D"/>
      <path d="M34.15 42.66a5.67 5.67 0 1 1-5.67 5.67v-5.67h5.67Zm0-2.84a5.67 5.67 0 1 1 0-11.34h14.18a5.67 5.67 0 1 1 0 11.34H34.15Z" fill="#ECB22E"/>
    </svg>
  )
}

const overviewSections: TocSection[] = [
  { id: "default", label: "Default" },
  { id: "with-logo", label: "With Logo" },
  { id: "with-toggle", label: "With Toggle" },
  { id: "with-label", label: "With Label" },
]

const dosDontsItems: DosDontsItem[] = [
  {
    do: {
      preview: (
        <div className="w-full max-w-sm">
          <ActionCard
            icon={<Zap className="size-5" />}
            title="Integrations"
            description="Connect your tools."
            action={<Button size="sm" variant="secondary">Connect</Button>}
          />
        </div>
      ),
      description:
        "Use the action slot for interactive elements (Button, Toggle).",
    },
    dont: {
      preview: (
        <div className="w-full max-w-sm">
          <ActionCard
            icon={<Zap className="size-5" />}
            title="Integrations"
            description="Connect your tools."
          />
        </div>
      ),
      description:
        "Don't hardcode a button inside the card with custom markup — use the action slot.",
    },
  },
  {
    do: {
      preview: (
        <div className="w-full max-w-sm">
          <ActionCard
            icon={<Shield className="size-5" />}
            title="Security"
            description="Enable two-factor auth."
            action={<Toggle size="sm" />}
          />
        </div>
      ),
      description:
        'Keep title short (1 line) and use description for supporting context.',
    },
    dont: {
      preview: (
        <div className="w-full max-w-sm">
          <ActionCard
            icon={<Shield className="size-5" />}
            title="Security settings and two-factor authentication configuration"
            description="Security settings and two-factor authentication configuration"
            action={<Toggle size="sm" />}
          />
        </div>
      ),
      description:
        "Don't use multi-paragraph titles or duplicate the title content in description.",
    },
  },
  {
    do: {
      preview: (
        <div className="w-full max-w-sm">
          <ActionCard
            icon={<Globe className="size-5" />}
            title="API access"
            description="Programmatic access to your workspace."
            action={<Button size="sm" variant="secondary">Configure</Button>}
          />
        </div>
      ),
      description:
        "Use logo for recognizable brand icons (integrations, features).",
    },
    dont: {
      preview: (
        <div className="w-full max-w-sm">
          <ActionCard
            icon={<img src="/logo.svg" alt="" className="size-5 opacity-30" />}
            title="Feature"
            description="Decorative illustration."
            action={<Button size="sm" variant="secondary">View</Button>}
          />
        </div>
      ),
      description:
        "Don't use logo for decorative illustrations — it's meant for compact brand marks.",
    },
  },
  {
    do: {
      preview: (
        <div className="w-full max-w-sm flex flex-col gap-3">
          <ActionCard
            icon={<Bell className="size-5" />}
            title="Notifications"
            description="Get notified on new activity."
            action={<Toggle size="sm" />}
          />
          <ActionCard
            icon={<Settings className="size-5" />}
            title="Preferences"
            description="Configure your workspace."
            action={<Button size="sm" variant="secondary">Edit</Button>}
          />
        </div>
      ),
      description:
        "Stack multiple ActionCards in a flex-col list.",
    },
    dont: {
      preview: (
        <div className="w-full max-w-sm">
          <ActionCard
            icon={<Bell className="size-5" />}
            title="Notifications"
            description={undefined}
            action={
              <ActionCard
                icon={<Settings className="size-5" />}
                title="Nested"
                description="Don't do this."
              />
            }
          />
        </div>
      ),
      description:
        "Don't nest ActionCards inside each other.",
    },
  },
]

const propDefs: PropDef[] = [
  {
    name: "title",
    type: ["string"],
    description: "Card title displayed in bold.",
  },
  {
    name: "description",
    type: ["string"],
    description: "Supporting text below the title.",
  },
  {
    name: "icon",
    type: ["ReactNode"],
    description:
      "Leading icon (e.g. a Lucide icon). Rendered directly without wrapper.",
  },
  {
    name: "logo",
    type: ["ReactNode"],
    description:
      "Leading brand logo (e.g. Figma, Slack). Takes priority over icon.",
  },
  {
    name: "action",
    type: ["ReactNode"],
    description: "Trailing action slot (e.g. a Button or Toggle).",
  },
  {
    name: "label",
    type: ["string"],
    description:
      "Trailing text label (e.g. \"Coming soon\"). Only shown when no action is provided.",
  },
  {
    name: "className",
    type: ["string"],
    description: "Additional class names merged via cn().",
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
        description="Displays an icon, title, description, and an optional trailing action."
      >
        <div className="w-full max-w-md flex flex-col gap-4">
          <ActionCard
            icon={<Zap className="size-5" />}
            title="Integrations"
            description="Connect your favorite tools."
            action={<Button size="sm" variant="secondary">Connect</Button>}
          />
          <ActionCard
            icon={<Shield className="size-5" />}
            title="Security"
            description="Enable two-factor authentication."
            action={<Button size="sm">Enable</Button>}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="with-logo"
        title="With Logo"
        description="Use logo for brand icons. Takes priority over icon."
      >
        <div className="w-full max-w-md flex flex-col gap-4">
          <ActionCard
            logo={<FigmaLogo className="size-5" />}
            title="Figma"
            description="Sync designs automatically."
            action={<Button size="sm" variant="secondary">Connect</Button>}
          />
          <ActionCard
            logo={<SlackLogo className="size-5" />}
            title="Slack"
            description="Real-time notifications."
            action={<Button size="sm" variant="secondary">Connect</Button>}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="with-toggle"
        title="With Toggle"
        description="Pass a Toggle in the action slot for settings-style rows."
      >
        <div className="w-full max-w-md flex flex-col gap-4">
          <ActionCard
            icon={<Bell className="size-5" />}
            title="Notifications"
            description="Get notified on new activity."
            action={<Toggle size="sm" />}
          />
          <ActionCard
            icon={<Lock className="size-5" />}
            title="Two-factor auth"
            description="Require 2FA on login."
            action={<Toggle size="sm" defaultChecked />}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="with-label"
        title="With Label"
        description="Displays trailing text instead of an action. Useful for status or metadata."
      >
        <div className="w-full max-w-md flex flex-col gap-4">
          <ActionCard
            logo={<FigmaLogo className="size-5" />}
            title="Figma"
            description="Sync designs automatically."
            label="Coming soon"
          />
          <ActionCard
            icon={<Globe className="size-5" />}
            title="API access"
            description="Programmatic access to your workspace."
            label="Pro plan"
          />
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

export default function ActionCardPage() {
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
            ActionCard
          </h1>
          <p
            className="text-content-highlight"
            style={{ color: "var(--text-base-bolder)" }}
          >
            The ActionCard component is a horizontal card that pairs
            descriptive content with a trailing action. It provides a clean
            layout for settings rows, integration lists, or any item that
            requires an inline action.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add https://ui.getlyse.com/r/action-card.json")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <><Copy /> Copy install command</>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a
                href="https://v0.app/chat?q=add%20component%20from%20https%3A%2F%2Fui.getlyse.com%2Fr%2Faction-card.json"
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
                <div className="w-full max-w-sm">
                  <ActionCard
                    icon={<Zap className="size-5" />}
                    title="Integrations"
                    description="Connect your tools."
                    action={<Button size="sm" variant="secondary">Connect</Button>}
                  />
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
              extendsType={`React.ComponentProps<"div">`}
            />
          ) : (
            <DocumentationTab />
          )}
        </div>
      </main>

      <TableOfContents sections={tab === "overview" ? overviewSections : []} />
    </>
  )
}
