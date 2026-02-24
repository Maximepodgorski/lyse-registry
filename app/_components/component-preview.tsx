import * as React from "react"

export function ComponentPreview({
  id,
  title,
  description,
  children,
}: {
  id: string
  title: string
  description?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section id={id} className="flex flex-col gap-[var(--layout-gap-lg)] scroll-mt-[110px]">
      <h3
        className="text-heading-small"
        style={{ color: "var(--text-base-strong)" }}
      >
        {title}
      </h3>
      {description && (
        <p
          className="text-content-note"
          style={{ color: "var(--text-base-moderate)" }}
        >
          {description}
        </p>
      )}
      <div
        className="overflow-hidden rounded-[var(--layout-radius-xl)]"
        style={{
          border: "var(--layout-border-thin) solid var(--border-default)",
        }}
      >
        <div
          className="flex items-center flex-wrap gap-[var(--layout-gap-xl)] px-[var(--layout-padding-3xl)] py-[var(--layout-padding-4xl)]"
          style={{
            background: "var(--background-neutral-faint-default)",
          }}
        >
          {children}
        </div>
      </div>
    </section>
  )
}
