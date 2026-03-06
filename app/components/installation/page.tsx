"use client"

import { Copy } from "lucide-react"
import { toast } from "@/registry/new-york/ui/toast/toast"

function CopyButton({ text }: { text: string }) {
  return (
    <button
      onClick={() => {
        navigator.clipboard
          .writeText(text)
          .then(() => toast.success("Copied to clipboard"))
          .catch(() => {})
      }}
      className="absolute top-3 right-3 p-1.5 rounded-[var(--layout-radius-sm)] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
      style={{
        color: "var(--text-base-moderate)",
        background: "var(--background-neutral-faint-default)",
      }}
      aria-label="Copy to clipboard"
    >
      <Copy className="size-3.5" />
    </button>
  )
}

function CommandBlock({ command }: { command: string }) {
  return (
    <div className="relative group">
      <pre
        className="text-content-caption font-mono p-[var(--layout-padding-xl)] rounded-[var(--layout-radius-lg)] overflow-x-auto leading-relaxed"
        style={{
          background: "var(--background-neutral-faint-default)",
          color: "var(--text-base-moderate)",
          border: "var(--layout-border-thin) solid var(--border-default)",
        }}
      >
        <code>{command}</code>
      </pre>
      <CopyButton text={command} />
    </div>
  )
}

const installCommand =
  "npx shadcn@latest add https://lyse-registry.vercel.app/r/button.json"

export default function InstallationPage() {
  return (
    <main className="flex-1 min-w-0 py-16 flex flex-col gap-6 max-w-none px-8 lg:px-16 xl:px-20">
      <h1
        className="text-heading-large"
        style={{ color: "var(--text-base-strong)" }}
      >
        Installation
      </h1>
      <p
        className="text-content-body leading-relaxed"
        style={{ color: "var(--text-base-moderate)" }}
      >
        How to install components from the Lyse UI registry.
      </p>

      {/* Add components */}
      <p
        className="text-content-body leading-relaxed"
        style={{ color: "var(--text-base-moderate)" }}
      >
        Use the shadcn CLI to add any component to your project. Dependencies
        and design tokens are resolved automatically.
      </p>

      <CommandBlock command={installCommand} />

      <p
        className="text-content-body leading-relaxed"
        style={{ color: "var(--text-base-moderate)" }}
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
          button
        </code>{" "}
        with any component name. See the full list on the{" "}
        <a
          href="/components/directory"
          className="underline underline-offset-4"
          style={{ color: "var(--text-base-strong)" }}
        >
          Components
        </a>{" "}
        page.
      </p>

      {/* Usage */}
      <h2
        className="text-heading-small mt-6"
        style={{ color: "var(--text-base-strong)" }}
      >
        Usage
      </h2>
      <p
        className="text-content-body leading-relaxed"
        style={{ color: "var(--text-base-moderate)" }}
      >
        Import the component and use it in your app:
      </p>
      <div className="relative group">
        <pre
          className="text-content-caption font-mono p-[var(--layout-padding-xl)] rounded-[var(--layout-radius-lg)] overflow-x-auto leading-relaxed"
          style={{
            background: "var(--background-neutral-faint-default)",
            color: "var(--text-base-moderate)",
            border: "var(--layout-border-thin) solid var(--border-default)",
          }}
        >
          <code>{`import { Button } from '@/components/ui/button'

export default function App() {
  return <Button>Click me</Button>
}`}</code>
        </pre>
        <CopyButton
          text={`import { Button } from '@/components/ui/button'

export default function App() {
  return <Button>Click me</Button>
}`}
        />
      </div>
    </main>
  )
}
