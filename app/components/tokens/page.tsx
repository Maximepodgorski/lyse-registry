"use client"

import { InlineCode } from "@/app/_components/inline-code"
import { CodeBlock } from "@/app/_components/code-block"
import {
  TableOfContents,
  type TocSection,
} from "@/app/_components/table-of-contents"

const sections: TocSection[] = [
  { id: "architecture", label: "Architecture" },
  { id: "primitives", label: "Primitives" },
  { id: "semantics", label: "Semantics" },
  { id: "bridge", label: "Bridge" },
  { id: "usage", label: "Usage in components" },
  { id: "dark-mode", label: "Dark mode" },
]

const architectureCode = `Primitives (root-*.css)
  --root-color-brand-500, --root-space-4, --root-font-size-md
         ↓
Semantics (semantic-*.css)
  --background-brand-strong-default, --text-base-strong
         ↓
Bridge (shadcn-bridge.css)
  --primary, --foreground, --ring`

const primitivesCode = `--root-color-brand-500: oklch(61.87% 0.2067 259.23);
--root-color-neutral-950: oklch(16.84% 0.0000 none);
--root-font-size-md: 1rem;
--root-space-4: 0.5rem;
--root-radius-4: 0.5rem;`

const semanticsCode = `/* Light (:root) */
--background-base: var(--root-color-neutral-050);
--text-base-strong: var(--root-color-neutral-950);
--border-default: var(--root-opacity-neutral-300);

/* Dark (.dark) */
--background-base: var(--root-color-neutral-950);
--text-base-strong: var(--root-color-neutral-050);
--border-default: var(--root-opacity-inverse-300);`

const bridgeCode = `--background: var(--background-base);
--foreground: var(--text-base-strong);
--primary: var(--background-brand-strong-default);
--destructive: var(--background-danger-strong-default);
--ring: var(--border-selected);`

const usageCssCode = `/* button.css — theming via Layer 2 tokens */
.button-primary {
  background: var(--background-brand-strong-default);
  color: var(--text-inverse);
}
.button-primary:hover {
  background: var(--background-brand-strong-hover);
}`

const usageLayoutCode = `/* Structure via layout tokens */
padding: var(--layout-padding-md);
gap: var(--layout-gap-sm);
border-radius: var(--layout-radius-lg);`

const darkModeCode = `:root {
  --text-base-strong: var(--root-color-neutral-950);
}
.dark {
  --text-base-strong: var(--root-color-neutral-050);
}`

