"use client"

export default function ChangelogPage() {
  return (
    <main className="flex-1 min-w-0 py-16 flex flex-col gap-6 max-w-none px-8 lg:px-16 xl:px-20">
      <h1
        className="font-bold"
        style={{ color: "var(--text-base-strong)", fontSize: "var(--root-font-size-5xl)" }}
      >
        Changelog
      </h1>
      <p
        className="text-content-highlight leading-relaxed"
        style={{ color: "var(--text-base-moderate)" }}
      >
        Latest updates and releases.
      </p>

      {/* March 2026 */}
      <section className="flex flex-col gap-4 mt-4">
        <div className="flex flex-col gap-1">
          <h2
            className="text-heading-small"
            style={{ color: "var(--text-base-strong)" }}
          >
            March 2026
          </h2>
          <span
            className="text-content-caption"
            style={{ color: "var(--text-base-moderate)" }}
          >
            Initial release
          </span>
        </div>
        <ul
          className="flex flex-col gap-2 text-content-body leading-relaxed list-disc pl-5"
          style={{ color: "var(--text-base-moderate)" }}
        >
          <li>
            <strong style={{ color: "var(--text-base-strong)" }}>
              23 components
            </strong>{" "}
            — Button, Badge, Tag, Tooltip, Toast, Menu, Checkbox, Radio, Toggle,
            BannerInfo, Avatar, DropdownMenu, Select, Input, Textarea, Modal,
            Spinner, Progress, Chip, Tabs, ActionCard, SpotlightCard,
            CalloutCard.
          </li>
          <li>
            <strong style={{ color: "var(--text-base-strong)" }}>
              Design tokens
            </strong>{" "}
            — 3-layer token architecture (primitives, semantics, shadcn bridge)
            with full light and dark mode support.
          </li>
          <li>
            <strong style={{ color: "var(--text-base-strong)" }}>
              Documentation site
            </strong>{" "}
            — Component pages with live previews, props tables, and usage
            examples.
          </li>
          <li>
            <strong style={{ color: "var(--text-base-strong)" }}>
              Registry
            </strong>{" "}
            — shadcn-compatible registry format. Install any component with a
            single CLI command.
          </li>
        </ul>
      </section>
    </main>
  )
}
