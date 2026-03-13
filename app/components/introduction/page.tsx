"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { InlineCode } from "@/app/_components/inline-code"
import { Tag } from "@/registry/new-york/ui/tag/tag"
import {
  TableOfContents,
  type TocSection,
} from "@/app/_components/table-of-contents"

const sections: TocSection[] = [
  { id: "open-code", label: "Open Code" },
  { id: "token-driven", label: "Token-Driven" },
  { id: "composition", label: "Composition" },
  { id: "distribution", label: "Distribution" },
  { id: "figma-library", label: "Figma Library" },
]

export default function IntroductionPage() {
  return (
    <>
      <main className="flex-1 min-w-0 py-16 flex flex-col gap-6 max-w-none px-5 sm:px-8 lg:px-16 xl:px-20">
        {/* Hero */}
        <div className="flex flex-col gap-2">
          <h1
            className="font-bold"
            style={{ color: "var(--text-base-strong)", fontSize: "var(--root-font-size-5xl)" }}
          >
            Introduction
          </h1>
          <p
            className="text-content-highlight leading-relaxed"
            style={{ color: "var(--text-base-bolder)" }}
          >
            Production-ready components built from a real design system. Open
            source, open code.
          </p>
        </div>

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
          style={{ color: "var(--text-base-bolder)" }}
        >
          You know how most traditional component libraries work: you install a
          package from{" "}
            <InlineCode>
              npm
            </InlineCode>
            , import the components, and use them in your app.
        </p>

        <p
          className="text-content-body leading-relaxed"
          style={{ color: "var(--text-base-bolder)" }}
        >
          This approach works well until you need to customize a component to
          fit your design system or require one that isn{"'"}t included in the
          library. Often, you end up wrapping library components, writing
          workarounds to override styles, or mixing components from different
          libraries with incompatible APIs.
        </p>

        <p
          className="text-content-body leading-relaxed"
          style={{ color: "var(--text-base-bolder)" }}
        >
          This is what Lyse UI aims to solve. It is built around the following
          principles:
        </p>

        {/* Principles list */}
        <ul
          className="flex flex-col gap-2 text-content-body leading-relaxed list-disc pl-5"
          style={{ color: "var(--text-base-bolder)" }}
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
            style={{ color: "var(--text-base-bolder)" }}
          >
            Lyse UI hands you the actual component code. You have full control
            to customize and extend every component to fit your project. No more
            fighting library abstractions or overriding styles with{" "}
            <InlineCode>
              !important
            </InlineCode>.
          </p>
          <p
            className="text-content-body leading-relaxed"
            style={{ color: "var(--text-base-bolder)" }}
          >
            Each component follows a dual-file pattern: a{" "}
            <InlineCode>
              .tsx
            </InlineCode>{" "}
            file for structure and variants, and a{" "}
            <InlineCode>
              .css
            </InlineCode>{" "}
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
            style={{ color: "var(--text-base-bolder)" }}
          >
            Every visual property flows from CSS custom properties across 3
            layers: primitives, semantics, and a shadcn bridge. This means your
            components automatically adapt to light and dark modes, and you can
            retheme everything by changing token values.
          </p>
          <p
            className="text-content-body leading-relaxed"
            style={{ color: "var(--text-base-bolder)" }}
          >
            Learn more about the token architecture on the{" "}
            <Link
              href="/components/tokens"
              className="underline underline-offset-4"
              style={{ color: "var(--text-brand-moderate)" }}
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
            style={{ color: "var(--text-base-bolder)" }}
          >
            Every component uses a common, composable interface. Class Variance
            Authority (CVA) handles variants predictably, Radix UI primitives
            provide accessibility, and the{" "}
            <InlineCode>
              cn()
            </InlineCode>{" "}
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
            style={{ color: "var(--text-base-bolder)" }}
          >
            Lyse UI uses the shadcn registry format. A flat-file schema and the
            shadcn CLI make it easy to add components to any project. No package
            installs, no version conflicts. Just copy the code you need.
          </p>
        </section>

        {/* Section: Figma Library */}
        <section id="figma-library" className="flex flex-col gap-4 mt-6">
          <h2
            className="text-heading-small"
            style={{ color: "var(--text-base-strong)" }}
          >
            Figma Library
          </h2>
          <p
            className="text-content-body leading-relaxed"
            style={{ color: "var(--text-base-bolder)" }}
          >
            This file contains the library used to build Lyse, shared openly
            with the community. You{"'"}ll find production-ready components and
            foundations, structured and maintained as they are in a real product.
          </p>
          <p
            className="text-content-body leading-relaxed"
            style={{ color: "var(--text-base-bolder)" }}
          >
            This library is also a practical way to explore Lyse, an AI
            assistant that turns component changes in Figma into tickets
            automatically. By modifying components and publishing the library,
            you can see how real design changes are detected and transformed
            into structured tickets.
          </p>
          <p
            className="text-content-body leading-relaxed"
            style={{ color: "var(--text-base-bolder)" }}
          >
            Use it as a solid base for your own design system, a reference for
            structuring components and variants, or a sandbox to test how Lyse
            works on real component updates.
          </p>
          <a
            href="https://www.figma.com/community/file/1470884424474781212/lyse-library-v2"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-[var(--layout-radius-xl)] p-[var(--layout-padding-md)] transition-colors bg-[var(--background-neutral-faint-default)] hover:bg-[var(--background-neutral-faint-hover)] overflow-hidden"
            style={{
              border: "var(--layout-border-thin) solid var(--border-default)",
            }}
          >
            <Image
              src="/lyse-thumbnail.png"
              alt="Lyse UI Library preview"
              width={160}
              height={90}
              className="shrink-0 rounded-[var(--layout-radius-md)] object-cover"
            />
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <span className="flex items-center gap-2">
                <span
                  className="text-content-body font-accent"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  Lyse UI Library
                </span>
<Tag variant="neutral" size="sm">v2.0</Tag>
              </span>
              <span
                className="text-content-note"
                style={{ color: "var(--text-base-bolder)" }}
              >
                Browse the full design system on Figma Community
              </span>
            </div>
            <ArrowUpRight
              className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              style={{ color: "var(--text-base-bolder)" }}
            />
          </a>
        </section>
      </main>

      <TableOfContents sections={sections} />
    </>
  )
}
