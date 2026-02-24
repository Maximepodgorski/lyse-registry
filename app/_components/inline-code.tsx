import * as React from "react"

export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code
      className="text-content-caption px-[var(--layout-padding-sm)] py-[var(--layout-padding-2xs)] rounded-[var(--layout-radius-sm)]"
      style={{
        fontFamily: "var(--font-geist-mono)",
        background: "var(--background-neutral-faint-default)",
        color: "var(--text-base-strong)",
      }}
    >
      {children}
    </code>
  )
}
