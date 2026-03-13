"use client"

import { useState } from "react"
import { toast } from "@/registry/new-york/ui/toast/toast"
import {
  Input,
  InputField,
  InputLabel,
  InputHint,
} from "@/registry/new-york/ui/input/input"
import {
  Field,
  FieldLabel,
  FieldControl,
  FieldDescription,
  FieldError,
} from "@/registry/new-york/ui/field/field"

import { Button } from "@/registry/new-york/ui/button/button"
import {
  Copy,
  ExternalLink,
  Mail,
  HelpCircle,
  AlertCircle,
  Search,
  Lock,
  Eye,
} from "lucide-react"
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
  { id: "with-icons", label: "With Icons" },
  { id: "field", label: "Field" },
  { id: "disabled", label: "Disabled" },
]

const dosDontsItems: DosDontsItem[] = [
  {
    do: {
      preview: (
        <Field error required className="w-[420px]">
          <FieldLabel>Email</FieldLabel>
          <FieldControl>
            <Input
              leading={<Mail />}
              trailing={<AlertCircle />}
              placeholder="registry@getlyse.com"
            />
          </FieldControl>
          <FieldDescription>We&apos;ll never share your email.</FieldDescription>
          <FieldError>Please enter a valid email address.</FieldError>
        </Field>
      ),
      description:
        "Use Field to compose form fields — error, required, and disabled propagate automatically.",
    },
    dont: {
      preview: (
        <InputField className="w-[420px]">
          <InputLabel required>Email</InputLabel>
          <Input
            variant="destructive"
            leading={<Mail />}
            trailing={<AlertCircle />}
            placeholder="registry@getlyse.com"
          />
          <InputHint variant="destructive">
            Please enter a valid email address.
          </InputHint>
        </InputField>
      ),
      description:
        "Don't manually wire variant, htmlFor, and required on each element — use Field instead.",
    },
  },
  {
    do: {
      preview: (
        <Input leading={<Mail />} placeholder="Email address" className="w-[420px]" />
      ),
      description:
        "Use leading for contextual icons (Mail, Search, Lock).",
    },
    dont: {
      preview: (
        <Input leading={<Button variant="terciary" size="xs">Go</Button>} placeholder="Email address" className="w-[420px]" />
      ),
      description:
        "Don't put interactive elements (buttons) in leading — use trailing or external layout.",
    },
  },
  {
    do: {
      preview: (
        <Field required className="w-[420px]">
          <FieldLabel>Email</FieldLabel>
          <FieldControl>
            <Input leading={<Mail />} placeholder="registry@getlyse.com" />
          </FieldControl>
          <FieldDescription>We&apos;ll never share your email.</FieldDescription>
        </Field>
      ),
      description:
        "Use Field to compose label + input + description with consistent spacing and auto-wired accessibility.",
    },
    dont: {
      preview: (
        <div className="flex flex-col gap-1 w-[420px]">
          <label className="field-label inline-flex items-center gap-[var(--layout-gap-xs)] text-content-note font-accent">
            Email
            <span className="field-label-asterisk">*</span>
          </label>
          <div className="mt-3" />
          <Input leading={<Mail />} placeholder="registry@getlyse.com" />
          <div className="mt-4" />
          <p className="text-content-note [color:var(--text-base-moderate)]">We&apos;ll never share your email.</p>
        </div>
      ),
      description:
        "Don't manually add spacing and labels — use Field for consistent layout and a11y.",
    },
  },
  {
    do: {
      preview: (
        <Input size="lg" placeholder="Search..." leading={<Search />} className="w-[420px]" />
      ),
      description:
        'Use size="lg" for prominent, standalone inputs.',
    },
    dont: {
      preview: (
        <div className="flex flex-col gap-3 w-[420px]">
          <Input size="sm" placeholder="Name" leading={<Search />} />
          <Input size="lg" placeholder="Email" leading={<Mail />} />
        </div>
      ),
      description:
        "Don't mix different input sizes in the same form.",
    },
  },
]

