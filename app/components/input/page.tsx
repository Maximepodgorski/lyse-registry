"use client"

import { useState } from "react"
import { toast } from "@/registry/new-york/ui/toast/toast"
import {
  Input,
  InputField,
  InputLabel,
  InputHint,
} from "@/registry/new-york/ui/input/input"
import { Button } from "@/registry/new-york/ui/button/button"
import {
  Copy,
  ExternalLink,
  Mail,
  HelpCircle,
  AlertCircle,
  CheckCircle2,
  Search,
  Lock,
  Eye,
} from "lucide-react"
import { ComponentPreview } from "@/app/_components/component-preview"
import { PropsTable, type PropDef } from "@/app/_components/props-table"
import {
  TableOfContents,
  type TocSection,
} from "@/app/_components/table-of-contents"
import { CodeBlock } from "@/app/_components/code-block"
import { InlineCode } from "@/app/_components/inline-code"

/* ----------------------------------------------------------------
 * Data
 * ---------------------------------------------------------------- */

const overviewSections: TocSection[] = [
  { id: "default", label: "Default" },
  { id: "sizes", label: "Sizes" },
  { id: "variants", label: "Variants" },
  { id: "with-icons", label: "With Icons" },
  { id: "input-field", label: "InputField" },
  { id: "disabled", label: "Disabled" },
]

const inputPropDefs: PropDef[] = [
  {
    name: "variant",
    type: ["default", "destructive", "success"],
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
    type: ["default", "destructive", "success"],
    default: "default",
    description:
      "Text color. Use destructive for error messages, success for confirmation.",
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
        description="A basic text input with placeholder."
      >
        <Input placeholder="Enter your email" className="max-w-[320px]" />
      </ComponentPreview>

      <ComponentPreview
        id="sizes"
        title="Sizes"
        description={
          <>
            Use the <InlineCode>size</InlineCode> prop to control input
            height. Available sizes: <InlineCode>sm</InlineCode>,{" "}
            <InlineCode>md</InlineCode>, <InlineCode>lg</InlineCode>.
          </>
        }
      >
        <div className="flex flex-col gap-4 max-w-[320px]">
          <Input size="sm" placeholder="Small" />
          <Input size="md" placeholder="Medium (default)" />
          <Input size="lg" placeholder="Large" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="variants"
        title="Variants"
        description={
          <>
            Use <InlineCode>variant</InlineCode> to change border and focus
            ring color for validation states.
          </>
        }
      >
        <div className="flex flex-col gap-4 max-w-[320px]">
          <Input variant="default" placeholder="Default" />
          <Input variant="destructive" placeholder="Destructive" />
          <Input variant="success" placeholder="Success" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="with-icons"
        title="With Icons"
        description={
          <>
            Use <InlineCode>leading</InlineCode> and{" "}
            <InlineCode>trailing</InlineCode> props to add content before or
            after the input.
          </>
        }
      >
        <div className="flex flex-col gap-4 max-w-[320px]">
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
          <Input
            variant="success"
            leading={<Mail />}
            trailing={<CheckCircle2 />}
            placeholder="Valid email"
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="input-field"
        title="InputField"
        description={
          <>
            Compose <InlineCode>InputField</InlineCode>,{" "}
            <InlineCode>InputLabel</InlineCode>, and{" "}
            <InlineCode>InputHint</InlineCode> for a full form field with
            label, input, and helper text.
          </>
        }
      >
        <div className="flex flex-col gap-8 max-w-[320px]">
          <InputField>
            <InputLabel required>Email</InputLabel>
            <Input
              leading={<Mail />}
              trailing={<HelpCircle />}
              placeholder="registry@getlyse.com"
            />
            <InputHint>This is a hint text to help user.</InputHint>
          </InputField>

          <InputField>
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

          <InputField>
            <InputLabel required>Email</InputLabel>
            <Input
              variant="success"
              leading={<Mail />}
              trailing={<CheckCircle2 />}
              placeholder="registry@getlyse.com"
            />
            <InputHint variant="success">
              Email address verified.
            </InputHint>
          </InputField>
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="disabled"
        title="Disabled"
        description="Disable the input to prevent interaction."
      >
        <div className="flex flex-col gap-4 max-w-[320px]">
          <Input
            disabled
            leading={<Mail />}
            trailing={<HelpCircle />}
            placeholder="Disabled input"
          />
          <InputField>
            <InputLabel required>Email</InputLabel>
            <Input
              disabled
              leading={<Mail />}
              trailing={<HelpCircle />}
              placeholder="registry@getlyse.com"
            />
            <InputHint>This is a hint text to help user.</InputHint>
          </InputField>
        </div>
      </ComponentPreview>
    </div>
  )
}

/* ----------------------------------------------------------------
 * Page
 * ---------------------------------------------------------------- */

type Tab = "overview" | "props"

export default function InputPage() {
  const [tab, setTab] = useState<Tab>("overview")

  return (
    <>
      <main className="flex-1 min-w-0 py-16 flex flex-col gap-10 max-w-none px-8 lg:px-16 xl:px-20">
        {/* Hero */}
        <div className="flex flex-col gap-3">
          <h1
            className="text-heading-large"
            style={{ color: "var(--text-base-strong)" }}
          >
            Input
          </h1>
          <p
            className="text-content-body"
            style={{ color: "var(--text-base-moderate)" }}
          >
            A text input component with optional leading and trailing addon
            slots. Compose with InputField, InputLabel, and InputHint for
            full form fields with labels, validation states, and helper text.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add @lyse/input")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <><Copy className="size-4" /> Copy install command</>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a
                href="https://v0.dev"
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
                <InputField className="max-w-[320px]">
                  <InputLabel required>Email</InputLabel>
                  <Input
                    leading={<Mail />}
                    trailing={<HelpCircle />}
                    placeholder="Enter email"
                  />
                  <InputHint>We&apos;ll never share your email.</InputHint>
                </InputField>
              }
              code={
                <>
                  <span style={{ color: "var(--root-color-brand-300)" }}>import</span>
                  {" { "}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    Input, InputField,{"\n"}
                    {"  "}InputLabel, InputHint
                  </span>
                  {" } "}
                  <span style={{ color: "var(--root-color-brand-300)" }}>from</span>{" "}
                  <span style={{ color: "var(--root-color-warning-400)" }}>
                    {`'@/components/ui/input'`}
                  </span>
                  {"\n\n"}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"<"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>InputField</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"\n  "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"<"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>InputLabel</span>
                  {" "}
                  <span style={{ color: "var(--root-color-brand-300)" }}>required</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"Email"}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"</"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>InputLabel</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"\n  "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"<"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>Input</span>
                  {"\n    "}
                  <span style={{ color: "var(--root-color-brand-300)" }}>leading</span>
                  {"={"}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"<"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>Mail</span>
                  {" />"}
                  {"}"}
                  {"\n    "}
                  <span style={{ color: "var(--root-color-brand-300)" }}>placeholder</span>
                  {"="}
                  <span style={{ color: "var(--root-color-warning-400)" }}>{`"Enter email"`}</span>
                  {"\n  />"}
                  {"\n  "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"<"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>InputHint</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"Helper text"}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"</"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>InputHint</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"\n"}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"</"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>InputField</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                </>
              }
            />
          )}

          {/* Tab content */}
          {tab === "overview" ? (
            <OverviewTab />
          ) : (
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
          )}
        </div>
      </main>

      <TableOfContents sections={tab === "overview" ? overviewSections : []} />
    </>
  )
}