export default function TokensPage() {
  return (
    <>
      <main className="flex-1 min-w-0 py-16 flex flex-col gap-12 max-w-none px-8 lg:px-16 xl:px-20">
        {/* Hero */}
        <div className="flex flex-col gap-3">
          <h1
            className="font-bold"
            style={{ color: "var(--text-base-strong)", fontSize: "var(--root-font-size-5xl)" }}
          >
            Design Tokens
          </h1>
          <p
            className="text-content-highlight"
            style={{ color: "var(--text-base-moderate)" }}
          >
            A 3-layer token system built on CSS custom properties. Colors,
            typography, spacing, and layout — with automatic light/dark mode
            support.
          </p>
        </div>

        {/* Architecture */}
        <section id="architecture" className="flex flex-col gap-3">
          <h2
            className="text-heading-small"
            style={{ color: "var(--text-base-strong)" }}
          >
            Architecture
          </h2>
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            Each layer adds meaning. Primitives hold raw values, semantics
            assign purpose, and the bridge maps to shadcn/Tailwind utilities.
          </p>
          <div className="mt-1">
            <CodeBlock
              codeString={architectureCode}
              language="text"
              defaultExpanded
            />
          </div>
        </section>

        {/* Primitives */}
        <section id="primitives" className="flex flex-col gap-3">
          <h2
            className="text-heading-small"
            style={{ color: "var(--text-base-strong)" }}
          >
            Primitives
          </h2>
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            Raw values with no semantic meaning. Five color scales (brand,
            danger, neutral, success, warning) with 50–950 steps, plus
            typography and layout values.
          </p>
          <div
            className="flex flex-col gap-2 text-content-note"
            style={{ color: "var(--text-base-moderate)" }}
          >
            <span><InlineCode>root-colors.css</InlineCode> — Color palette (oklch)</span>
            <span><InlineCode>root-typography.css</InlineCode> — Font sizes, weights, line heights</span>
            <span><InlineCode>root-layout.css</InlineCode> — Spacing, radius, borders, sizing</span>
          </div>
          <div className="mt-1">
            <CodeBlock
              codeString={primitivesCode}
              language="css"
              fileName="root-*.css"
              defaultExpanded
            />
          </div>
        </section>

        {/* Semantics */}
        <section id="semantics" className="flex flex-col gap-3">
          <h2
            className="text-heading-small"
            style={{ color: "var(--text-base-strong)" }}
          >
            Semantics
          </h2>
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            Named by purpose, not value. Semantic tokens reference primitives
            and remap automatically between light and dark mode. Components
            consume these in their <InlineCode>.css</InlineCode> files.
          </p>
          <div
            className="flex flex-col gap-2 text-content-note"
            style={{ color: "var(--text-base-moderate)" }}
          >
            <span><InlineCode>semantic-colors.css</InlineCode> — Background, text, border, icon tokens</span>
            <span><InlineCode>semantic-global.css</InlineCode> — Mode-independent layout aliases</span>
            <span><InlineCode>typography.css</InlineCode> — Composite classes (<InlineCode>.text-content-body</InlineCode>, <InlineCode>.text-heading-small</InlineCode>)</span>
          </div>
          <div className="mt-1">
            <CodeBlock
              codeString={semanticsCode}
              language="css"
              fileName="semantic-colors.css"
              defaultExpanded
            />
          </div>
        </section>

        {/* Bridge */}
        <section id="bridge" className="flex flex-col gap-3">
          <h2
            className="text-heading-small"
            style={{ color: "var(--text-base-strong)" }}
          >
            Bridge
          </h2>
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            Maps Lyse semantic tokens to shadcn variable names. This makes
            components compatible with the shadcn ecosystem and Tailwind
            utilities like <InlineCode>bg-primary</InlineCode> or{" "}
            <InlineCode>text-foreground</InlineCode>.
          </p>
          <div className="mt-1">
            <CodeBlock
              codeString={bridgeCode}
              language="css"
              fileName="shadcn-bridge.css"
              defaultExpanded
            />
          </div>
        </section>

        {/* Usage */}
        <section id="usage" className="flex flex-col gap-3">
          <h2
            className="text-heading-small"
            style={{ color: "var(--text-base-strong)" }}
          >
            Usage in components
          </h2>
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            Component CSS files use Layer 2 tokens for theming (colors,
            borders, shadows). Layout properties use dedicated layout tokens.
          </p>
          <div className="mt-1 flex flex-col gap-3">
            <CodeBlock
              codeString={usageCssCode}
              language="css"
              fileName="button.css"
              defaultExpanded
            />
            <CodeBlock
              codeString={usageLayoutCode}
              language="css"
              fileName="layout tokens"
              defaultExpanded
            />
          </div>
        </section>

        {/* Dark mode */}
        <section id="dark-mode" className="flex flex-col gap-3">
          <h2
            className="text-heading-small"
            style={{ color: "var(--text-base-strong)" }}
          >
            Dark mode
          </h2>
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            Add the <InlineCode>dark</InlineCode> class to any ancestor.
            Semantic tokens remap automatically — no component changes needed.
          </p>
          <div className="mt-1">
            <CodeBlock
              codeString={darkModeCode}
              language="css"
              fileName="semantic-colors.css"
              defaultExpanded
            />
          </div>
        </section>
      </main>

      <TableOfContents sections={sections} />
    </>
  )
}
