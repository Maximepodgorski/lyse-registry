"use client"

import { Badge } from "@/registry/new-york/ui/badge/badge"
import { Separator } from "@/registry/new-york/ui/separator/separator"
import { CodeBlock } from "@/app/_components/code-block"
import { InlineCode } from "@/app/_components/inline-code"
import {
  TableOfContents,
  type TocSection,
} from "@/app/_components/table-of-contents"

const tocSections: TocSection[] = [
  { id: "v1.1", label: "v1.1 — Aube" },
  { id: "v1.0", label: "v1.0 — Hello world" },
]

const registryUrl = "https://ui.getlyse.com/r"

const v11NewComponents = [
  "alert",
  "alert-dialog",
  "breadcrumb",
  "card",
  "popover",
  "separator",
  "skeleton",
  "table",
]

const v11InstallNew = `npx shadcn@latest add \\\n${v11NewComponents.map((c) => `  ${registryUrl}/${c}.json`).join(" \\\n")}`

export default function ChangelogPage() {
  return (
    <>
    <main className="flex-1 min-w-0 py-16 flex flex-col gap-10 max-w-none px-5 sm:px-8 lg:px-16 xl:px-20">
      <div className="flex flex-col gap-2">
        <h1
          className="font-bold"
          style={{ color: "var(--text-base-strong)", fontSize: "var(--root-font-size-5xl)" }}
        >
          Changelog
        </h1>
        <p
          className="text-content-highlight"
          style={{ color: "var(--text-base-bolder)" }}
        >
          Latest updates and announcements.
        </p>
      </div>

      {/* v1.1.0 — Aube */}
      <section id="v1.1" className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h2
              className="text-heading-medium font-bold"
              style={{ color: "var(--text-base-strong)" }}
            >
              15.03.26 — Aube
            </h2>
            <Badge variant="neutral" size="sm">v1.1</Badge>
          </div>
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            8 new components, bringing the registry to 31.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-bolder)" }}
          >
            <span className="font-accent">8 new components</span> — Alert,
            AlertDialog, Breadcrumb, Card, Popover, Separator, Skeleton, and
            Table are now available in the registry.
          </p>

          <ul className="flex flex-col gap-2 list-disc pl-5">
            <li
              className="text-content-body"
              style={{ color: "var(--text-base-bolder)" }}
            >
              <span className="font-accent">Card</span> — Content container with
              outline and ghost variants. Composable with CardHeader, CardTitle,
              CardDescription, CardContent, and CardFooter.
            </li>
            <li
              className="text-content-body"
              style={{ color: "var(--text-base-bolder)" }}
            >
              <span className="font-accent">Alert & AlertDialog</span> — Inline
              feedback messages and confirmation dialogs for destructive actions.
            </li>
            <li
              className="text-content-body"
              style={{ color: "var(--text-base-bolder)" }}
            >
              <span className="font-accent">Table</span> — Structured data
              display with striped rows and sticky header.
            </li>
            <li
              className="text-content-body"
              style={{ color: "var(--text-base-bolder)" }}
            >
              <span className="font-accent">Skeleton & Popover</span> — Shimmer
              loading placeholders and floating panels anchored to a trigger.
            </li>
            <li
              className="text-content-body"
              style={{ color: "var(--text-base-bolder)" }}
            >
              <span className="font-accent">Breadcrumb & Separator</span> —
              Navigation trail and visual dividers between content sections.
            </li>
          </ul>
        </div>

        <p
          className="text-content-body"
          style={{ color: "var(--text-base-bolder)" }}
        >
          Install all new components with a single command. Run{" "}
          <InlineCode>npx shadcn@latest add</InlineCode> and the CLI will resolve
          tokens and dependencies automatically.
        </p>

        <CodeBlock
          codeString={v11InstallNew}
          language="bash"
          fileName="Terminal"
        />
      </section>

      <Separator variant="subtle" />

      {/* v1.0.0 — Hello world */}
      <section id="v1.0" className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h2
              className="text-heading-medium font-bold"
              style={{ color: "var(--text-base-strong)" }}
            >
              09.03.26 — Hello world
            </h2>
            <Badge variant="neutral" size="sm">v1.0</Badge>
          </div>
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            First public release of Lyse UI.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <ul className="flex flex-col gap-2 list-disc pl-5">
            <li
              className="text-content-body"
              style={{ color: "var(--text-base-bolder)" }}
            >
              <span className="font-accent">23 components</span> — Button, Badge,
              Tag, Tooltip, Toast, Menu, Checkbox, Radio, Toggle, BannerInfo,
              Avatar, DropdownMenu, Select, Input, Textarea, Modal, Spinner,
              Progress, Chip, Tabs, ActionCard, SpotlightCard, CalloutCard.
            </li>
            <li
              className="text-content-body"
              style={{ color: "var(--text-base-bolder)" }}
            >
              <span className="font-accent">Design tokens</span> — 3-layer token
              architecture (primitives, semantics, shadcn bridge) with full light
              and dark mode support.
            </li>
            <li
              className="text-content-body"
              style={{ color: "var(--text-base-bolder)" }}
            >
              <span className="font-accent">Documentation site</span> — Component
              pages with live previews, props tables, best practices, and usage
              examples.
            </li>
            <li
              className="text-content-body"
              style={{ color: "var(--text-base-bolder)" }}
            >
              <span className="font-accent">Registry</span> — shadcn-compatible
              format. Install any component with a single CLI command.
            </li>
            <li
              className="text-content-body"
              style={{ color: "var(--text-base-bolder)" }}
            >
              <span className="font-accent">v0 integration</span> — Add any
              component to v0 directly from its documentation page.
            </li>
          </ul>
        </div>
      </section>
    </main>

    <TableOfContents sections={tocSections} />
    </>
  )
}
