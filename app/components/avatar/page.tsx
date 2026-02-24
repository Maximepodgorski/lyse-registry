"use client"

import { useState } from "react"
import {
  Avatar,
  AvatarLabel,
  AvatarGroup,
  AvatarAddButton,
} from "@/registry/new-york/ui/avatar/avatar"
import { toast } from "@/registry/new-york/ui/toast/toast"
import { Copy, ExternalLink } from "lucide-react"
import { Button } from "@/registry/new-york/ui/button/button"
import { ComponentPreview } from "@/app/_components/component-preview"
import { PropsTable, type PropDef } from "@/app/_components/props-table"
import {
  TableOfContents,
  type TocSection,
} from "@/app/_components/table-of-contents"
import { CodeBlock } from "@/app/_components/code-block"
import { InlineCode } from "@/app/_components/inline-code"

/* ----------------------------------------------------------------
 * Data
 * ---------------------------------------------------------------- */

const overviewSections: TocSection[] = [
  { id: "default", label: "Default" },
  { id: "sizes", label: "Sizes" },
  { id: "initials", label: "Initials" },
  { id: "placeholder", label: "Placeholder" },
  { id: "status", label: "Status" },
  { id: "avatar-label", label: "AvatarLabel" },
  { id: "avatar-group", label: "AvatarGroup" },
  { id: "add-button", label: "AvatarAddButton" },
]

const avatarPropDefs: PropDef[] = [
  {
    name: "src",
    type: ["string"],
    description:
      "Image URL. Falls back to initials or placeholder on error.",
  },
  {
    name: "alt",
    type: ["string"],
    default: '""',
    description:
      "Alt text for the image. Used as aria-label for initials/placeholder variants.",
  },
  {
    name: "initials",
    type: ["string"],
    description:
      "1\u20132 character initials displayed when no src or image fails.",
  },
  {
    name: "size",
    type: ["xs", "sm", "md", "lg", "xl"],
    default: "md",
    description: "Avatar circle size.",
  },
  {
    name: "status",
    type: ["online", "offline", "busy", "company"],
    description: "Status indicator at bottom-right.",
  },
  {
    name: "companySrc",
    type: ["string"],
    description: 'Company logo URL (required when status="company").',
  },
  {
    name: "className",
    type: ["string"],
    description: "Additional class names merged via cn().",
  },
]

const avatarLabelPropDefs: PropDef[] = [
  {
    name: "name",
    type: ["string"],
    required: true,
    description: "Primary name text.",
  },
  {
    name: "description",
    type: ["string"],
    description: "Secondary text below name.",
  },
  {
    name: "size",
    type: ["sm", "md", "lg"],
    default: "md",
    description: "Controls avatar size and text scale.",
  },
  {
    name: "src",
    type: ["string"],
    description: "Forwarded to internal Avatar.",
  },
  {
    name: "initials",
    type: ["string"],
    description: "Forwarded to internal Avatar.",
  },
  {
    name: "status",
    type: ["online", "offline", "busy", "company"],
    description: "Forwarded to internal Avatar.",
  },
]

const avatarGroupPropDefs: PropDef[] = [
  {
    name: "max",
    type: ["number"],
    description: 'Max visible avatars. Overflow shows "+N" count.',
  },
  {
    name: "size",
    type: ["xs", "sm", "md"],
    default: "sm",
    description: "Size of all avatars in the group.",
  },
  {
    name: "children",
    type: ["React.ReactNode"],
    required: true,
    description: "Avatar elements (and optionally AvatarAddButton).",
  },
]

