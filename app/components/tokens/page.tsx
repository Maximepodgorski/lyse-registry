"use client"

import { useState, useMemo, Fragment } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/new-york/ui/table/table"
import { Tag } from "@/registry/new-york/ui/tag/tag"
import { BannerInfo } from "@/registry/new-york/ui/banner-info/banner-info"
import { toast } from "@/registry/new-york/ui/toast/toast"
import { InlineCode } from "@/app/_components/inline-code"
import { CodeBlock } from "@/app/_components/code-block"
import {
  TableOfContents,
  type TocSection,
} from "@/app/_components/table-of-contents"
import {
  semanticGroups,
  primitiveGroups,
  bridgeGroups,
  type TokenEntry,
  type TokenGroup,
  type BridgeEntry,
  type BridgeGroup,
} from "@/lib/token-data"
import "./tokens.css"

/* ----------------------------------------------------------------
 * Data
 * ---------------------------------------------------------------- */

type Tab = "semantic" | "primitive" | "bridge"

const architectureCode = `Primitives (root-*.css)         ← Layer 1: Raw values
  --root-color-brand-500, --root-space-4
         ↓
Semantics (semantic-*.css)      ← Layer 2: Use this in components
  --background-brand-strong-default, --text-base-strong
         ↓
Bridge (shadcn-bridge.css)      ← Layer 3: shadcn/Tailwind utilities
  --primary, --foreground, --ring`

function tocForTab(tab: Tab): TocSection[] {
  if (tab === "semantic") {
    return semanticGroups.map((g) => ({ id: g.id, label: g.label }))
  }
  if (tab === "primitive") {
    return primitiveGroups.map((g) => ({ id: g.id, label: g.label }))
  }
  return bridgeGroups.map((g) => ({ id: g.id, label: g.label }))
}

/* ----------------------------------------------------------------
 * Helpers
 * ---------------------------------------------------------------- */

function copyToken(name: string) {
  navigator.clipboard
    .writeText(`var(--${name})`)
    .then(() => toast.success("Copied to clipboard"))
    .catch(() => {})
}

/** Convert short primitive reference to full CSS custom property name */
function primitiveVarName(value: string): string {
  if (value.startsWith("#") || value.includes("oklch") || value.includes("("))
    return value
  if (value.startsWith("opacity-")) return `root-${value}`
  return `root-color-${value}`
}

/** Check if a value is a CSS variable reference (vs raw value) */
function isVarRef(value: string): boolean {
  return (
    !value.startsWith("#") &&
    !value.includes("oklch") &&
    !value.includes("(")
  )
}

/** Group consecutive default/hover/pressed tokens into state groups */
function groupByState(
  tokens: TokenEntry[],
): (TokenEntry | TokenEntry[])[] {
  const result: (TokenEntry | TokenEntry[])[] = []
  let i = 0
  while (i < tokens.length) {
    const t = tokens[i]
    if (t.name.endsWith("-default") && i + 2 < tokens.length) {
      const base = t.name.slice(0, -"-default".length)
      const next1 = tokens[i + 1]
      const next2 = tokens[i + 2]
      if (
        next1.name === `${base}-hover` &&
        next2.name === `${base}-pressed`
      ) {
        result.push([t, next1, next2])
        i += 3
        continue
      }
    }
    result.push(t)
    i++
  }
  return result
}

/** Check if a group contains color tokens */
function isColorGroup(group: TokenGroup): boolean {
  if (group.tokens?.length) return group.tokens[0].type === "color"
  if (group.subGroups?.length)
    return group.subGroups[0].tokens[0]?.type === "color"
  return false
}

/** Get representative swatch CSS value for a palette sub-group */
function subGroupSwatchVar(subGroupId: string): string | null {
  const palettes = ["brand", "danger", "neutral", "success", "warning"]
  for (const p of palettes) {
    if (subGroupId.endsWith(`-${p}`)) return `var(--root-color-${p}-500)`
  }
  return null
}


/* ----------------------------------------------------------------
 * Cell Components
 * ---------------------------------------------------------------- */

