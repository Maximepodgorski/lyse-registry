"use client"

import { useState } from "react"
import { toast } from "@/registry/new-york/ui/toast/toast"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/registry/new-york/ui/card/card"
import { Button } from "@/registry/new-york/ui/button/button"
import { Tag, TagDot } from "@/registry/new-york/ui/tag/tag"
import { Avatar } from "@/registry/new-york/ui/avatar/avatar"
import { Separator } from "@/registry/new-york/ui/separator/separator"
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
  { id: "with-header-and-footer", label: "With Header & Footer" },
  { id: "stat-cards", label: "Stat Cards" },
  { id: "composition", label: "Composition" },
]

const dosDontsItems: DosDontsItem[] = [
  {
    do: {
      preview: (
        <Card variant="outline" className="w-full max-w-[220px]">
          <CardHeader>
            <CardTitle>Project settings</CardTitle>
            <CardDescription>Manage your project configuration.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-8 rounded-[var(--layout-radius-sm)]" style={{ background: "var(--background-neutral-moderate-default)" }} />
          </CardContent>
          <CardFooter>
            <Button size="sm">Save</Button>
          </CardFooter>
        </Card>
      ),
      description:
        "Use CardHeader for title + description, CardContent for the body, and CardFooter for actions.",
    },
    dont: {
      preview: (
        <div
          className="w-full max-w-[220px] flex flex-col gap-3 p-4 rounded-lg"
          style={{ border: "var(--layout-border-thin) solid var(--border-default)" }}
        >
          <p className="font-semibold text-sm">Project settings</p>
          <div className="h-8 rounded" style={{ background: "var(--background-neutral-moderate-default)" }} />
          <Button size="sm">Save</Button>
        </div>
      ),
      description:
        "Don't recreate card layouts with raw divs and hardcoded styles.",
    },
  },
  {
    do: {
      preview: (
        <div className="flex gap-3 w-full max-w-[340px]">
          <Card variant="outline" className="flex-1">
            <CardContent>
              <p className="text-content-caption" style={{ color: "var(--text-base-moderate)" }}>Revenue</p>
              <p className="text-heading-small font-bold" style={{ color: "var(--text-base-strong)" }}>$12,450</p>
            </CardContent>
          </Card>
          <Card variant="outline" className="flex-1">
            <CardContent>
              <p className="text-content-caption" style={{ color: "var(--text-base-moderate)" }}>Users</p>
              <p className="text-heading-small font-bold" style={{ color: "var(--text-base-strong)" }}>1,234</p>
            </CardContent>
          </Card>
        </div>
      ),
      description:
        "Use Card with only CardContent for simple stat cards — sub-components are all optional.",
    },
    dont: {
      preview: (
        <div className="flex gap-3 w-full max-w-[340px]">
          <Card variant="outline" className="flex-1">
            <CardHeader>
              <CardTitle>Revenue</CardTitle>
              <CardDescription>$12,450</CardDescription>
            </CardHeader>
            <CardContent />
            <CardFooter />
          </Card>
          <Card variant="outline" className="flex-1">
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>1,234</CardDescription>
            </CardHeader>
            <CardContent />
            <CardFooter />
          </Card>
        </div>
      ),
      description:
        "Don't include empty sub-components. Only use the parts you need.",
    },
  },
  {
    do: {
      preview: (
        <Card variant="ghost" className="w-full max-w-[220px]">
          <CardContent>
            <p className="text-content-note" style={{ color: "var(--text-base-moderate)" }}>Ghost variant for grouped content without visual boundaries.</p>
          </CardContent>
        </Card>
      ),
      description:
        "Use ghost variant to group related content without adding visual noise in dense layouts.",
    },
    dont: {
      preview: (
        <Card variant="outline" className="w-full max-w-[220px]">
          <CardContent>
            <Card variant="outline">
              <CardContent>
                <p className="text-content-note" style={{ color: "var(--text-base-moderate)" }}>Nested outline cards — visual clutter.</p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      ),
      description:
        "Don't nest outline cards — stacking borders creates visual clutter. Use ghost for inner cards.",
    },
  },
]

