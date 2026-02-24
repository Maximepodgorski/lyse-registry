import * as React from "react"
import { Badge } from "@/registry/new-york/ui/badge/badge"

export type PropDef = {
  name: string
  type: string[]
  default?: string
  required?: boolean
  description: string
}

export function PropsTable({
  propDefs,
  extendsType,
}: {
  propDefs: PropDef[]
  extendsType?: string
}) {
  return (
    <div className="flex flex-col gap-[var(--layout-gap-xl)]">
      {extendsType && (
        <p
          className="text-content-note"
          style={{ color: "var(--text-base-moderate)" }}
        >
          Extends{" "}
          <code
            className="font-mono"
            style={{ color: "var(--text-base-strong)" }}
          >
            {extendsType}
          </code>{" "}
          — all native attributes are forwarded.
        </p>
      )}
      <div
        className="overflow-hidden rounded-[var(--layout-radius-xl)] overflow-x-auto"
        style={{
          border: "var(--layout-border-thin) solid var(--border-default)",
        }}
      >
        <table className="w-full text-content-caption">
          <thead>
            <tr
              style={{
                background: "var(--background-neutral-faint-default)",
                color: "var(--text-base-moderate)",
              }}
            >
              <th className="text-left font-accent px-[var(--layout-padding-xl)] py-[var(--layout-padding-lg)]">Prop</th>
              <th className="text-left font-accent px-[var(--layout-padding-xl)] py-[var(--layout-padding-lg)]">Type</th>
              <th className="text-left font-accent px-[var(--layout-padding-xl)] py-[var(--layout-padding-lg)]">Default</th>
              <th className="text-left font-accent px-[var(--layout-padding-xl)] py-[var(--layout-padding-lg)]">Description</th>
            </tr>
          </thead>
          <tbody>
            {propDefs.map((p) => (
              <tr
                key={p.name}
                style={{
                  borderTop:
                    "var(--layout-border-thin) solid var(--border-default)",
                }}
              >
                <td className="px-[var(--layout-padding-xl)] py-[var(--layout-padding-xl)] align-top">
                  <div className="flex items-center gap-[var(--layout-gap-md)]">
                    <code
                      className="font-mono font-bold"
                      style={{ color: "var(--text-base-strong)" }}
                    >
                      {p.name}
                    </code>
                    {p.required && (
                      <span
                        className="text-content-caption"
                        style={{ color: "var(--text-danger-moderate)" }}
                      >
                        *
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-[var(--layout-padding-xl)] py-[var(--layout-padding-xl)] align-top">
                  <div className="flex flex-wrap gap-[var(--layout-gap-sm)]">
                    {p.type.map((t) => (
                      <Badge key={t} variant="neutral" type="light" size="sm" className="font-mono">{t}</Badge>
                    ))}
                  </div>
                </td>
                <td className="px-[var(--layout-padding-xl)] py-[var(--layout-padding-xl)] align-top">
                  {p.default ? (
                    <Badge variant="neutral" type="fill" size="sm" className="font-mono">{p.default}</Badge>
                  ) : (
                    <span style={{ color: "var(--text-base-moderate)" }}>
                      —
                    </span>
                  )}
                </td>
                <td
                  className="px-[var(--layout-padding-xl)] py-[var(--layout-padding-xl)] align-top text-content-note"
                  style={{ color: "var(--text-base-moderate)" }}
                >
                  {p.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
