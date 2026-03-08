import * as React from "react"
import { Check, X } from "lucide-react"

export type DosDontsItem = {
  do: {
    preview?: React.ReactNode
    description: string
  }
  dont: {
    preview?: React.ReactNode
    description: string
  }
}

export function DosDonts({
  id,
  title = "Do / Don't",
  items,
}: {
  id: string
  title?: string
  items: DosDontsItem[]
}) {
  return (
    <section
      id={id}
      className="flex flex-col gap-[var(--layout-gap-lg)] scroll-mt-[110px]"
    >
      <h3
        className="text-heading-small"
        style={{ color: "var(--text-base-strong)" }}
      >
        {title}
      </h3>

      <div className="flex flex-col gap-[var(--layout-gap-3xl)]">
        {items.map((item, i) => (
          <div
            key={i}
            className="grid grid-cols-1 md:grid-cols-2 gap-[var(--layout-gap-3xl)]"
          >
            {/* Do */}
            <div
              className="grid gap-[var(--layout-gap-md)]"
              style={{ gridTemplateRows: "auto 1fr auto" }}
            >
              <div className="flex items-center gap-[var(--layout-gap-sm)]">
                <div
                  className="flex items-center justify-center w-5 h-5 rounded-full"
                  style={{
                    background: "var(--background-success-faint-default)",
                  }}
                >
                  <Check
                    size={12}
                    strokeWidth={2.5}
                    style={{ color: "var(--icon-success-moderate)" }}
                  />
                </div>
                <span
                  className="text-content-note font-accent"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  Do
                </span>
              </div>
              {item.do.preview ? (
                <div
                  className="overflow-hidden rounded-[var(--layout-radius-xl)]"
                  style={{
                    border:
                      "var(--layout-border-thin) solid var(--border-default)",
                  }}
                >
                  <div
                    className="flex items-center justify-center flex-wrap gap-[var(--layout-gap-xl)] px-[var(--layout-padding-3xl)] py-[var(--layout-padding-4xl)] h-full"
                    style={{
                      background: "var(--background-neutral-faint-default)",
                    }}
                  >
                    {item.do.preview}
                  </div>
                </div>
              ) : (
                <div />
              )}
              <p
                className="text-content-note"
                style={{ color: "var(--text-base-moderate)" }}
              >
                {item.do.description}
              </p>
            </div>

            {/* Don't */}
            <div
              className="grid gap-[var(--layout-gap-md)]"
              style={{ gridTemplateRows: "auto 1fr auto" }}
            >
              <div className="flex items-center gap-[var(--layout-gap-sm)]">
                <div
                  className="flex items-center justify-center w-5 h-5 rounded-full"
                  style={{
                    background: "var(--background-danger-faint-default)",
                  }}
                >
                  <X
                    size={12}
                    strokeWidth={2.5}
                    style={{ color: "var(--icon-danger-moderate)" }}
                  />
                </div>
                <span
                  className="text-content-note font-accent"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  Don&apos;t
                </span>
              </div>
              {item.dont.preview ? (
                <div
                  className="overflow-hidden rounded-[var(--layout-radius-xl)]"
                  style={{
                    border:
                      "var(--layout-border-thin) solid var(--border-default)",
                  }}
                >
                  <div
                    className="flex items-center justify-center flex-wrap gap-[var(--layout-gap-xl)] px-[var(--layout-padding-3xl)] py-[var(--layout-padding-4xl)] h-full"
                    style={{
                      background: "var(--background-neutral-faint-default)",
                    }}
                  >
                    {item.dont.preview}
                  </div>
                </div>
              ) : (
                <div />
              )}
              <p
                className="text-content-note"
                style={{ color: "var(--text-base-moderate)" }}
              >
                {item.dont.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
