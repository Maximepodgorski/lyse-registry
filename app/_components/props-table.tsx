import * as React from "react"

export type PropDef = {
  name: string
  type: string[]
  default?: string
  required?: boolean
  description: string
}

function TypeTag({
  children,
  isDefault,
}: {
  children: React.ReactNode
  isDefault?: boolean
}) {
  return (
    <span
      className="text-content-caption font-mono inline-flex px-1.5 py-0.5 rounded-md"
      style={{
        background: isDefault
          ? "var(--background-neutral-strong-default)"
          : "var(--background-neutral-faint-default)",
        color: isDefault
          ? "var(--text-inverse)"
          : "var(--text-base-moderate)",
      }}
    >
      {children}
    </span>
  )
}

export function PropsTable({
  propDefs,
  extendsType,
}: {
  propDefs: PropDef[]
  extendsType?: string
}) {
  return (
    <div className="flex flex-col gap-4">
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
        className="overflow-hidden rounded-xl overflow-x-auto"
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
              <th className="text-left font-accent px-5 py-3">Prop</th>
              <th className="text-left font-accent px-5 py-3">Type</th>
              <th className="text-left font-accent px-5 py-3">Default</th>
              <th className="text-left font-accent px-5 py-3">Description</th>
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
                <td className="px-5 py-4 align-top">
                  <div className="flex items-center gap-2">
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
                <td className="px-5 py-4 align-top">
                  <div className="flex flex-wrap gap-1">
                    {p.type.map((t) => (
                      <TypeTag key={t}>{t}</TypeTag>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-4 align-top">
                  {p.default ? (
                    <TypeTag isDefault>{p.default}</TypeTag>
                  ) : (
                    <span style={{ color: "var(--text-base-moderate)" }}>
                      —
                    </span>
                  )}
                </td>
                <td
                  className="px-5 py-4 align-top text-content-note"
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
