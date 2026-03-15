"use client"

import { CodeBlock } from "@/app/_components/code-block"

const registryUrl = "https://ui.getlyse.com/r"

const installCommand = `npx shadcn@latest add ${registryUrl}/button.json`

const allComponents = [
  "action-card",
  "alert",
  "alert-dialog",
  "avatar",
  "badge",
  "banner-info",
  "breadcrumb",
  "button",
  "callout-card",
  "card",
  "checkbox",
  "chip",
  "dropdown-menu",
  "input",
  "menu",
  "modal",
  "popover",
  "progress",
  "radio",
  "select",
  "separator",
  "skeleton",
  "spinner",
  "spotlight-card",
  "table",
  "tabs",
  "tag",
  "textarea",
  "toast",
  "toggle",
  "tooltip",
]

const installAllCommand = `npx shadcn@latest add \\\n${allComponents.map((c) => `  ${registryUrl}/${c}.json`).join(" \\\n")}`

const tokensCommand = `npx shadcn@latest add ${registryUrl}/lyse-tokens.json`

const usageCode = `import { Button } from '@/components/ui/button'

export default function App() {
  return <Button>Click me</Button>
}`

export default function InstallationPage() {
  return (
    <main className="flex-1 min-w-0 py-16 flex flex-col gap-2 max-w-none px-5 sm:px-8 lg:px-16 xl:px-20">
      <h1
        className="font-bold"
        style={{ color: "var(--text-base-strong)", fontSize: "var(--root-font-size-5xl)" }}
      >
        Installation
      </h1>
      <p
        className="text-content-highlight mb-4"
        style={{ color: "var(--text-base-bolder)" }}
      >
        How to install components from the Lyse UI registry.
      </p>

      {/* Add components */}
      <p
        className="text-content-body leading-relaxed"
        style={{ color: "var(--text-base-bolder)" }}
      >
        Use the shadcn CLI to add any component to your project. Dependencies
        and design tokens are resolved automatically.
      </p>

      <div className="mt-2">
        <CodeBlock
          codeString={installCommand}
          language="bash"
          fileName="Terminal"
          defaultExpanded
        />
      </div>

      <p
        className="text-content-body leading-relaxed"
        style={{ color: "var(--text-base-bolder)" }}
      >
        Replace{" "}
        <code
          className="text-content-caption px-1 py-0.5 rounded-[var(--layout-radius-sm)]"
          style={{
            fontFamily: "var(--font-geist-mono)",
            background: "var(--background-neutral-faint-default)",
            color: "var(--text-base-strong)",
          }}
        >
          button.json
        </code>{" "}
        with any component name. See the full list on the{" "}
        <a
          href="/components/directory"
          className="underline underline-offset-4"
          style={{ color: "var(--text-brand-moderate)" }}
        >
          Components
        </a>{" "}
        page.
      </p>

      {/* Tokens only */}
      <h2
        className="text-heading-small mt-6"
        style={{ color: "var(--text-base-strong)" }}
      >
        Install tokens only
      </h2>
      <p
        className="text-content-body leading-relaxed"
        style={{ color: "var(--text-base-bolder)" }}
      >
        Tokens are installed automatically with any component. If you only need
        the design tokens (colors, typography, spacing, radius), install them
        standalone:
      </p>
      <div className="mt-2">
        <CodeBlock
          codeString={tokensCommand}
          language="bash"
          fileName="Terminal"
          defaultExpanded
        />
      </div>

      {/* Install all */}
      <h2
        className="text-heading-small mt-6"
        style={{ color: "var(--text-base-strong)" }}
      >
        Install all components
      </h2>
      <p
        className="text-content-body leading-relaxed"
        style={{ color: "var(--text-base-bolder)" }}
      >
        To add every component at once, run the following command. Design tokens
        and dependencies are resolved automatically.
      </p>
      <div className="mt-2">
        <CodeBlock
          codeString={installAllCommand}
          language="bash"
          fileName="Terminal"
          defaultExpanded
        />
      </div>

      {/* Usage */}
      <h2
        className="text-heading-small mt-6"
        style={{ color: "var(--text-base-strong)" }}
      >
        Usage
      </h2>
      <p
        className="text-content-body leading-relaxed"
        style={{ color: "var(--text-base-bolder)" }}
      >
        Import the component and use it in your app:
      </p>
      <div className="mt-2">
        <CodeBlock
          codeString={usageCode}
          language="tsx"
          fileName="app.tsx"
          defaultExpanded
        />
      </div>
    </main>
  )
}
