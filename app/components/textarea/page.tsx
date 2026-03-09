"use client"

import { useState } from "react"
import { toast } from "@/registry/new-york/ui/toast/toast"
import {
  Textarea,
  TextareaField,
  TextareaLabel,
  TextareaHint,
} from "@/registry/new-york/ui/textarea/textarea"
import { Button } from "@/registry/new-york/ui/button/button"
import { Copy, ExternalLink } from "lucide-react"
import { ComponentPreview } from "@/app/_components/component-preview"
import { DosDonts, type DosDontsItem } from "@/app/_components/dos-donts"
import { PropsTable, type PropDef } from "@/app/_components/props-table"
import {
  TableOfContents,
  type TocSection,
} from "@/app/_components/table-of-contents"
import { CodeBlock } from "@/app/_components/code-block"

/* ----------------------------------------------------------------
 * Data
 * ---------------------------------------------------------------- */

const overviewSections: TocSection[] = [
  { id: "default", label: "Default" },
  { id: "sizes", label: "Sizes" },
  { id: "variants", label: "Variants" },
  { id: "textarea-field", label: "TextareaField" },
  { id: "disabled", label: "Disabled" },
]

const docSections: TocSection[] = [
  { id: "dos-donts", label: "Do / Don't" },
]

const dosDontsItems: DosDontsItem[] = [
  {
    do: {
      preview: (
        <Textarea
          variant="destructive"
          aria-invalid="true"
          placeholder="Error state"
          className="max-w-[280px]"
        />
      ),
      description:
        'Use variant="destructive" with aria-invalid="true" for error states.',
    },
    dont: {
      preview: (
        <Textarea
          variant="destructive"
          placeholder="Styled only"
          className="max-w-[280px]"
        />
      ),
      description:
        "Don't use destructive variant for visual styling without communicating error to screen readers.",
    },
  },
  {
    do: {
      preview: (
        <TextareaField className="max-w-[280px]">
          <TextareaLabel>Message</TextareaLabel>
          <Textarea placeholder="Type your message here..." />
        </TextareaField>
      ),
      description:
        "Pair with a <label> element using matching id/htmlFor.",
    },
    dont: {
      preview: (
        <Textarea placeholder="Enter your message" className="max-w-[280px]" />
      ),
      description:
        "Don't use placeholder as a replacement for a label.",
    },
  },
  {
    do: {
      preview: (
        <Textarea size="md" placeholder="Medium" className="max-w-[280px]" />
      ),
      description:
        "Use the size prop to match the form context.",
    },
    dont: {
      preview: (
        <Textarea placeholder="Forced height" className="max-w-[280px] min-h-[200px]" />
      ),
      description:
        "Don't override min-height with arbitrary values via className.",
    },
  },
  {
    do: {
      preview: (
        <TextareaField className="max-w-[280px]">
          <TextareaLabel required>Message</TextareaLabel>
          <Textarea
            variant="destructive"
            aria-invalid="true"
            aria-describedby="msg-error"
            placeholder="Type your message..."
          />
          <TextareaHint variant="destructive" id="msg-error">
            Message is required.
          </TextareaHint>
        </TextareaField>
      ),
      description:
        "Add aria-describedby pointing to hint/error text for screen reader context.",
    },
    dont: {
      preview: (
        <Textarea
          variant="destructive"
          placeholder="Something went wrong"
          className="max-w-[280px]"
        />
      ),
      description:
        "Don't rely only on color to communicate validation state.",
    },
  },
]

const propDefs: PropDef[] = [
  {
    name: "variant",
    type: ["default", "destructive"],
    default: "default",
    description:
      "Visual variant. Controls border and focus ring color for validation state.",
  },
  {
    name: "size",
    type: ["sm", "md", "lg"],
    default: "md",
    description: "Controls min-height, padding, radius, and font size.",
  },
  {
    name: "disabled",
    type: ["boolean"],
    default: "false",
    description: "Disabled state — mutes colors, prevents interaction, and disables resize.",
  },
  {
    name: "placeholder",
    type: ["string"],
    description: "Placeholder text displayed when the textarea is empty.",
  },
  {
    name: "className",
    type: ["string"],
    description: "Additional class names merged via cn().",
  },
]