/** Clickable token name chip with optional inline swatch */
function TokenChip({
  name,
  isColor = true,
}: {
  name: string
  isColor?: boolean
}) {
  return (
    <button
      type="button"
      className="token-chip-btn"
      onClick={() => copyToken(name)}
      title={`Click to copy var(--${name})`}
    >
      <Tag variant="neutral" type="ghost" size="sm">
        {isColor && (
          <span
            className="token-swatch"
            style={{ background: `var(--${name})` }}
          />
        )}
        <span className="token-chip-name">--{name}</span>
      </Tag>
    </button>
  )
}

/** Passive primitive token reference with optional swatch */
function PrimitiveRef({ value }: { value?: string }) {
  if (!value) return null
  const fullName = primitiveVarName(value)
  const showSwatch = isVarRef(value)
  return (
    <Tag variant="neutral" type="ghost" size="sm">
      {showSwatch && (
        <span
          className="token-swatch"
          style={{ background: `var(--${fullName})` }}
        />
      )}
      <span className="token-chip-name">--{fullName}</span>
    </Tag>
  )
}

/* ----------------------------------------------------------------
 * Semantic Tab — Row Renderers
 * ---------------------------------------------------------------- */

/** Render semantic color token rows with state grouping */
function SemanticColorRows({ tokens }: { tokens: TokenEntry[] }) {
  const grouped = groupByState(tokens)
  return (
    <>
      {grouped.map((item) => {
        if (Array.isArray(item)) {
          const [def, ...children] = item
          return (
            <Fragment key={def.name}>
              <TableRow>
                <TableCell>
                  <TokenChip name={def.name} />
                </TableCell>
                <TableCell>
                  <PrimitiveRef value={def.value} />
                </TableCell>
                <TableCell>
                  {def.usage && (
                    <span className="token-usage">{def.usage}</span>
                  )}
                </TableCell>
              </TableRow>
              {children.map((child) => (
                <TableRow key={child.name}>
                  <TableCell>
                    <div className="token-state-indent">
                      <TokenChip name={child.name} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="token-state-indent">
                      <PrimitiveRef value={child.value} />
                    </div>
                  </TableCell>
                  <TableCell />
                </TableRow>
              ))}
            </Fragment>
          )
        }
        return (
          <TableRow key={item.name}>
            <TableCell>
              <TokenChip name={item.name} />
            </TableCell>
            <TableCell>
              <PrimitiveRef value={item.value} />
            </TableCell>
            <TableCell>
              {item.usage && (
                <span className="token-usage">{item.usage}</span>
              )}
            </TableCell>
          </TableRow>
        )
      })}
    </>
  )
}

