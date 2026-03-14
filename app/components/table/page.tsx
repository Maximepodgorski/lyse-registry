"use client"

import { useState } from "react"
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/registry/new-york/ui/table/table"
import { AvatarLabel } from "@/registry/new-york/ui/avatar/avatar"
import { Tag, TagDot } from "@/registry/new-york/ui/tag/tag"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/registry/new-york/ui/dropdown-menu/dropdown-menu"
import { Button } from "@/registry/new-york/ui/button/button"
import { toast } from "@/registry/new-york/ui/toast/toast"
import { Copy, ExternalLink, Ellipsis, Pencil, Trash2, Eye } from "lucide-react"
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
  Table, TableHeader, TableBody, TableRow,
  TableHead, TableCell,
} from '@/components/ui/table'

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Olivia Martin</TableCell>
      <TableCell>Active</TableCell>
      <TableCell>Designer</TableCell>
    </TableRow>
  </TableBody>
</Table>`

const members = [
  { name: "Olivia Martin", handle: "@olivia", initials: "OM", role: "Product Designer", status: "Active" as const, email: "olivia@lyse.dev", teams: ["Design", "Product"] },
  { name: "Lucas Bernard", handle: "@lucas", initials: "LB", role: "Frontend Engineer", status: "Active" as const, email: "lucas@lyse.dev", teams: ["Engineering"] },
  { name: "Emma Dubois", handle: "@emma", initials: "ED", role: "Product Manager", status: "Active" as const, email: "emma@lyse.dev", teams: ["Product", "Design"] },
  { name: "Noah Laurent", handle: "@noah", initials: "NL", role: "Backend Engineer", status: "Paused" as const, email: "noah@lyse.dev", teams: ["Engineering"] },
  { name: "Jade Moreau", handle: "@jade", initials: "JM", role: "UX Researcher", status: "Active" as const, email: "jade@lyse.dev", teams: ["Design"] },
  { name: "Hugo Leroy", handle: "@hugo", initials: "HL", role: "DevOps Engineer", status: "Inactive" as const, email: "hugo@lyse.dev", teams: ["Engineering"] },
  { name: "Léa Petit", handle: "@lea", initials: "LP", role: "Content Designer", status: "Active" as const, email: "lea@lyse.dev", teams: ["Design", "Product"] },
]

const statusVariant = {
  Active: "success",
  Paused: "warning",
  Inactive: "neutral",
} as const

const invoices = [
  { id: "INV-001", description: "Annual license", method: "Credit Card", amount: "$2,400.00" },
  { id: "INV-002", description: "Consulting — March", method: "Bank Transfer", amount: "$4,200.00" },
  { id: "INV-003", description: "Design review", method: "PayPal", amount: "$800.00" },
  { id: "INV-004", description: "Infrastructure setup", method: "Credit Card", amount: "$1,600.00" },
]

const overviewSections: TocSection[] = [
  { id: "default", label: "Default" },
  { id: "striped", label: "Striped" },
  { id: "compact", label: "Compact" },
  { id: "with-footer", label: "With Footer" },
  { id: "with-caption", label: "With Caption" },
  { id: "alignment", label: "Alignment" },
]

const dosDontsItems: DosDontsItem[] = [
  {
    do: {
      preview: (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead align="right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Annual license</TableCell>
              <TableCell align="right">$2,400.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ),
      description: "Align numeric columns to the right for easy scanning.",
    },
    dont: {
      preview: (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Annual license</TableCell>
              <TableCell>$2,400.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ),
      description:
        "Don't left-align numeric data — it makes comparison harder.",
    },
  },
  {
    do: {
      preview: (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Olivia Martin</TableCell>
              <TableCell>Product Designer</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Lucas Bernard</TableCell>
              <TableCell>Frontend Engineer</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ),
      description: "Use clear, concise column headers that describe the data.",
    },
    dont: {
      preview: (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Full name of team member</TableHead>
              <TableHead>Assigned job title and role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Olivia Martin</TableCell>
              <TableCell>Product Designer</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ),
      description:
        "Don't use long sentences as column headers.",
    },
  },
  {
    do: {
      preview: (
        <Table variant="striped" compact>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Event</TableHead>
              <TableHead align="right">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>001</TableCell>
              <TableCell>Page view</TableCell>
              <TableCell align="right">1,234</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>002</TableCell>
              <TableCell>Click</TableCell>
              <TableCell align="right">567</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>003</TableCell>
              <TableCell>Signup</TableCell>
              <TableCell align="right">89</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ),
      description:
        "Use striped + compact together for dense data tables.",
    },
    dont: {
      preview: (
        <Table variant="striped">
          <TableBody>
            <TableRow>
              <TableCell>One row only</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ),
      description:
        "Don't use striped on single-row tables — the pattern has no effect.",
    },
  },
]

const propDefs: PropDef[] = [
  {
    name: "variant",
    type: ["default", "striped"],
    default: "default",
    description: "Row background pattern. Striped applies alternating backgrounds to tbody rows.",
  },
  {
    name: "compact",
    type: ["boolean"],
    default: "false",
    description: "Reduces cell padding for denser data display.",
  },
  {
    name: "wrapperClassName",
    type: ["string"],
    description: "Class names applied to the outer scroll wrapper div.",
  },
  {
    name: "className",
    type: ["string"],
    description: "Class names applied to the table element.",
  },
]

const headPropDefs: PropDef[] = [
  {
    name: "scope",
    type: ["col", "row"],
    default: "col",
    description: "Header scope for assistive technology association.",
  },
  {
    name: "align",
    type: ["left", "center", "right"],
    default: "left",
    description: "Text alignment of the column header.",
  },
]

const cellPropDefs: PropDef[] = [
  {
    name: "align",
    type: ["left", "center", "right"],
    default: "left",
    description: "Text alignment of the cell content.",
  },
]

/* ----------------------------------------------------------------
 * Status Badge helper
 * ---------------------------------------------------------------- */

function StatusTag({ status }: { status: "Active" | "Paused" | "Inactive" }) {
  return (
    <Tag variant={statusVariant[status]} size="sm" type="ghost">
      <TagDot /> {status}
    </Tag>
  )
}

/* ----------------------------------------------------------------
 * Overview Tab
 * ---------------------------------------------------------------- */

function OverviewTab() {
  return (
    <div className="flex flex-col gap-12">
      <ComponentPreview
        id="default"
        title="Default"
        description="Standard table with rich content — avatars, badges, and tags compose naturally inside cells."
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Teams</TableHead>
              <TableHead align="right">Status</TableHead>
              <TableHead className="w-10"><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.slice(0, 5).map((m) => (
              <TableRow key={m.handle}>
                <TableCell>
                  <AvatarLabel
                    size="sm"
                    initials={m.initials}
                    name={m.name}
                    description={m.handle}
                  />
                </TableCell>
                <TableCell>{m.role}</TableCell>
                <TableCell>{m.email}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    {m.teams.map((t) => (
                      <Tag key={t} size="sm" variant="neutral" type="ghost">
                        {t}
                      </Tag>
                    ))}
                  </div>
                </TableCell>
                <TableCell align="right">
                  <StatusTag status={m.status} />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="terciary" size="xs" isIconOnly>
                        <Ellipsis />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem icon={<Eye />}>View profile</DropdownMenuItem>
                      <DropdownMenuItem icon={<Pencil />}>Edit</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem icon={<Trash2 />} variant="destructive">Remove</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ComponentPreview>

      <ComponentPreview
        id="striped"
        title="Striped"
        description="Alternating row backgrounds for easier scanning. Hover still wins over the stripe."
      >
        <Table variant="striped">
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead align="right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((m) => (
              <TableRow key={m.handle}>
                <TableCell>
                  <AvatarLabel
                    size="sm"
                    initials={m.initials}
                    name={m.name}
                    description={m.handle}
                  />
                </TableCell>
                <TableCell>{m.role}</TableCell>
                <TableCell>{m.email}</TableCell>
                <TableCell align="right">
                  <StatusTag status={m.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ComponentPreview>

      <ComponentPreview
        id="compact"
        title="Compact"
        description="Reduced padding for denser data display. Combinable with striped."
      >
        <Table variant="striped" compact>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead align="right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((m) => (
              <TableRow key={m.handle}>
                <TableCell>
                  <AvatarLabel
                    size="sm"
                    initials={m.initials}
                    name={m.name}
                    description={m.handle}
                  />
                </TableCell>
                <TableCell>{m.role}</TableCell>
                <TableCell>{m.email}</TableCell>
                <TableCell align="right">
                  <StatusTag status={m.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ComponentPreview>

      <ComponentPreview
        id="with-footer"
        title="With Footer"
        description="Footer row for totals or summaries. Footer rows are not striped and use a muted text color."
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Method</TableHead>
              <TableHead align="right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell className="font-accent">{inv.id}</TableCell>
                <TableCell>{inv.description}</TableCell>
                <TableCell>{inv.method}</TableCell>
                <TableCell align="right">{inv.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="font-accent">Total</TableCell>
              <TableCell align="right" className="font-accent">$9,000.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </ComponentPreview>

      <ComponentPreview
        id="with-caption"
        title="With Caption"
        description="A caption describes the table content. Rendered below the table by default."
      >
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Description</TableHead>
              <TableHead align="right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.slice(0, 3).map((inv) => (
              <TableRow key={inv.id}>
                <TableCell className="font-accent">{inv.id}</TableCell>
                <TableCell>{inv.description}</TableCell>
                <TableCell align="right">{inv.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ComponentPreview>

      <ComponentPreview
        id="alignment"
        title="Alignment"
        description="Headers and cells support left, center, and right alignment via the align prop."
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Left (default)</TableHead>
              <TableHead align="center">Center</TableHead>
              <TableHead align="right">Right</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Olivia Martin</TableCell>
              <TableCell align="center">Designer</TableCell>
              <TableCell align="right">$2,400.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Lucas Bernard</TableCell>
              <TableCell align="center">Engineer</TableCell>
              <TableCell align="right">$3,200.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
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

export default function TablePage() {
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
            Table
          </h1>
          <p
            className="text-content-highlight"
            style={{ color: "var(--text-base-bolder)" }}
          >
            Display structured data in rows and columns with consistent
            token-driven styling, optional striped rows, sticky header, and
            horizontal scroll for overflow.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add https://ui.getlyse.com/r/table.json")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <Copy /> Copy install command
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a
                href="https://v0.app/chat?q=add%20component%20from%20https%3A%2F%2Fui.getlyse.com%2Fr%2Ftable.json"
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
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead align="right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <AvatarLabel
                          size="sm"
                          initials="OM"
                          name="Olivia Martin"
                          description="@olivia"
                        />
                      </TableCell>
                      <TableCell>Product Designer</TableCell>
                      <TableCell align="right">
                        <StatusTag status="Active" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <AvatarLabel
                          size="sm"
                          initials="LB"
                          name="Lucas Bernard"
                          description="@lucas"
                        />
                      </TableCell>
                      <TableCell>Frontend Engineer</TableCell>
                      <TableCell align="right">
                        <StatusTag status="Active" />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
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
              <div className="flex flex-col gap-4">
                <h3
                  className="text-heading-small font-bold"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  Table
                </h3>
                <PropsTable
                  propDefs={propDefs}
                  extendsType="React.ComponentProps<'table'>"
                />
              </div>
              <div className="flex flex-col gap-4">
                <h3
                  className="text-heading-small font-bold"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  TableHead
                </h3>
                <PropsTable
                  propDefs={headPropDefs}
                  extendsType="React.ComponentProps<'th'>"
                />
              </div>
              <div className="flex flex-col gap-4">
                <h3
                  className="text-heading-small font-bold"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  TableCell
                </h3>
                <PropsTable
                  propDefs={cellPropDefs}
                  extendsType="React.ComponentProps<'td'>"
                />
              </div>
            </div>
          ) : (
            <DocumentationTab />
          )}
        </div>
      </main>

      <TableOfContents
        sections={tab === "overview" ? overviewSections : []}
      />
    </>
  )
}