const labelPropDefs: PropDef[] = [
  {
    name: "required",
    type: ["boolean"],
    default: "false",
    description: "Shows a red asterisk after the label text.",
  },
  {
    name: "children",
    type: ["ReactNode"],
    required: true,
    description: "Label text.",
  },
  {
    name: "className",
    type: ["string"],
    description: "Additional class names merged via cn().",
  },
]

const hintPropDefs: PropDef[] = [
  {
    name: "variant",
    type: ["default", "destructive"],
    default: "default",
    description:
      "Text color. Use destructive for error messages.",
  },
  {
    name: "children",
    type: ["ReactNode"],
    required: true,
    description: "Hint text content.",
  },
  {
    name: "className",
    type: ["string"],
    description: "Additional class names merged via cn().",
  },
]

/* ----------------------------------------------------------------
 * Tabs
 * ---------------------------------------------------------------- */

function OverviewTab() {
  return (
    <div className="flex flex-col gap-12">
      <ComponentPreview
        id="default"
        title="Default"
        description="Basic textarea with placeholder text."
      >
        <Textarea placeholder="Type your message here..." className="max-w-[320px]" />
      </ComponentPreview>

      <ComponentPreview
        id="sizes"
        title="Sizes"
        description="Controls min-height, padding, and font size."
      >
        <div className="flex flex-col gap-4">
          <Textarea size="sm" placeholder="Small" className="max-w-[320px]" />
          <Textarea size="md" placeholder="Medium" className="max-w-[320px]" />
          <Textarea size="lg" placeholder="Large" className="max-w-[320px]" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="variants"
        title="Variants"
        description="Border and focus ring color for validation states."
      >
        <div className="flex flex-col gap-4">
          <Textarea variant="default" placeholder="Default" className="max-w-[320px]" />
          <Textarea variant="destructive" placeholder="Destructive" className="max-w-[320px]" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="textarea-field"
        title="TextareaField"
        description="Full form field with label, textarea, and helper text."
      >
        <div className="flex flex-col gap-8 max-w-[320px]">
          <TextareaField>
            <TextareaLabel required>Message</TextareaLabel>
            <Textarea placeholder="Type your message here..." />
            <TextareaHint>Maximum 500 characters.</TextareaHint>
          </TextareaField>

          <TextareaField>
            <TextareaLabel required>Message</TextareaLabel>
            <Textarea
              variant="destructive"
              placeholder="Type your message here..."
            />
            <TextareaHint variant="destructive">
              Message is required.
            </TextareaHint>
          </TextareaField>

        </div>
      </ComponentPreview>

      <ComponentPreview
        id="disabled"
        title="Disabled"
        description="Prevents interaction with muted styling."
      >
        <div className="flex flex-col gap-4 max-w-[320px]">
          <Textarea disabled placeholder="Disabled textarea" />
          <TextareaField>
            <TextareaLabel required>Message</TextareaLabel>
            <Textarea disabled placeholder="Type your message here..." />
            <TextareaHint>Maximum 500 characters.</TextareaHint>
          </TextareaField>
        </div>
      </ComponentPreview>
    </div>
  )
}

function DocumentationTab() {
  return (
    <div className="flex flex-col gap-12">
      <DosDonts id="dos-donts" items={dosDontsItems} />
    </div>
  )
}

/* ----------------------------------------------------------------
 * Page
 * ---------------------------------------------------------------- */

type Tab = "overview" | "props" | "documentation"