/** Render semantic value token rows (layout, typography) */
function SemanticValueRows({ tokens }: { tokens: TokenEntry[] }) {
  return (
    <>
      {tokens.map((t) => (
        <TableRow key={t.name}>
          <TableCell>
            <TokenChip name={t.name} isColor={false} />
          </TableCell>
          <TableCell>
            <Tag variant="neutral" type="ghost" size="sm">
              {t.value}
            </Tag>
          </TableCell>
          <TableCell>
            {t.usage && (
              <Tag variant="brand" type="ghost" size="sm">
                {t.usage}
              </Tag>
            )}
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}

/* ----------------------------------------------------------------
 * Semantic Tab — Group Section
 * ---------------------------------------------------------------- */

function SemanticGroupSection({ group }: { group: TokenGroup }) {
  const color = isColorGroup(group)

  return (
    <section id={group.id} className="flex flex-col gap-4">
      <h3
        className="text-heading-small"
        style={{ color: "var(--text-base-strong)" }}
      >
        {group.label}
      </h3>
      <p
        className="text-content-note"
        style={{ color: "var(--text-base-bolder)" }}
      >
        {group.description}
      </p>
      <Table className="token-table">
        <TableHeader>
          <TableRow>
            {color ? (
              <>
                <TableHead className="token-col-name">Semantic token</TableHead>
                <TableHead className="token-col-value">Primitive token</TableHead>
                <TableHead className="token-col-usage">Function</TableHead>
              </>
            ) : (
              <>
                <TableHead className="token-col-name">Token</TableHead>
                <TableHead className="token-col-value">Value</TableHead>
                <TableHead className="token-col-usage">Reference</TableHead>
              </>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {group.subGroups
            ? group.subGroups.map((sg) => (
                <Fragment key={sg.id}>
                  <TableRow>
                    <TableCell colSpan={3} className="token-subgroup-cell">
                      <span className="token-subgroup-label">
                        {subGroupSwatchVar(sg.id) && (
                          <span
                            className="token-swatch"
                            style={{
                              background: subGroupSwatchVar(sg.id)!,
                            }}
                          />
                        )}
                        {sg.label}
                      </span>
                    </TableCell>
                  </TableRow>
                  {color ? (
                    <SemanticColorRows tokens={sg.tokens} />
                  ) : (
                    <SemanticValueRows tokens={sg.tokens} />
                  )}
                </Fragment>
              ))
            : group.tokens &&
              (color ? (
                <SemanticColorRows tokens={group.tokens} />
              ) : (
                <SemanticValueRows tokens={group.tokens} />
              ))}
        </TableBody>
      </Table>
    </section>
  )
}

/* ----------------------------------------------------------------
 * Primitive Tab — Group Section
 * ---------------------------------------------------------------- */

function PrimitiveGroupSection({ group }: { group: TokenGroup }) {
  const color = isColorGroup(group)

  return (
    <section id={group.id} className="flex flex-col gap-4">
      <h3
        className="text-heading-small"
        style={{ color: "var(--text-base-strong)" }}
      >
        {group.label}
      </h3>
      <p
        className="text-content-note"
        style={{ color: "var(--text-base-bolder)" }}
      >
        {group.description}
      </p>
      <Table className="token-table">
        <TableHeader>
          <TableRow>
            {color ? (
              <>
                <TableHead className="token-col-half">Token</TableHead>
                <TableHead className="token-col-half">Value</TableHead>
              </>
            ) : (
              <>
                <TableHead className="token-col-name">Token</TableHead>
                <TableHead className="token-col-value">Value</TableHead>
                <TableHead className="token-col-usage">Usage</TableHead>
              </>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {group.subGroups
            ? group.subGroups.map((sg) => (
                <Fragment key={sg.id}>
                  <TableRow>
                    <TableCell
                      colSpan={color ? 2 : 3}
                      className="token-subgroup-cell"
                    >
                      <span className="token-subgroup-label">{sg.label}</span>
                    </TableCell>
                  </TableRow>
                  {sg.tokens.map((t) => (
                    <TableRow key={t.name}>
                      <TableCell>
                        <TokenChip
                          name={t.name}
                          isColor={t.type === "color"}
                        />
                      </TableCell>
                      <TableCell>
                        {t.value && (
                          <Tag variant="neutral" type="ghost" size="sm">
                            {t.value}
                          </Tag>
                        )}
                      </TableCell>
                      {!color && (
                        <TableCell>
                          {t.usage && (
                            <span className="token-usage">{t.usage}</span>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </Fragment>
              ))
            : group.tokens?.map((t) => (
                <TableRow key={t.name}>
                  <TableCell>
                    <TokenChip
                      name={t.name}
                      isColor={t.type === "color"}
                    />
                  </TableCell>
                  <TableCell>
                    {t.value && (
                      <Tag variant="neutral" type="ghost" size="sm">
                        {t.value}
                      </Tag>
                    )}
                  </TableCell>
                  {!color && (
                    <TableCell>
                      {t.usage && (
                        <span className="token-usage">{t.usage}</span>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </section>
  )
}

/* ----------------------------------------------------------------
 * Bridge Tab — Group Section
 * ---------------------------------------------------------------- */

function BridgeGroupSection({ group }: { group: BridgeGroup }) {
  return (
    <section id={group.id} className="flex flex-col gap-4">
      <h3
        className="text-heading-small"
        style={{ color: "var(--text-base-strong)" }}
      >
        {group.label}
      </h3>
      <Table className="token-table">
        <TableHeader>
          <TableRow>
            <TableHead className="token-col-name">shadcn token</TableHead>
            <TableHead className="token-col-value">Lyse source</TableHead>
            <TableHead className="token-col-usage">Utility</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {group.tokens.map((t: BridgeEntry) => (
            <TableRow key={t.name}>
              <TableCell>
                <TokenChip name={t.name} isColor={t.type === "color"} />
              </TableCell>
              <TableCell>
                <Tag variant="brand" type="ghost" size="sm">
                  <span
                    className="token-swatch"
                    style={{ background: `var(--${t.lyseToken})` }}
                  />
                  <span className="token-chip-name">--{t.lyseToken}</span>
                </Tag>
              </TableCell>
              <TableCell>
                <Tag variant="neutral" type="ghost" size="sm">
                  {t.utility}
                </Tag>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}

/* ----------------------------------------------------------------
 * Tab Content
 * ---------------------------------------------------------------- */

function SemanticTab() {
  return (
    <div className="flex flex-col gap-14">
      {semanticGroups.map((g) => (
        <SemanticGroupSection key={g.id} group={g} />
      ))}
    </div>
  )
}

function PrimitiveTab() {
  return (
    <div className="flex flex-col gap-14">
      <BannerInfo variant="warning">
        Prefer semantic tokens in components — primitives are raw values that
        don&apos;t adapt to light/dark mode. Use Layer 2 (Semantic) tokens
        instead.
      </BannerInfo>
      {primitiveGroups.map((g) => (
        <PrimitiveGroupSection key={g.id} group={g} />
      ))}
    </div>
  )
}

function BridgeTab() {
  return (
    <div className="flex flex-col gap-14">
      <p
        className="text-content-body"
        style={{ color: "var(--text-base-bolder)" }}
      >
        Maps Lyse semantic tokens to shadcn variable names. These enable
        Tailwind utilities like <InlineCode>bg-primary</InlineCode> and{" "}
        <InlineCode>text-foreground</InlineCode>.
      </p>
      {bridgeGroups.map((g) => (
        <BridgeGroupSection key={g.id} group={g} />
      ))}
    </div>
  )
}

/* ----------------------------------------------------------------
 * Page
 * ---------------------------------------------------------------- */

export default function TokensPage() {
  const [tab, setTab] = useState<Tab>("semantic")
  const sections = useMemo(() => tocForTab(tab), [tab])

  return (
    <>
      <main className="token-page flex-1 min-w-0 py-16 flex flex-col gap-10 max-w-none px-5 sm:px-8 lg:px-16 xl:px-20">
        {/* Hero */}
        <div className="flex flex-col gap-3">
          <h1
            className="font-bold"
            style={{
              color: "var(--text-base-strong)",
              fontSize: "var(--root-font-size-5xl)",
            }}
          >
            Design Tokens
          </h1>
          <p
            className="text-content-highlight"
            style={{ color: "var(--text-base-bolder)" }}
          >
            A 3-layer token system built on CSS custom properties. Colors,
            typography, spacing, and layout — with automatic light/dark mode
            support.
          </p>
        </div>

        {/* Architecture Overview */}
        <section className="flex flex-col gap-3">
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-bolder)" }}
          >
            Components use <strong>Layer 2 (Semantic)</strong> tokens in their
            CSS files. Never use Layer 1 (Primitive) directly in components —
            they don&apos;t adapt to dark mode.
          </p>
          <div className="mt-1">
            <CodeBlock
              codeString={architectureCode}
              language="text"
              defaultExpanded
            />
          </div>
        </section>

        {/* Tabs + Filter */}
        <div className="flex flex-col gap-6">
          <div
            className="flex items-center gap-1 pb-px"
            style={{
              borderBottom:
                "var(--layout-border-thin) solid var(--border-default)",
            }}
          >
            {(
              [
                { key: "semantic" as Tab, label: "Semantic" },
                { key: "primitive" as Tab, label: "Primitive" },
                { key: "bridge" as Tab, label: "Bridge" },
              ] as const
            ).map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className="text-content-note font-accent px-4 py-2 -mb-px transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
                style={{
                  color:
                    tab === t.key
                      ? "var(--text-base-strong)"
                      : "var(--text-base-moderate)",
                  borderBottom:
                    tab === t.key
                      ? "2px solid var(--text-base-strong)"
                      : "2px solid transparent",
                  transition: "color 150ms ease, border-color 150ms ease",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {tab === "semantic" ? (
            <SemanticTab />
          ) : tab === "primitive" ? (
            <PrimitiveTab />
          ) : (
            <BridgeTab />
          )}
        </div>
      </main>

      <TableOfContents sections={sections} />
    </>
  )
}
