"use client"

import { useState } from "react"
import { toast } from "@/registry/new-york/ui/toast/toast"
import {
  Textarea,
  TextareaField,
  TextareaLabel,
  TextareaHint,
} from "@/registry/new-york/ui/textarea/textarea"
import {
  Field,
  FieldLabel,
  FieldControl,
  FieldDescription,
  FieldError,
} from "@/registry/new-york/ui/field/field"

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
  { id: "field", label: "Field" },
  { id: "disabled", label: "Disabled" },
]

const dosDontsItems: DosDontsItem[] = [
  {
    do: {
      preview: (
        <Field error required className="w-[420px]">
          <FieldLabel>Message</FieldLabel>
          <FieldControl>
            <Textarea placeholder="Type your message..." />
          </FieldControl>
          <FieldDescription>Maximum 500 characters.</FieldDescription>
          <FieldError>Message is required.</FieldError>
        </Field>
      ),
      description:
        "Use Field to compose form fields — error, required, and a11y propagate automatically.",
    },
    dont: {
      preview: (
        <TextareaField className="w-[420px]">
          <TextareaLabel required>Message</TextareaLabel>
          <Textarea variant="destructive" placeholder="Type your message..." />
          <TextareaHint variant="destructive">Message is required.</TextareaHint>
        </TextareaField>
      ),
      description:
        "Don't manually wire variant, htmlFor, and aria attributes — use Field instead.",
    },
  },
  {
    do: {
      preview: (
        <Field className="w-[420px]">
          <FieldLabel>Message</FieldLabel>
          <FieldControl>
            <Textarea placeholder="Type your message here..." />
          </FieldControl>
        </Field>
      ),
      description:
        "Use Field with a label for accessible form fields.",
    },
    dont: {
      preview: (
        <Textarea placeholder="Enter your message" className="w-[420px]" />
      ),
      description:
        "Don't use placeholder as a replacement for a label.",
    },
  },
  {
    do: {
      preview: (
        <Textarea size="md" placeholder="Medium" className="w-[420px]" />
      ),
      description:
        "Use the size prop to match the form context.",
    },
    dont: {
      preview: (
        <Textarea placeholder="Forced height" className="w-[420px] min-h-[200px]" />
      ),
      description:
        "Don't override min-height with arbitrary values via className.",
    },
  },
  {
    do: {
      preview: (
        <Field error required className="w-[420px]">
          <FieldLabel>Message</FieldLabel>
          <FieldControl>
            <Textarea placeholder="Type your message..." />
          </FieldControl>
          <FieldError>Message is required.</FieldError>
        </Field>
      ),
      description:
        "Field auto-wires aria-describedby, aria-invalid, and role=\"alert\" for screen readers.",
    },
    dont: {
      preview: (
        <Textarea
          variant="destructive"
          placeholder="Something went wrong"
          className="w-[420px]"
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

const importCode = `import { Textarea } from '@/components/ui/textarea'
import {
  Field, FieldLabel, FieldControl,
  FieldDescription, FieldError
} from '@/components/ui/field'

<Field required>
  <FieldLabel>Message</FieldLabel>
  <FieldControl>
    <Textarea placeholder="Type your message..." />
  </FieldControl>
  <FieldDescription>Helper text</FieldDescription>
</Field>`

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
        <Textarea placeholder="Type your message here..." className="w-[420px]" />
      </ComponentPreview>

      <ComponentPreview
        id="sizes"
        title="Sizes"
        description="Controls min-height, padding, and font size."
      >
        <div className="flex flex-col gap-4 w-[420px]">
          <Textarea size="sm" placeholder="Small" />
          <Textarea size="md" placeholder="Medium" />
          <Textarea size="lg" placeholder="Large" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="variants"
        title="Variants"
        description="Border and focus ring color for validation states."
      >
        <div className="flex flex-col gap-4 w-[420px]">
          <Textarea variant="default" placeholder="Default" />
          <Textarea variant="destructive" placeholder="Destructive" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="field"
        title="Field"
        description="Compose label, control, description, and error. State propagates automatically."
      >
        <div className="flex flex-col gap-8 w-[420px]">
          <Field required>
            <FieldLabel>Message</FieldLabel>
            <FieldControl>
              <Textarea placeholder="Type your message here..." />
            </FieldControl>
            <FieldDescription>Maximum 500 characters.</FieldDescription>
          </Field>

          <Field error required>
            <FieldLabel>Message</FieldLabel>
            <FieldControl>
              <Textarea placeholder="Type your message here..." />
            </FieldControl>
            <FieldDescription>Maximum 500 characters.</FieldDescription>
            <FieldError>Message is required.</FieldError>
          </Field>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="disabled"
        title="Disabled"
        description="Prevents interaction with muted styling."
      >
        <div className="flex flex-col gap-4 w-[420px]">
          <Textarea disabled placeholder="Disabled textarea" />
          <Field disabled>
            <FieldLabel>Message</FieldLabel>
            <FieldControl>
              <Textarea placeholder="Type your message here..." />
            </FieldControl>
            <FieldDescription>Maximum 500 characters.</FieldDescription>
          </Field>
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
      <main className="flex-1 min-w-0 py-16 flex flex-col gap-10 max-w-none px-5 sm:px-8 lg:px-16 xl:px-20">
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
            style={{ color: "var(--text-base-bolder)" }}
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
                <Field required className="w-[420px]">
                  <FieldLabel>Message</FieldLabel>
                  <FieldControl>
                    <Textarea placeholder="Type your message here..." />
                  </FieldControl>
                  <FieldDescription>Maximum 500 characters.</FieldDescription>
                </Field>
              }
              codeString={importCode}
              language="tsx"
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
            : []
        }
      />
    </>
  )
}

