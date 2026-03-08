"use client"

import Link from "next/link"
import {
  TableOfContents,
  type TocSection,
} from "@/app/_components/table-of-contents"

const sections: TocSection[] = [
  { id: "open-code", label: "Open Code" },
  { id: "token-driven", label: "Token-Driven" },
  { id: "composition", label: "Composition" },
  { id: "distribution", label: "Distribution" },
  { id: "beautiful-defaults", label: "Beautiful Defaults" },
]

export default function IntroductionPage() {
  return (
    <>
      <main className="flex-1 min-w-0 py-16 flex flex-col gap-6 max-w-none px-8 lg:px-16 xl:px-20">
        {/* Title */}
        <h1
          className="font-bold"
          style={{ color: "var(--text-base-strong)", fontSize: "var(--root-font-size-5xl)" }}
        >
          Introduction
        </h1>

        {/* Description */}
        <p
          className="text-content-highlight leading-relaxed"
          style={{ color: "var(--text-base-moderate)" }}
        >
          Lyse UI is a set of beautifully-designed, accessible components and a
          design system distribution platform. Works with React 19, Tailwind CSS
          v4, and Radix UI. Open Source. Open Code.
        </p>

        {/* Bold statement */}
        <p
          className="text-content-body font-bold leading-relaxed"
          style={{ color: "var(--text-base-strong)" }}
        >
          This is not a component library. It is how you build your component
          library.
        </p>

        {/* Explanation */}
        <p
          className="text-content-body leading-relaxed"
          style={{ color: "var(--text-base-moderate)" }}
        >
          You know how most traditional component libraries work: you install a
          package from NPM, import the components, and use them in your app.
        </p>

        <p
          className="text-content-body leading-relaxed"
          style={{ color: "var(--text-base-moderate)" }}
        >
          This approach works well until you need to customize a component to
          fit your design system or require one that isn{"'"}t included in the
          library. Often, you end up wrapping library components, writing
          workarounds to override styles, or mixing components from different
          libraries with incompatible APIs.
        </p>

        <p
          className="text-content-body leading-relaxed"
          style={{ color: "var(--text-base-moderate)" }}
        >
          This is what Lyse UI aims to solve. It is built around the following
          principles:
        </p>

        {/* Principles list */}
        <ul
          className="flex flex-col gap-2 text-content-body leading-relaxed list-disc pl-5"
          style={{ color: "var(--text-base-moderate)" }}
        >
          <li>
            <strong style={{ color: "var(--text-base-strong)" }}>
              Open Code:
            </strong>{" "}
            The top layer of your component code is open for modification.
          </li>
          <li>
            <strong style={{ color: "var(--text-base-strong)" }}>
              Token-Driven:
            </strong>{" "}
            A 3-layer design token system powers consistent theming across light
            and dark modes.
          </li>
          <li>
            <strong style={{ color: "var(--text-base-strong)" }}>
              Composition:
            </strong>{" "}
            Every component uses CVA and Radix for composable, predictable APIs.
          </li>
          <li>
            <strong style={{ color: "var(--text-base-strong)" }}>
              Distribution:
            </strong>{" "}
            A flat-file schema and the shadcn CLI make it easy to distribute
            components.
          </li>
          <li>
            <strong style={{ color: "var(--text-base-strong)" }}>
              Beautiful Defaults:
            </strong>{" "}
            Great design from the Lyse Design System, out of the box.
          </li>
        </ul>

        {/* Section: Open Code */}
        <section id="open-code" className="flex flex-col gap-4 mt-6">
          <h2
            className="text-heading-small"
            style={{ color: "var(--text-base-strong)" }}
          >
            Open Code
          </h2>
          <p
            className="text-content-body leading-relaxed"
            style={{ color: "var(--text-base-moderate)" }}
          >
            Lyse UI hands you the actual component code. You have full control
            to customize and extend every component to fit your project. No more
            fighting library abstractions or overriding styles with{" "}
            <code className="text-content-caption px-1 py-0.5 rounded-[var(--layout-radius-sm)]" style={{ fontFamily: "var(--font-geist-mono)", background: "var(--background-neutral-faint-default)", color: "var(--text-base-strong)" }}>
              !important
            </code>.
          </p>
          <p
            className="text-content-body leading-relaxed"
            style={{ color: "var(--text-base-moderate)" }}
          >
            Each component follows a dual-file pattern: a{" "}
            <code className="text-content-caption px-1 py-0.5 rounded-[var(--layout-radius-sm)]" style={{ fontFamily: "var(--font-geist-mono)", background: "var(--background-neutral-faint-default)", color: "var(--text-base-strong)" }}>
              .tsx
            </code>{" "}
            file for structure and variants, and a{" "}
            <code className="text-content-caption px-1 py-0.5 rounded-[var(--layout-radius-sm)]" style={{ fontFamily: "var(--font-geist-mono)", background: "var(--background-neutral-faint-default)", color: "var(--text-base-strong)" }}>
              .css
            </code>{" "}
            file for theming. Change the look without touching the logic.
          </p>
        </section>

        {/* Section: Token-Driven */}
        <section id="token-driven" className="flex flex-col gap-4 mt-6">
          <h2
            className="text-heading-small"
            style={{ color: "var(--text-base-strong)" }}
          >
            Token-Driven
          </h2>
          <p
            className="text-content-body leading-relaxed"
            style={{ color: "var(--text-base-moderate)" }}
          >
            Every visual property flows from CSS custom properties across 3
            layers: primitives, semantics, and a shadcn bridge. This means your
            components automatically adapt to light and dark modes, and you can
            retheme everything by changing token values.
          </p>
          <p
            className="text-content-body leading-relaxed"
            style={{ color: "var(--text-base-moderate)" }}
          >
            Learn more about the token architecture on the{" "}
            <Link
              href="/components/tokens"
              className="underline underline-offset-4"
              style={{ color: "var(--text-base-strong)" }}
            >
              Tokens
            </Link>{" "}
            page.
          </p>
        </section>

        {/* Section: Composition */}
        <section id="composition" className="flex flex-col gap-4 mt-6">
          <h2
            className="text-heading-small"
            style={{ color: "var(--text-base-strong)" }}
          >
            Composition
          </h2>
          <p
            className="text-content-body leading-relaxed"
            style={{ color: "var(--text-base-moderate)" }}
          >
            Every component uses a common, composable interface. Class Variance
            Authority (CVA) handles variants predictably, Radix UI primitives
            provide accessibility, and the{" "}
            <code className="text-content-caption px-1 py-0.5 rounded-[var(--layout-radius-sm)]" style={{ fontFamily: "var(--font-geist-mono)", background: "var(--background-neutral-faint-default)", color: "var(--text-base-strong)" }}>
              cn()
            </code>{" "}
            helper merges classes safely with tailwind-merge.
          </p>
        </section>

        {/* Section: Distribution */}
        <section id="distribution" className="flex flex-col gap-4 mt-6">
          <h2
            className="text-heading-small"
            style={{ color: "var(--text-base-strong)" }}
          >
            Distribution
          </h2>
          <p
            className="text-content-body leading-relaxed"
            style={{ color: "var(--text-base-moderate)" }}
          >
            Lyse UI uses the shadcn registry format. A flat-file schema and the
            shadcn CLI make it easy to add components to any project. No package
            installs, no version conflicts. Just copy the code you need.
          </p>
        </section>

        {/* Section: Beautiful Defaults */}
        <section id="beautiful-defaults" className="flex flex-col gap-4 mt-6">
          <h2
            className="text-heading-small"
            style={{ color: "var(--text-base-strong)" }}
          >
            Beautiful Defaults
          </h2>
          <p
            className="text-content-body leading-relaxed"
            style={{ color: "var(--text-base-moderate)" }}
          >
            Components ship with carefully chosen default styles from the Lyse
            Design System. You get clean, minimal aesthetics with consistent
            spacing, typography, and color out of the box. Every detail has been
            considered so you can start building immediately.
          </p>
        </section>
      </main>

      <TableOfContents sections={sections} />
    </>
  )
}