const inputPropDefs: PropDef[] = [
  {
    name: "variant",
    type: ["default", "destructive"],
    default: "default",
    description:
      "Visual variant. Controls border and focus ring color.",
  },
  {
    name: "size",
    type: ["sm", "md", "lg"],
    default: "md",
    description: "Input height and internal spacing.",
  },
  {
    name: "leading",
    type: ["ReactNode"],
    description: "Content rendered before the input (icon, text, etc.).",
  },
  {
    name: "trailing",
    type: ["ReactNode"],
    description: "Content rendered after the input (icon, status indicator, etc.).",
  },
  {
    name: "disabled",
    type: ["boolean"],
    default: "false",
    description: "Disabled state — mutes colors and prevents interaction.",
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

const importCode = `import { Input } from '@/components/ui/input'
import {
  Field, FieldLabel, FieldControl,
  FieldDescription, FieldError
} from '@/components/ui/field'

<Field required>
  <FieldLabel>Email</FieldLabel>
  <FieldControl>
    <Input leading={<Mail />} placeholder="Enter email" />
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
        description="Basic text input with placeholder."
      >
        <Input placeholder="Enter your email" className="w-[420px]" />
      </ComponentPreview>

      <ComponentPreview
        id="sizes"
        title="Sizes"
        description="Controls input height."
      >
        <div className="flex flex-col gap-4 w-[420px]">
          <Input size="sm" placeholder="Small" />
          <Input size="md" placeholder="Medium (default)" />
          <Input size="lg" placeholder="Large" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="variants"
        title="Variants"
        description="Border and focus ring color for validation states."
      >
        <div className="flex flex-col gap-4 w-[420px]">
          <Input variant="default" placeholder="Default" />
          <Input variant="destructive" placeholder="Destructive" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="with-icons"
        title="With Icons"
        description="Add content before or after the input."
      >
        <div className="flex flex-col gap-4 w-[420px]">
          <Input
            leading={<Mail />}
            trailing={<HelpCircle />}
            placeholder="Email address"
          />
          <Input
            leading={<Search />}
            placeholder="Search..."
          />
          <Input
            leading={<Lock />}
            trailing={<Eye />}
            type="password"
            placeholder="Password"
          />
          <Input
            variant="destructive"
            leading={<Mail />}
            trailing={<AlertCircle />}
            placeholder="Invalid email"
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="field"
        title="Field"
        description="Compose label, control, description, and error. State propagates automatically — no manual id, htmlFor, or variant wiring."
      >
        <div className="flex flex-col gap-8 w-[420px]">
          <Field>
            <FieldLabel>Email</FieldLabel>
            <FieldControl>
              <Input
                leading={<Mail />}
                trailing={<HelpCircle />}
                placeholder="registry@getlyse.com"
              />
            </FieldControl>
            <FieldDescription>This is a hint text to help user.</FieldDescription>
          </Field>

          <Field error required>
            <FieldLabel>Email</FieldLabel>
            <FieldControl>
              <Input
                leading={<Mail />}
                trailing={<AlertCircle />}
                placeholder="registry@getlyse.com"
              />
            </FieldControl>
            <FieldDescription>We&apos;ll never share your email.</FieldDescription>
            <FieldError>Please enter a valid email address.</FieldError>
          </Field>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="disabled"
        title="Disabled"
        description="Prevents interaction with muted styling."
      >
        <div className="flex flex-col gap-4 w-[420px]">
          <Input
            disabled
            leading={<Mail />}
            trailing={<HelpCircle />}
            placeholder="Disabled input"
          />
          <Field disabled>
            <FieldLabel>Email</FieldLabel>
            <FieldControl>
              <Input
                leading={<Mail />}
                trailing={<HelpCircle />}
                placeholder="registry@getlyse.com"
              />
            </FieldControl>
            <FieldDescription>This is a hint text to help user.</FieldDescription>
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

export default function InputPage() {
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
            Input
          </h1>
          <p
            className="text-content-highlight"
            style={{ color: "var(--text-base-bolder)" }}
          >
            The Input component is a single-line text field for capturing user
            data. It supports addon slots and validation states, providing a
            flexible foundation for building form fields.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add https://ui.getlyse.com/r/input.json")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <><Copy className="size-4" /> Copy install command</>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a
                href="https://v0.app/chat?q=add%20component%20from%20https%3A%2F%2Fui.getlyse.com%2Fr%2Finput.json"
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
                  <FieldLabel>Email</FieldLabel>
                  <FieldControl>
                    <Input
                      leading={<Mail />}
                      trailing={<HelpCircle />}
                      placeholder="Enter email"
                    />
                  </FieldControl>
                  <FieldDescription>We&apos;ll never share your email.</FieldDescription>
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
                  Input
                </h3>
                <PropsTable
                  propDefs={inputPropDefs}
                  extendsType='React.ComponentProps<"input">'
                />
              </div>
              <div>
                <h3
                  className="text-heading-small mb-4"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  InputLabel
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
                  InputHint
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

