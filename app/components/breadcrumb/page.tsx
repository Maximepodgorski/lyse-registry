"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Copy, ExternalLink } from "lucide-react"
import { toast } from "@/registry/new-york/ui/toast/toast"
import { Button } from "@/registry/new-york/ui/button/button"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/registry/new-york/ui/breadcrumb/breadcrumb"
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

const importCode = `import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export default function Example() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}`

const overviewSections: TocSection[] = [
  { id: "default", label: "Default" },
  { id: "custom-separator", label: "Custom Separator" },
  { id: "with-nextjs-link", label: "With Next.js Link" },
  { id: "ellipsis", label: "Ellipsis (Collapsed)" },
]

const dosDontsItems: DosDontsItem[] = [
  {
    do: {
      preview: (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Settings</BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbPage>Profile</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      ),
      description: "Use breadcrumbs to show the user's current location in a page hierarchy.",
    },
    dont: {
      preview: (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Step 1</BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbPage>Step 2</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      ),
      description: "Don't use breadcrumbs for sequential steps or wizard flows — use Tabs or a stepper instead.",
    },
  },
  {
    do: {
      preview: (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
              <BreadcrumbSeparator />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      ),
      description: "Use BreadcrumbEllipsis to collapse deep paths (4+ levels) — show first, ellipsis, and last.",
    },
    dont: {
      preview: (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">A</BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">B</BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">C</BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">D</BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">E</BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbPage>F</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      ),
      description: "Don't display every level of a deep path — it overflows and loses readability.",
    },
  },
]

const breadcrumbProps: PropDef[] = [
  {
    name: "className",
    type: ["string"],
    description: "Additional class names merged via cn().",
  },
]

const breadcrumbListProps: PropDef[] = [
  {
    name: "className",
    type: ["string"],
    description: "Additional class names merged via cn().",
  },
]

const breadcrumbItemProps: PropDef[] = [
  {
    name: "className",
    type: ["string"],
    description: "Additional class names merged via cn().",
  },
]

const breadcrumbLinkProps: PropDef[] = [
  {
    name: "asChild",
    type: ["boolean"],
    default: "false",
    description: "Render as child element via Radix Slot (e.g., Next.js Link).",
  },
  {
    name: "href",
    type: ["string"],
    description: "Link destination URL.",
  },
  {
    name: "className",
    type: ["string"],
    description: "Additional class names merged via cn().",
  },
]

const breadcrumbPageProps: PropDef[] = [
  {
    name: "className",
    type: ["string"],
    description: "Additional class names merged via cn().",
  },
]

const breadcrumbSeparatorProps: PropDef[] = [
  {
    name: "children",
    type: ["ReactNode"],
    default: '"/"',
    description: 'Custom separator content. Defaults to "/".',
  },
  {
    name: "className",
    type: ["string"],
    description: "Additional class names merged via cn().",
  },
]

const breadcrumbEllipsisProps: PropDef[] = [
  {
    name: "onClick",
    type: ["function"],
    description: "Handler to expand collapsed breadcrumb items.",
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
        description="A basic breadcrumb trail with slash separators."
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Components</BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </ComponentPreview>

      <ComponentPreview
        id="custom-separator"
        title="Custom Separator"
        description="Replace the default slash with a chevron icon or any custom content."
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
              <BreadcrumbSeparator>
                <ChevronRight className="size-3.5" />
              </BreadcrumbSeparator>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Settings</BreadcrumbLink>
              <BreadcrumbSeparator>
                <ChevronRight className="size-3.5" />
              </BreadcrumbSeparator>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbPage>Profile</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </ComponentPreview>

      <ComponentPreview
        id="with-nextjs-link"
        title="With Next.js Link"
        description="Use asChild to render as a Next.js Link for client-side navigation."
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/components/introduction">Docs</Link>
              </BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/components/directory">Components</Link>
              </BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </ComponentPreview>

      <ComponentPreview
        id="ellipsis"
        title="Ellipsis (Collapsed)"
        description="Collapse deep paths with BreadcrumbEllipsis. Click to reveal hidden items."
      >
        <EllipsisDemo />
      </ComponentPreview>
    </div>
  )
}

function EllipsisDemo() {
  const [expanded, setExpanded] = useState(false)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        {expanded ? (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Documents</BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Projects</BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
          </>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbEllipsis onClick={() => setExpanded(true)} />
            <BreadcrumbSeparator />
          </BreadcrumbItem>
        )}
        <BreadcrumbItem>
          <BreadcrumbPage>Current Page</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
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

export default function BreadcrumbPageDoc() {
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
            Breadcrumb
          </h1>
          <p
            className="text-content-highlight"
            style={{ color: "var(--text-base-bolder)" }}
          >
            Navigation trail showing the user&rsquo;s current location in a page
            hierarchy. Compound component with 7 sub-components for full
            customization.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add https://ui.getlyse.com/r/breadcrumb.json")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <><Copy /> Copy install command</>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a
                href="https://v0.app/chat?q=add%20component%20from%20https%3A%2F%2Fui.getlyse.com%2Fr%2Fbreadcrumb.json"
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
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Home</BreadcrumbLink>
                      <BreadcrumbSeparator />
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Components</BreadcrumbLink>
                      <BreadcrumbSeparator />
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              }
              codeString={importCode}
              language="tsx"
            />
          )}

          {/* Tab content */}
          {tab === "overview" ? (
            <OverviewTab />
          ) : tab === "props" ? (
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h2 className="text-heading-small font-accent" style={{ color: "var(--text-base-strong)" }}>Breadcrumb</h2>
                <PropsTable propDefs={breadcrumbProps} />
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-heading-small font-accent" style={{ color: "var(--text-base-strong)" }}>BreadcrumbList</h2>
                <PropsTable propDefs={breadcrumbListProps} />
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-heading-small font-accent" style={{ color: "var(--text-base-strong)" }}>BreadcrumbItem</h2>
                <PropsTable propDefs={breadcrumbItemProps} />
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-heading-small font-accent" style={{ color: "var(--text-base-strong)" }}>BreadcrumbLink</h2>
                <PropsTable propDefs={breadcrumbLinkProps} />
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-heading-small font-accent" style={{ color: "var(--text-base-strong)" }}>BreadcrumbPage</h2>
                <PropsTable propDefs={breadcrumbPageProps} />
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-heading-small font-accent" style={{ color: "var(--text-base-strong)" }}>BreadcrumbSeparator</h2>
                <PropsTable propDefs={breadcrumbSeparatorProps} />
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-heading-small font-accent" style={{ color: "var(--text-base-strong)" }}>BreadcrumbEllipsis</h2>
                <PropsTable propDefs={breadcrumbEllipsisProps} />
              </div>
            </div>
          ) : (
            <DocumentationTab />
          )}
        </div>
      </main>

      <TableOfContents sections={tab === "overview" ? overviewSections : []} />
    </>
  )
}
