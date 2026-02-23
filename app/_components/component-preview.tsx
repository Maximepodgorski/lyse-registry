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
    <section id={id} className="flex flex-col gap-3 scroll-mt-20">
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
        className="overflow-hidden rounded-xl"
        style={{
          border: "var(--layout-border-thin) solid var(--border-default)",
        }}
      >
        <div
          className="flex items-center flex-wrap gap-4 px-8 py-10"
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
