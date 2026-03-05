"use client"

import { InlineCode } from "@/app/_components/inline-code"
import {
  TableOfContents,
  type TocSection,
} from "@/app/_components/table-of-contents"

const sections: TocSection[] = [
  { id: "architecture", label: "Architecture" },
  { id: "primitives", label: "Layer 1: Primitives" },
  { id: "semantics", label: "Layer 2: Semantics" },
  { id: "bridge", label: "Layer 3: Bridge" },
  { id: "usage", label: "Usage" },
  { id: "dark-mode", label: "Dark mode" },
]

function CodeSnippet({ code }: { code: string }) {
  return (
    <pre
      className="text-content-caption font-mono p-[var(--layout-padding-xl)] rounded-[var(--layout-radius-lg)] overflow-x-auto leading-relaxed"
      style={{
        background: "var(--background-neutral-faint-default)",
        color: "var(--text-base-moderate)",
        border: "var(--layout-border-thin) solid var(--border-default)",
      }}
    >
      <code>{code}</code>
    </pre>
  )
}

export default function TokensPage() {
  return (
    <>
      <main className="flex-1 min-w-0 py-16 flex flex-col gap-12 max-w-none px-8 lg:px-16 xl:px-20">
        {/* Hero */}
        <div className="flex flex-col gap-3">
          <h1
            className="text-heading-large"
            style={{ color: "var(--text-base-strong)" }}
          >
            Design Tokens
          </h1>
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            Lyse UI uses a 3-layer token architecture built with CSS custom
            properties. Tokens handle colors, typography, spacing, and layout
            across light and dark modes.
          </p>
        </div>

        {/* Architecture */}
        <section id="architecture" className="flex flex-col gap-4">
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
            Tokens flow through 3 layers. Each layer adds meaning and
            abstraction:
          </p>
          <CodeSnippet
            code={`Layer 1: Primitives (root-*.css)
  --root-color-brand-500, --root-space-4, --root-font-size-base
         ↓
Layer 2: Semantics (semantic-*.css)
  --background-brand-strong-default, --text-base-strong
         ↓
Layer 3: Bridge (shadcn-bridge.css)
  --primary, --foreground, --ring`}
          />
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            Components consume Layer 2 tokens in their{" "}
            <InlineCode>.css</InlineCode> files and Layer 3 tokens via Tailwind
            utilities.
          </p>
        </section>

        {/* Primitives */}
        <section id="primitives" className="flex flex-col gap-4">
          <h2
            className="text-heading-small"
            style={{ color: "var(--text-base-strong)" }}
          >
            Layer 1: Primitives
          </h2>
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            Raw values with no semantic meaning. These are the foundation that
            everything builds on.
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <span
                className="text-content-note font-accent"
                style={{ color: "var(--text-base-strong)" }}
              >
                Colors
              </span>
              <span
                className="text-content-note"
                style={{ color: "var(--text-base-moderate)" }}
              >
                <InlineCode>root-colors.css</InlineCode> — 5 scales (brand,
                danger, neutral, success, warning) with 50–950 steps each.
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span
                className="text-content-note font-accent"
                style={{ color: "var(--text-base-strong)" }}
              >
                Typography
              </span>
              <span
                className="text-content-note"
                style={{ color: "var(--text-base-moderate)" }}
              >
                <InlineCode>root-typography.css</InlineCode> — Font sizes,
                weights, and line heights.
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span
                className="text-content-note font-accent"
                style={{ color: "var(--text-base-strong)" }}
              >
                Layout
              </span>
              <span
                className="text-content-note"
                style={{ color: "var(--text-base-moderate)" }}
              >
                <InlineCode>root-layout.css</InlineCode> — Spacing, radius,
                borders, opacity, and sizing.
              </span>
            </div>
          </div>
          <CodeSnippet
            code={`/* Examples */
--root-color-brand-500: #6366f1;
--root-space-4: 1rem;
--root-font-size-base: 0.875rem;
--root-radius-md: 8px;`}
          />
        </section>

        {/* Semantics */}
        <section id="semantics" className="flex flex-col gap-4">
          <h2
            className="text-heading-small"
            style={{ color: "var(--text-base-strong)" }}
          >
            Layer 2: Semantics
          </h2>
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            Named by purpose, not value. Semantic tokens reference primitives
            and remap between light and dark mode.
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <span
                className="text-content-note font-accent"
                style={{ color: "var(--text-base-strong)" }}
              >
                Colors
              </span>
              <span
                className="text-content-note"
                style={{ color: "var(--text-base-moderate)" }}
              >
                <InlineCode>semantic-colors.css</InlineCode> — Background, text,
                border, and icon tokens with light/dark values.
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span
                className="text-content-note font-accent"
                style={{ color: "var(--text-base-strong)" }}
              >
                Global
              </span>
              <span
                className="text-content-note"
                style={{ color: "var(--text-base-moderate)" }}
              >
                <InlineCode>semantic-global.css</InlineCode> —
                Mode-independent aliases for spacing, sizing, and layout.
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span
                className="text-content-note font-accent"
                style={{ color: "var(--text-base-strong)" }}
              >
                Typography
              </span>
              <span
                className="text-content-note"
                style={{ color: "var(--text-base-moderate)" }}
              >
                <InlineCode>typography.css</InlineCode> — Composite utility
                classes like{" "}
                <InlineCode>.text-content-body</InlineCode> and{" "}
                <InlineCode>.text-heading-small</InlineCode>.
              </span>
            </div>
          </div>
          <CodeSnippet
            code={`/* Light mode (:root) */
--background-brand-strong-default: var(--root-color-brand-500);
--text-base-strong: var(--root-color-neutral-900);

/* Dark mode (.dark) */
--background-brand-strong-default: var(--root-color-brand-400);
--text-base-strong: var(--root-color-neutral-50);`}
          />
        </section>

        {/* Bridge */}
        <section id="bridge" className="flex flex-col gap-4">
          <h2
            className="text-heading-small"
            style={{ color: "var(--text-base-strong)" }}
          >
            Layer 3: Bridge
          </h2>
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            Maps Lyse semantic tokens to shadcn variable names. This is what
            makes Lyse components compatible with the shadcn ecosystem and
            Tailwind utilities.
          </p>
          <CodeSnippet
            code={`/* shadcn-bridge.css */
--primary: var(--background-brand-strong-default);
--foreground: var(--text-base-strong);
--ring: var(--border-brand-default);
--destructive: var(--background-danger-strong-default);`}
          />
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            These bridge variables are registered in{" "}
            <InlineCode>globals.css</InlineCode> via{" "}
            <InlineCode>@theme inline</InlineCode>, making them available as
            Tailwind utilities like{" "}
            <InlineCode>bg-primary</InlineCode> and{" "}
            <InlineCode>text-foreground</InlineCode>.
          </p>
        </section>

        {/* Usage */}
        <section id="usage" className="flex flex-col gap-4">
          <h2
            className="text-heading-small"
            style={{ color: "var(--text-base-strong)" }}
          >
            Usage
          </h2>
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            Components use Layer 2 tokens in their CSS files for theming, and
            Layer 3 tokens via Tailwind utilities for layout:
          </p>
          <CodeSnippet
            code={`/* button.css — Layer 2 tokens for theming */
.button-primary {
  background: var(--background-brand-strong-default);
  color: var(--text-inverse);
}
.button-primary:hover {
  background: var(--background-brand-strong-hover);
}`}
          />
          <CodeSnippet
            code={`{/* button.tsx — Layer 3 via Tailwind */}
<button className="rounded-md bg-primary text-primary-foreground">
  Click me
</button>`}
          />
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            For spacing and layout, use the layout tokens:{" "}
            <InlineCode>var(--layout-padding-*)</InlineCode>,{" "}
            <InlineCode>var(--layout-gap-*)</InlineCode>,{" "}
            <InlineCode>var(--layout-radius-*)</InlineCode>.
          </p>
        </section>

        {/* Dark mode */}
        <section id="dark-mode" className="flex flex-col gap-4">
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
            Semantic tokens automatically remap when the{" "}
            <InlineCode>dark</InlineCode> class is present on any ancestor
            element. No component changes needed — the token layer handles
            everything.
          </p>
          <CodeSnippet
            code={`/* :root = light mode (default) */
:root {
  --text-base-strong: var(--root-color-neutral-900);
}

/* .dark = dark mode */
.dark {
  --text-base-strong: var(--root-color-neutral-50);
}`}
          />
        </section>
      </main>

      <TableOfContents sections={sections} />
    </>
  )
}