const avatarAddButtonPropDefs: PropDef[] = [
  {
    name: "size",
    type: ["xs", "sm", "md"],
    default: "sm",
    description: "Button size (matches avatar sizes).",
  },
  {
    name: "disabled",
    type: ["boolean"],
    default: "false",
    description: "Disables interaction.",
  },
  {
    name: "asChild",
    type: ["boolean"],
    default: "false",
    description: "Render as child element via Radix Slot.",
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
        description={
          <>
            A basic avatar with an image. Provide{" "}
            <InlineCode>src</InlineCode> and <InlineCode>alt</InlineCode> for
            the photo.
          </>
        }
      >
        <div className="flex items-center gap-[var(--layout-gap-lg)]">
          <Avatar
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
            alt="Jane Doe"
          />
          <Avatar
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
            alt="John Smith"
          />
          <Avatar
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
            alt="Alice Brown"
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="sizes"
        title="Sizes"
        description={
          <>
            Use the <InlineCode>size</InlineCode> prop with{" "}
            <InlineCode>xs</InlineCode>, <InlineCode>sm</InlineCode>,{" "}
            <InlineCode>md</InlineCode> (default),{" "}
            <InlineCode>lg</InlineCode>, or <InlineCode>xl</InlineCode>.
          </>
        }
      >
        <div className="flex items-end gap-[var(--layout-gap-lg)]">
          <Avatar
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
            alt="xs"
            size="xs"
          />
          <Avatar
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
            alt="sm"
            size="sm"
          />
          <Avatar
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
            alt="md"
            size="md"
          />
          <Avatar
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
            alt="lg"
            size="lg"
          />
          <Avatar
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
            alt="xl"
            size="xl"
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="initials"
        title="Initials"
        description={
          <>
            Use the <InlineCode>initials</InlineCode> prop to display 1–2
            character initials when no image is available. Long strings are
            truncated to 2 characters.
          </>
        }
      >
        <div className="flex items-center gap-[var(--layout-gap-lg)]">
          <Avatar initials="JD" alt="Jane Doe" />
          <Avatar initials="AB" alt="Alice Brown" />
          <Avatar initials="QA" alt="Quality Assurance" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="placeholder"
        title="Placeholder"
        description={
          <>
            When no <InlineCode>src</InlineCode> or{" "}
            <InlineCode>initials</InlineCode> are provided, a generic user icon
            is shown as a placeholder.
          </>
        }
      >
        <div className="flex items-center gap-[var(--layout-gap-lg)]">
          <Avatar alt="Unknown user" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="status"
        title="Status"
        description={
          <>
            Use the <InlineCode>status</InlineCode> prop to show a presence
            indicator at the bottom-right. Use{" "}
            <InlineCode>companySrc</InlineCode> with{" "}
            <InlineCode>status=&quot;company&quot;</InlineCode> for a company
            logo badge.
          </>
        }
      >
        <div className="flex items-center gap-[var(--layout-gap-xl)]">
          <Avatar
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
            alt="Online"
            status="online"
          />
          <Avatar
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
            alt="Offline"
            status="offline"
          />
          <Avatar
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
            alt="Busy"
            status="busy"
          />
          <Avatar
            initials="AB"
            alt="Online"
            status="online"
          />
          <Avatar
            alt="Offline"
            status="offline"
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="avatar-label"
        title="AvatarLabel"
        description={
          <>
            <InlineCode>AvatarLabel</InlineCode> pairs an avatar with a name
            and optional description. Use the <InlineCode>size</InlineCode>{" "}
            prop to control the text scale.
          </>
        }
      >
        <div className="flex flex-col gap-[var(--layout-gap-xl)]">
          <AvatarLabel
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
            name="Jane Doe"
            description="Product Designer"
            size="sm"
          />
          <AvatarLabel
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
            name="John Smith"
            description="Engineering Manager"
            size="md"
          />
          <AvatarLabel
            initials="AB"
            name="Alice Brown"
            description="Head of Design"
            size="lg"
            status="online"
          />
          <AvatarLabel
            name="Unknown User"
            size="md"
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="avatar-group"
        title="AvatarGroup"
        description={
          <>
            <InlineCode>AvatarGroup</InlineCode> stacks avatars with overlap.
            Use <InlineCode>max</InlineCode> to limit visible avatars — the
            rest appear as a &quot;+N&quot; overflow count.
          </>
        }
      >
        <div className="flex flex-col gap-[var(--layout-gap-xl)]">
          <AvatarGroup size="xs" max={3}>
            <Avatar initials="JD" alt="Jane" />
            <Avatar initials="JS" alt="John" />
            <Avatar initials="AB" alt="Alice" />
            <Avatar initials="CD" alt="Charlie" />
            <Avatar initials="EF" alt="Eve" />
          </AvatarGroup>
          <AvatarGroup size="sm" max={4}>
            <Avatar
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
              alt="Jane"
            />
            <Avatar
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
              alt="John"
            />
            <Avatar initials="AB" alt="Alice" />
            <Avatar initials="CD" alt="Charlie" />
            <Avatar initials="EF" alt="Eve" />
            <Avatar initials="GH" alt="Grace" />
            <AvatarAddButton onClick={() => toast.success("Add clicked")} />
          </AvatarGroup>
          <AvatarGroup size="md" max={3}>
            <Avatar
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
              alt="Jane"
            />
            <Avatar
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
              alt="John"
            />
            <Avatar
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
              alt="Alice"
            />
            <Avatar initials="CD" alt="Charlie" />
            <AvatarAddButton onClick={() => toast.success("Add clicked")} />
          </AvatarGroup>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="add-button"
        title="AvatarAddButton"
        description={
          <>
            A circular button with a plus icon. Can be used standalone or
            inside <InlineCode>AvatarGroup</InlineCode>. Supports{" "}
            <InlineCode>disabled</InlineCode> and{" "}
            <InlineCode>asChild</InlineCode>.
          </>
        }
      >
        <div className="flex items-center gap-[var(--layout-gap-lg)]">
          <AvatarAddButton
            onClick={() => toast.success("Add clicked")}
          />
          <AvatarAddButton disabled />
        </div>
      </ComponentPreview>
    </div>
  )
}

