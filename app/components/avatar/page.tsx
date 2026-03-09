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
  { id: "default", label: "Default" },
  { id: "sizes", label: "Sizes" },
  { id: "initials", label: "Initials" },
  { id: "placeholder", label: "Placeholder" },
  { id: "status", label: "Status" },
  { id: "avatar-label", label: "AvatarLabel" },
  { id: "avatar-group", label: "AvatarGroup" },
  { id: "add-button", label: "AvatarAddButton" },
]

const docSections: TocSection[] = [
  { id: "dos-donts", label: "Do / Don't" },
]

const dosDontsItems: DosDontsItem[] = [
  {
    do: {
      preview: (
        <Avatar
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
          alt="Jane Doe"
        />
      ),
      description:
        "Provide alt on standalone avatars for screen reader context.",
    },
    dont: {
      preview: <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" />,
      description:
        "Don't leave alt empty when the avatar is the only identifier for a user.",
    },
  },
  {
    do: {
      preview: (
        <AvatarLabel
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
          name="Jane Doe"
          description="Product Designer"
          size="md"
        />
      ),
      description:
        "Use AvatarLabel when showing name + description alongside the avatar.",
    },
    dont: {
      preview: (
        <div className="flex items-center gap-[var(--layout-gap-sm)]">
          <Avatar
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
            alt="Jane"
            size="sm"
          />
          <div className="flex flex-col">
            <span className="text-content-caption">Jane Doe</span>
            <span className="text-content-caption" style={{ color: "var(--text-base-moderate)" }}>Designer</span>
          </div>
        </div>
      ),
      description:
        "Don't manually compose Avatar + text with custom flex layout.",
    },
  },
  {
    do: {
      preview: (
        <AvatarGroup size="sm" max={3}>
          <Avatar initials="JD" alt="Jane" />
          <Avatar initials="JS" alt="John" />
          <Avatar initials="AB" alt="Alice" />
          <Avatar initials="CD" alt="Charlie" />
          <Avatar initials="EF" alt="Eve" />
        </AvatarGroup>
      ),
      description:
        "Use AvatarGroup with max to limit visible avatars in tight spaces.",
    },
    dont: {
      preview: (
        <div className="flex items-center -space-x-2">
          <Avatar initials="JD" alt="Jane" size="sm" />
          <Avatar initials="JS" alt="John" size="sm" />
          <Avatar initials="AB" alt="Alice" size="sm" />
          <Avatar initials="CD" alt="Charlie" size="sm" />
          <Avatar initials="EF" alt="Eve" size="sm" />
          <Avatar initials="FG" alt="Frank" size="sm" />
          <Avatar initials="GH" alt="Grace" size="sm" />
        </div>
      ),
      description:
        "Don't render 10+ avatars without overflow — use max to cap display.",
    },
  },
  {
    do: {
      preview: (
        <AvatarGroup size="sm">
          <Avatar initials="JD" alt="Jane" />
          <Avatar initials="JS" alt="John" />
        </AvatarGroup>
      ),
      description:
        "Use size on AvatarGroup to control all children uniformly.",
    },
    dont: {
      preview: (
        <div className="flex items-center gap-[var(--layout-gap-sm)]">
          <Avatar initials="JD" alt="Jane" size="xs" />
          <Avatar initials="JS" alt="John" size="md" />
          <Avatar initials="AB" alt="Alice" size="sm" />
        </div>
      ),
      description:
        "Don't mix different size props on individual avatars inside a group.",
    },
  },
  {
    do: {
      preview: (
        <Avatar
          initials="AB"
          alt="Company user"
          status="company"
          companySrc="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=40&h=40&fit=crop"
        />
      ),
      description:
        'Pass companySrc when using status="company".',
    },
    dont: {
      preview: <Avatar initials="AB" alt="Company user" status="company" />,
      description:
        'Don\'t use status="company" without a logo URL — renders an empty circle.',
    },
  },
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

const importCode = `import { Avatar } from '@/components/ui/avatar'

export default function Example() {
  return (
    <>
      <Avatar src="/photo.jpg" alt="Jane Doe" />
      <Avatar initials="JS" alt="John Smith" />
      <Avatar alt="Unknown" />
    </>
  )
}`

/* ----------------------------------------------------------------
 * Tabs
 * ---------------------------------------------------------------- */

function OverviewTab() {
  return (
    <div className="flex flex-col gap-12">
      <ComponentPreview
        id="default"
        title="Default"
        description="Basic avatar with an image."
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
        description="Five sizes: xs, sm, md (default), lg, and xl."
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
        description="Displays 1-2 character initials when no image is available."
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
        description="Shows a generic user icon when no src or initials are provided."
      >
        <div className="flex items-center gap-[var(--layout-gap-lg)]">
          <Avatar alt="Unknown user" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="status"
        title="Status"
        description="Presence indicator at bottom-right. Use companySrc for a company logo badge."
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
        description="Pairs an avatar with a name and optional description."
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
        description="Stacks avatars with overlap. Use max to limit visible count."
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
        description="Circular button with a plus icon. Works standalone or inside AvatarGroup."
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

export default function AvatarPage() {
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
            Avatar
          </h1>
          <p
            className="text-content-highlight"
            style={{ color: "var(--text-base-moderate)" }}
          >
            The Avatar component displays a user&apos;s profile picture,
            initials, or placeholder in a recognizable format. It helps
            personalize the interface and identify users across different parts
            of the application.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add https://ui.getlyse.com/r/avatar.json")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <><Copy /> Copy install command</>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a
                href="https://v0.app/chat?q=add%20component%20from%20https%3A%2F%2Fui.getlyse.com%2Fr%2Favatar.json"
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
                <div className="flex items-center gap-[var(--layout-gap-lg)]">
                  <Avatar
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
                    alt="Jane Doe"
                  />
                  <Avatar initials="JS" alt="John Smith" />
                  <Avatar alt="Unknown" />
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
              ? docSections
              : []
        }
      />
    </>
  )
}