const cardPropDefs: PropDef[] = [
  {
    name: "variant",
    type: ["outline", "ghost"],
    default: "outline",
    description: "Surface style. Outline adds a border and background, ghost is transparent.",
  },
  {
    name: "className",
    type: ["string"],
    description: "Additional class names merged via cn().",
  },
]

const cardTitlePropDefs: PropDef[] = [
  {
    name: "children",
    type: ["ReactNode"],
    required: true,
    description: "Title text. Renders as <h3> with text-heading-small font-bold.",
  },
  {
    name: "className",
    type: ["string"],
    description: "Additional class names merged via cn().",
  },
]

const cardDescriptionPropDefs: PropDef[] = [
  {
    name: "children",
    type: ["ReactNode"],
    required: true,
    description: "Description text. Renders as <p> with text-content-note styling.",
  },
  {
    name: "className",
    type: ["string"],
    description: "Additional class names merged via cn().",
  },
]

const importCode = `import {
  Card, CardHeader, CardTitle,
  CardDescription, CardContent, CardFooter
} from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Card title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    ...content
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`

/* ----------------------------------------------------------------
 * Tabs
 * ---------------------------------------------------------------- */

function OverviewTab() {
  return (
    <div className="flex flex-col gap-12">
      <ComponentPreview
        id="variants"
        title="Variants"
        description="Two surface styles: outline (default) and ghost."
      >
        <div className="flex flex-wrap gap-6 items-start">
          <Card variant="outline" className="w-[280px]">
            <CardHeader>
              <CardTitle>Outline</CardTitle>
              <CardDescription>Default variant with border and background.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-16 rounded-[var(--layout-radius-sm)]" style={{ background: "var(--background-neutral-moderate-default)" }} />
            </CardContent>
            <CardFooter>
              <Button size="sm">Action</Button>
            </CardFooter>
          </Card>
          <Card variant="ghost" className="w-[280px]">
            <CardHeader>
              <CardTitle>Ghost</CardTitle>
              <CardDescription>Transparent, no border or shadow.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-16 rounded-[var(--layout-radius-sm)]" style={{ background: "var(--background-neutral-moderate-default)" }} />
            </CardContent>
            <CardFooter>
              <Button size="sm">Action</Button>
            </CardFooter>
          </Card>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="with-header-and-footer"
        title="With Header & Footer"
        description="Full compound layout with title, description, content, and action buttons."
      >
        <Card variant="outline" className="w-full max-w-[420px]">
          <CardHeader>
            <CardTitle>Team members</CardTitle>
            <CardDescription>Manage your team and their access levels.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-[var(--layout-gap-lg)]">
              <div className="flex items-center gap-[var(--layout-gap-md)]">
                <Avatar size="sm" initials="ML" />
                <div className="flex-1 min-w-0">
                  <p className="text-content-body font-accent" style={{ color: "var(--text-base-strong)" }}>Max Leroy</p>
                  <p className="text-content-caption" style={{ color: "var(--text-base-moderate)" }}>max@getlyse.com</p>
                </div>
                <Tag variant="brand" size="sm" type="ghost"><TagDot />Admin</Tag>
              </div>
              <Separator variant="subtle" />
              <div className="flex items-center gap-[var(--layout-gap-md)]">
                <Avatar size="sm" initials="AD" />
                <div className="flex-1 min-w-0">
                  <p className="text-content-body font-accent" style={{ color: "var(--text-base-strong)" }}>Alice Dupont</p>
                  <p className="text-content-caption" style={{ color: "var(--text-base-moderate)" }}>alice@getlyse.com</p>
                </div>
                <Tag variant="neutral" size="sm" type="ghost"><TagDot />Member</Tag>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="secondary" size="sm">Invite</Button>
            <Button variant="secondary" size="sm">Manage roles</Button>
          </CardFooter>
        </Card>
      </ComponentPreview>

      <ComponentPreview
        id="stat-cards"
        title="Stat Cards"
        description="Use Card with only the parts you need — all sub-components are optional."
      >
        <div className="flex flex-wrap gap-6">
          <Card variant="outline" className="w-[200px]">
            <CardContent>
              <p className="text-content-caption" style={{ color: "var(--text-base-moderate)" }}>Revenue</p>
              <p className="text-heading-medium font-bold" style={{ color: "var(--text-base-strong)" }}>$12,450</p>
            </CardContent>
          </Card>
          <Card variant="outline" className="w-[200px]">
            <CardContent>
              <p className="text-content-caption" style={{ color: "var(--text-base-moderate)" }}>Active users</p>
              <p className="text-heading-medium font-bold" style={{ color: "var(--text-base-strong)" }}>1,234</p>
            </CardContent>
          </Card>
          <Card variant="outline" className="w-[200px]">
            <CardContent>
              <p className="text-content-caption" style={{ color: "var(--text-base-moderate)" }}>Tasks done</p>
              <p className="text-heading-medium font-bold" style={{ color: "var(--text-base-strong)" }}>89%</p>
            </CardContent>
          </Card>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="composition"
        title="Composition"
        description="Cards compose freely with other components — Avatar, Tag, Button, Separator."
      >
        <Card variant="outline" className="w-full max-w-[420px]">
          <CardHeader>
            <div className="flex items-center gap-[var(--layout-gap-md)]">
              <Avatar size="md" initials="LP" />
              <div className="flex-1 min-w-0">
                <p className="text-content-body font-bold" style={{ color: "var(--text-base-strong)" }}>Lyse Project</p>
                <p className="text-content-caption" style={{ color: "var(--text-base-moderate)" }}>AI-powered project management</p>
              </div>
              <Tag variant="success" size="sm" type="ghost"><TagDot />Active</Tag>
            </div>
          </CardHeader>
          <Separator variant="subtle" />
          <CardContent>
            <p className="text-content-note" style={{ color: "var(--text-base-moderate)" }}>
              Last updated 2 hours ago. 12 tasks in progress, 3 blocked.
            </p>
          </CardContent>
          <CardFooter>
            <Button size="sm">View project</Button>
            <Button variant="secondary" size="sm">Settings</Button>
          </CardFooter>
        </Card>
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

export default function CardPage() {
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
            Card
          </h1>
          <p
            className="text-content-highlight"
            style={{ color: "var(--text-base-bolder)" }}
          >
            A container for grouping related content with consistent spacing,
            typography, and surface styles. Supports outline and ghost variants.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add https://ui.getlyse.com/r/card.json")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <><Copy className="size-[var(--layout-size-xs)]" /> Copy install command</>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a
                href="https://v0.app/chat?q=add%20component%20from%20https%3A%2F%2Fui.getlyse.com%2Fr%2Fcard.json"
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
                <Card variant="outline" className="w-full max-w-[380px]">
                  <CardHeader>
                    <CardTitle>Card title</CardTitle>
                    <CardDescription>Card description goes here.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-16 rounded-[var(--layout-radius-sm)]" style={{ background: "var(--background-neutral-moderate-default)" }} />
                  </CardContent>
                  <CardFooter>
                    <Button size="sm">Action</Button>
                  </CardFooter>
                </Card>
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
                  Card
                </h3>
                <PropsTable
                  propDefs={cardPropDefs}
                  extendsType='React.ComponentProps<"div">'
                />
              </div>
              <div>
                <h3
                  className="text-heading-small mb-4"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  CardTitle
                </h3>
                <PropsTable
                  propDefs={cardTitlePropDefs}
                  extendsType='React.ComponentProps<"h3">'
                />
              </div>
              <div>
                <h3
                  className="text-heading-small mb-4"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  CardDescription
                </h3>
                <PropsTable
                  propDefs={cardDescriptionPropDefs}
                  extendsType='React.ComponentProps<"p">'
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
