import * as React from "react"

export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code
      className="text-content-caption px-[4px] py-[var(--layout-padding-2xs)] rounded-[var(--layout-radius-md)]"
      style={{
        fontFamily: "var(--font-geist-mono)",
        background: "var(--background-neutral-faint-default)",
        border: "var(--layout-border-thin) solid var(--border-default)",
        color: "var(--text-base-bolder)",
      }}
    >
      {children}
    </code>
  )
}
