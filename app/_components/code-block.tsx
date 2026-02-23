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
      className="flex flex-col overflow-hidden rounded-xl"
      style={{ border: "1px solid var(--root-color-neutral-800)" }}
    >
      <div
        className="flex items-center justify-center py-16"
        style={{ background: "var(--root-color-neutral-950)" }}
      >
        {preview}
      </div>
      <pre
        className="text-content-caption font-mono p-5 overflow-x-auto leading-relaxed"
        style={{
          background: "var(--root-color-neutral-900)",
          color: "var(--root-color-neutral-300)",
          borderTop: "1px solid var(--root-color-neutral-800)",
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  )
}