/* ----------------------------------------------------------------
 * Page
 * ---------------------------------------------------------------- */

type Tab = "overview" | "props"

export default function AvatarPage() {
  const [tab, setTab] = useState<Tab>("overview")

  return (
    <>
      <main className="flex-1 min-w-0 py-16 flex flex-col gap-10 max-w-none px-8 lg:px-16 xl:px-20">
        {/* Hero */}
        <div className="flex flex-col gap-3">
          <h1
            className="text-heading-large"
            style={{ color: "var(--text-base-strong)" }}
          >
            Avatar
          </h1>
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            A compound component system for displaying user photos, initials, or
            placeholders with optional status indicators, labels, grouping, and
            an add action.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add @lyse/avatar")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <><Copy /> Copy install command</>
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
                <div className="flex items-center gap-[var(--layout-gap-lg)]">
                  <Avatar
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
                    alt="Jane Doe"
                  />
                  <Avatar initials="JS" alt="John Smith" />
                  <Avatar alt="Unknown" />
                </div>
              }
              code={
                <>
                  <span style={{ color: "#c084fc" }}>import</span>
                  {" { "}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    Avatar
                  </span>
                  {" } "}
                  <span style={{ color: "#c084fc" }}>from</span>{" "}
                  <span
                    style={{ color: "var(--root-color-warning-400)" }}
                  >{`'@/components/ui/avatar'`}</span>
                  {"\n\n"}
                  <span style={{ color: "var(--root-color-brand-400)" }}>
                    export default
                  </span>{" "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>
                    function
                  </span>{" "}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    Example
                  </span>
                  {"() {\n"}
                  {"  "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>
                    return
                  </span>
                  {" (\n"}
                  {"    <>\n"}
                  {"      <"}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    Avatar
                  </span>
                  {' src="/photo.jpg" alt="Jane Doe" />\n'}
                  {"      <"}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    Avatar
                  </span>
                  {' initials="JS" alt="John Smith" />\n'}
                  {"      <"}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    Avatar
                  </span>
                  {' alt="Unknown" />\n'}
                  {"    </>\n"}
                  {"  )\n"}
                  {"}"}
                </>
              }
            />
          )}

          {/* Tab content */}
          {tab === "overview" ? (
            <OverviewTab />
          ) : (
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-4">
                <h2
                  className="text-heading-small font-accent"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  Avatar
                </h2>
                <PropsTable
                  propDefs={avatarPropDefs}
                  extendsType='React.ComponentProps<"div">'
                />
              </div>
              <div className="flex flex-col gap-4">
                <h2
                  className="text-heading-small font-accent"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  AvatarLabel
                </h2>
                <PropsTable
                  propDefs={avatarLabelPropDefs}
                  extendsType='Omit<React.ComponentProps<"div">, "children">'
                />
              </div>
              <div className="flex flex-col gap-4">
                <h2
                  className="text-heading-small font-accent"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  AvatarGroup
                </h2>
                <PropsTable
                  propDefs={avatarGroupPropDefs}
                  extendsType='React.ComponentProps<"div">'
                />
              </div>
              <div className="flex flex-col gap-4">
                <h2
                  className="text-heading-small font-accent"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  AvatarAddButton
                </h2>
                <PropsTable
                  propDefs={avatarAddButtonPropDefs}
                  extendsType='React.ComponentProps<"button">'
                />
              </div>
            </div>
          )}
        </div>
      </main>

      <TableOfContents sections={tab === "overview" ? overviewSections : []} />
    </>
  )
}
