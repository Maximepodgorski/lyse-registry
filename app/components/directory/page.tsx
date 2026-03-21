"use client"

import Link from "next/link"

const components = [
  { name: "ActionCard", href: "/components/action-card" },
  { name: "Alert", href: "/components/alert" },
  { name: "AlertDialog", href: "/components/alert-dialog" },
  { name: "Avatar", href: "/components/avatar" },
  { name: "Badge", href: "/components/badge" },
  { name: "BannerInfo", href: "/components/banner-info" },
  { name: "Breadcrumb", href: "/components/breadcrumb" },
  { name: "Button", href: "/components/button" },
  { name: "CalloutCard", href: "/components/callout-card" },
  { name: "Card", href: "/components/card" },
  { name: "Checkbox", href: "/components/checkbox" },
  { name: "Chip", href: "/components/chip" },
  { name: "DropdownMenu", href: "/components/dropdown-menu" },
  { name: "Input", href: "/components/input" },
  { name: "Menu", href: "/components/menu" },
  { name: "Modal", href: "/components/modal" },
  { name: "Popover", href: "/components/popover" },
  { name: "Progress", href: "/components/progress" },
  { name: "Radio", href: "/components/radio" },
  { name: "Select", href: "/components/select" },
  { name: "Separator", href: "" }, /* no doc page — utility component, registry-only */
  { name: "Skeleton", href: "/components/skeleton" },
  { name: "Spinner", href: "/components/spinner" },
  { name: "Stepper", href: "/components/stepper" },
  { name: "SpotlightCard", href: "/components/spotlight-card" },
  { name: "Table", href: "/components/table" },
  { name: "Tabs", href: "/components/tabs" },
  { name: "Tag", href: "/components/tag" },
  { name: "Textarea", href: "/components/textarea" },
  { name: "Toast", href: "/components/toast" },
  { name: "Toggle", href: "/components/toggle" },
  { name: "Tooltip", href: "/components/tooltip" },
]

export default function DirectoryPage() {
  return (
    <main className="flex-1 min-w-0 py-16 flex flex-col gap-6 px-5 sm:px-8 lg:px-16 xl:px-20">
      <div className="flex flex-col gap-2">
        <h1
          className="font-bold"
          style={{ color: "var(--text-base-strong)", fontSize: "var(--root-font-size-5xl)" }}
        >
          Components
        </h1>
        <p
          className="text-content-highlight leading-relaxed"
          style={{ color: "var(--text-base-bolder)" }}
        >
          Here you can find all the components available in the registry. We are
          working on adding more components.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 mt-4">
        {components.map((c) =>
          c.href ? (
            <Link
              key={c.name}
              href={c.href}
              className="text-content-body font-accent py-1 underline-offset-4 hover:underline transition-colors"
              style={{ color: "var(--text-base-strong)" }}
            >
              {c.name}
            </Link>
          ) : (
            <span
              key={c.name}
              className="text-content-body font-accent py-1"
              style={{ color: "var(--text-base-default)" }}
            >
              {c.name}
            </span>
          )
        )}
      </div>
    </main>
  )
}
