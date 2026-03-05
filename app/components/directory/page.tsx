"use client"

import Link from "next/link"

const components = [
  { name: "ActionCard", href: "/components/action-card" },
  { name: "Avatar", href: "/components/avatar" },
  { name: "Badge", href: "/components/badge" },
  { name: "BannerInfo", href: "/components/banner-info" },
  { name: "Button", href: "/components/button" },
  { name: "CalloutCard", href: "/components/callout-card" },
  { name: "Checkbox", href: "/components/checkbox" },
  { name: "Chip", href: "/components/chip" },
  { name: "DropdownMenu", href: "/components/dropdown-menu" },
  { name: "Input", href: "/components/input" },
  { name: "Menu", href: "/components/menu" },
  { name: "Modal", href: "/components/modal" },
  { name: "Progress", href: "/components/progress" },
  { name: "Radio", href: "/components/radio" },
  { name: "Select", href: "/components/select" },
  { name: "Spinner", href: "/components/spinner" },
  { name: "SpotlightCard", href: "/components/spotlight-card" },
  { name: "Tabs", href: "/components/tabs" },
  { name: "Tag", href: "/components/tag" },
  { name: "Textarea", href: "/components/textarea" },
  { name: "Toast", href: "/components/toast" },
  { name: "Toggle", href: "/components/toggle" },
  { name: "Tooltip", href: "/components/tooltip" },
]

export default function DirectoryPage() {
  return (
    <main className="flex-1 min-w-0 py-16 flex flex-col gap-6 px-8 lg:px-16 xl:px-20">
      <h1
        className="text-heading-large"
        style={{ color: "var(--text-base-strong)" }}
      >
        Components
      </h1>
      <p
        className="text-content-body leading-relaxed"
        style={{ color: "var(--text-base-moderate)" }}
      >
        Here you can find all the components available in the registry. We are
        working on adding more components.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 mt-4">
        {components.map((c) => (
          <Link
            key={c.name}
            href={c.href}
            className="text-content-body font-accent py-1 underline-offset-4 hover:underline transition-colors"
            style={{ color: "var(--text-base-strong)" }}
          >
            {c.name}
          </Link>
        ))}
      </div>
    </main>
  )
}
