"use client"

import { Tag } from "@/registry/new-york/ui/tag/tag"

export default function ChangelogPage() {
  return (
    <main className="flex-1 min-w-0 py-16 flex flex-col gap-6 max-w-none px-8 lg:px-16 xl:px-20">
      <div className="flex flex-col gap-2">
        <h1
          className="font-bold"
          style={{ color: "var(--text-base-strong)", fontSize: "var(--root-font-size-5xl)" }}
        >
          Changelog
        </h1>
        <p
          className="text-content-highlight"
          style={{ color: "var(--text-base-moderate)" }}
        >
          Latest updates and releases.
        </p>
      </div>

      {/* March 2026 */}
      <div
        className="flex flex-col gap-5 rounded-[var(--layout-radius-xl)] p-[var(--layout-padding-2xl)]"
        style={{
          border: "var(--layout-border-thin) solid var(--border-default)",
          background: "var(--background-neutral-faint-default)",
        }}
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h2
              className="text-heading-small"
              style={{ color: "var(--text-base-strong)" }}
            >
              Hello world
            </h2>
            <Tag variant="success" size="sm">v1.0</Tag>
          </div>
          <span
            className="text-content-caption"
            style={{ color: "var(--text-base-faint)" }}
          >
            09.03.26
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <ChangelogItem
            title="23 components"
            description="Button, Badge, Tag, Tooltip, Toast, Menu, Checkbox, Radio, Toggle, BannerInfo, Avatar, DropdownMenu, Select, Input, Textarea, Modal, Spinner, Progress, Chip, Tabs, ActionCard, SpotlightCard, CalloutCard."
          />
          <ChangelogItem
            title="Design tokens"
            description="3-layer token architecture (primitives, semantics, shadcn bridge) with full light and dark mode support."
          />
          <ChangelogItem
            title="Documentation site"
            description="Component pages with live previews, props tables, best practices, and usage examples."
          />
          <ChangelogItem
            title="Registry"
            description="shadcn-compatible format. Install any component with a single CLI command."
          />
          <ChangelogItem
            title="v0 integration"
            description="Add any component to v0 directly from its documentation page."
          />
        </div>
      </div>
    </main>
  )
}

function ChangelogItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span
        className="text-content-note font-accent"
        style={{ color: "var(--text-base-strong)" }}
      >
        {title}
      </span>
      <span
        className="text-content-note"
        style={{ color: "var(--text-base-moderate)" }}
      >
        {description}
      </span>
    </div>
  )
}
