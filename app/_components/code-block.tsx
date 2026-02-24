import * as React from "react"

export function CodeBlock({
  preview,
  code,
}: {
  preview: React.ReactNode
  code: React.ReactNode
}) {
  return (
    <div
      className="flex flex-col overflow-hidden rounded-[var(--layout-radius-xl)]"
      style={{
        border: "var(--layout-border-thin) solid var(--border-default)",
      }}
    >
      <div
        className="flex items-center justify-center py-[var(--root-space-11)]"
        style={{ background: "var(--background-neutral-faint-default)" }}
      >
        {preview}
      </div>
      <pre
        className="text-content-caption font-mono p-[var(--layout-padding-xl)] overflow-x-auto leading-relaxed"
        style={{
          background: "var(--background-neutral-faint-default)",
          color: "var(--text-base-moderate)",
          borderTop:
            "var(--layout-border-thin) solid var(--border-default)",
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  )
}