export default function TextareaPage() {
  const [tab, setTab] = useState<Tab>("overview")

  return (
    <>
      <main className="flex-1 min-w-0 py-16 flex flex-col gap-10 max-w-none px-8 lg:px-16 xl:px-20">
        {/* Hero */}
        <div className="flex flex-col gap-3">
          <h1
            className="font-bold"
            style={{ color: "var(--text-base-strong)", fontSize: "var(--root-font-size-5xl)" }}
          >
            Textarea
          </h1>
          <p
            className="text-content-highlight"
            style={{ color: "var(--text-base-moderate)" }}
          >
            The Textarea component is a multi-line text field for capturing
            longer form content like comments, descriptions, or messages. It
            provides a resizable area with validation support.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add https://ui.getlyse.com/r/textarea.json")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <><Copy className="size-4" /> Copy install command</>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a
                href="https://v0.app/chat?q=add%20component%20from%20https%3A%2F%2Fui.getlyse.com%2Fr%2Ftextarea.json"
                target="_blank"
                rel="noopener noreferrer"
              >
                Add to v0.dev <ExternalLink />
              </a>
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-col gap-10">
          <div
            className="flex items-center gap-1 pb-px"
            style={{
              borderBottom:
                "var(--layout-border-thin) solid var(--border-default)",
            }}
          >
            {(
              [
                { key: "overview" as Tab, label: "Overview" },
                { key: "props" as Tab, label: "Props" },
                { key: "documentation" as Tab, label: "Best practices" },
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

          {/* Code example */}
          {tab === "overview" && (
            <CodeBlock
              preview={
                <TextareaField className="max-w-[320px]">
                  <TextareaLabel required>Message</TextareaLabel>
                  <Textarea placeholder="Type your message here..." />
                  <TextareaHint>Maximum 500 characters.</TextareaHint>
                </TextareaField>
              }
              code={
                <>
                  <span style={{ color: "var(--root-color-brand-300)" }}>import</span>
                  {" { "}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    Textarea, TextareaField,{"\n"}
                    {"  "}TextareaLabel, TextareaHint
                  </span>
                  {" } "}
                  <span style={{ color: "var(--root-color-brand-300)" }}>from</span>{" "}
                  <span style={{ color: "var(--root-color-warning-400)" }}>
                    {`'@/components/ui/textarea'`}
                  </span>
                  {"\n\n"}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"<"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>TextareaField</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"\n  "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"<"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>TextareaLabel</span>
                  {" "}
                  <span style={{ color: "var(--root-color-brand-300)" }}>required</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"Message"}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"</"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>TextareaLabel</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"\n  "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"<"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>Textarea</span>
                  {"\n    "}
                  <span style={{ color: "var(--root-color-brand-300)" }}>placeholder</span>
                  {"="}
                  <span style={{ color: "var(--root-color-warning-400)" }}>{`"Type your message..."`}</span>
                  {"\n  />"}
                  {"\n  "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"<"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>TextareaHint</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"Helper text"}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"</"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>TextareaHint</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"\n"}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"</"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>TextareaField</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                </>
              }
            />
          )}

          {/* Tab content */}
          {tab === "overview" ? (
            <OverviewTab />
          ) : tab === "props" ? (
            <div className="flex flex-col gap-12">
              <div>
                <h3
                  className="text-heading-small mb-4"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  Textarea
                </h3>
                <PropsTable
                  propDefs={propDefs}
                  extendsType='React.ComponentProps<"textarea">'
                />
              </div>
              <div>
                <h3
                  className="text-heading-small mb-4"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  TextareaLabel
                </h3>
                <PropsTable
                  propDefs={labelPropDefs}
                  extendsType='React.ComponentProps<"label">'
                />
              </div>
              <div>
                <h3
                  className="text-heading-small mb-4"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  TextareaHint
                </h3>
                <PropsTable
                  propDefs={hintPropDefs}
                  extendsType='React.ComponentProps<"p">'
                />
              </div>
            </div>
          ) : (
            <DocumentationTab />
          )}
        </div>
      </main>

      <TableOfContents
        sections={
          tab === "overview"
            ? overviewSections
            : tab === "documentation"
              ? docSections
              : []
        }
      />
    </>
  )
}
