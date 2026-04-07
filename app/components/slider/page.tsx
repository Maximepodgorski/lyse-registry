"use client"

import { useState } from "react"
import { Slider, SliderField } from "@/registry/new-york/ui/slider/slider"
import { toast } from "@/registry/new-york/ui/toast/toast"
import { Copy, ExternalLink } from "lucide-react"
import { Button } from "@/registry/new-york/ui/button/button"
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

const importCode = `import { Slider, SliderField } from '@/components/ui/slider'

export default function Example() {
  const [value, setValue] = useState([62])

  return (
    <SliderField
      label="Lightness"
      suffix="%"
      value={value}
      onValueChange={setValue}
    />
  )
}`

const overviewSections: TocSection[] = [
  { id: "default", label: "Default" },
  { id: "slider-field", label: "SliderField" },
  { id: "disabled", label: "Disabled" },
  { id: "controlled", label: "Controlled" },
]

const dosDontsItems: DosDontsItem[] = [
  {
    do: {
      preview: <Slider defaultValue={[50]} aria-label="Volume" />,
      description:
        "Always provide an aria-label on bare Slider — Radix does not generate an accessible name automatically.",
    },
    dont: {
      preview: <Slider defaultValue={[50]} />,
      description:
        "Don't omit aria-label — screen readers will announce an unlabelled slider.",
    },
  },
  {
    do: {
      preview: <Slider defaultValue={[50]} step={10} aria-label="Brightness" />,
      description:
        "Use step for discrete values when exact increments matter (e.g., 0, 10, 20…).",
    },
    dont: {
      preview: <Slider defaultValue={[50]} aria-label="Price" />,
      description:
        "Don't use Slider when an exact number is needed — use an Input with type=\"number\" instead.",
    },
  },
]

const sliderPropDefs: PropDef[] = [
  {
    name: "value",
    type: ["number[]"],
    description: "Controlled value. Single thumb: [50].",
  },
  {
    name: "defaultValue",
    type: ["number[]"],
    default: "[0]",
    description: "Uncontrolled initial value.",
  },
  {
    name: "min",
    type: ["number"],
    default: "0",
    description: "Minimum value.",
  },
  {
    name: "max",
    type: ["number"],
    default: "100",
    description: "Maximum value.",
  },
  {
    name: "step",
    type: ["number"],
    default: "1",
    description: "Step increment.",
  },
  {
    name: "disabled",
    type: ["boolean"],
    default: "false",
    description: "Disables interaction.",
  },
  {
    name: "name",
    type: ["string"],
    description: "Form field name for submission.",
  },
  {
    name: "onValueChange",
    type: ["(value: number[]) => void"],
    description: "Called on every drag move (live).",
  },
  {
    name: "onValueCommit",
    type: ["(value: number[]) => void"],
    description: "Called on pointer up / keyboard commit.",
  },
  {
    name: "className",
    type: ["string"],
    description: "Additional class names merged via cn().",
  },
]

const sliderFieldPropDefs: PropDef[] = [
  {
    name: "label",
    type: ["string"],
    description: "Label text displayed above the slider.",
  },
  {
    name: "value",
    type: ["number[]"],
    description: "Controlled value (required).",
  },
  {
    name: "onValueChange",
    type: ["(value: number[]) => void"],
    description: "Called on slider drag or input change.",
  },
  {
    name: "onValueCommit",
    type: ["(value: number[]) => void"],
    description: "Called on pointer up / input blur.",
  },
  {
    name: "suffix",
    type: ["string"],
    description: "Unit displayed next to the input (e.g., \"%\", \"px\").",
  },
  {
    name: "min",
    type: ["number"],
    default: "0",
    description: "Minimum value.",
  },
  {
    name: "max",
    type: ["number"],
    default: "100",
    description: "Maximum value.",
  },
  {
    name: "step",
    type: ["number"],
    default: "1",
    description: "Step increment.",
  },
  {
    name: "disabled",
    type: ["boolean"],
    default: "false",
    description: "Disables both slider and input.",
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
  const [value, setValue] = useState([50])
  const [fieldValue, setFieldValue] = useState([62])

  return (
    <div className="flex flex-col gap-12">
      <ComponentPreview
        id="default"
        title="Default"
        description="A single-thumb slider with a distinctive diamond-shaped thumb. Drag or use arrow keys to adjust."
      >
        <div className="w-full max-w-sm">
          <Slider defaultValue={[50]} aria-label="Default slider" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="slider-field"
        title="SliderField"
        description="Compound variant with label and inline numeric input. Slider and input stay in sync — drag to update the number, type to update the thumb."
      >
        <div className="flex flex-col gap-[var(--layout-gap-2xl)] w-full max-w-sm">
          <SliderField
            label="Lightness"
            suffix="%"
            value={fieldValue}
            onValueChange={setFieldValue}
          />
          <SliderField
            label="Saturation"
            suffix="%"
            value={[35]}
            onValueChange={() => {}}
          />
          <SliderField
            label="Border radius"
            suffix="px"
            value={[8]}
            onValueChange={() => {}}
            min={0}
            max={24}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="disabled"
        title="Disabled"
        description="Disabled sliders use muted tokens and prevent interaction."
      >
        <div className="flex flex-col gap-[var(--layout-gap-2xl)] w-full max-w-sm">
          <Slider defaultValue={[40]} disabled aria-label="Disabled slider" />
          <SliderField
            label="Opacity"
            suffix="%"
            value={[60]}
            onValueChange={() => {}}
            disabled
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="controlled"
        title="Controlled"
        description="Use value and onValueChange for controlled state. The current value is displayed live."
      >
        <div className="flex flex-col gap-[var(--layout-gap-lg)] w-full max-w-sm">
          <Slider
            value={value}
            onValueChange={setValue}
            aria-label="Controlled slider"
          />
          <span
            className="text-content-note font-accent"
            style={{ color: "var(--text-base-bolder)" }}
          >
            Value: {value[0]}
          </span>
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

export default function SliderPage() {
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
            Slider
          </h1>
          <p
            className="text-content-highlight"
            style={{ color: "var(--text-base-bolder)" }}
          >
            A range input for selecting a single value within a bounded interval,
            featuring a distinctive diamond-shaped thumb inspired by Magiklch.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add https://ui.getlyse.com/r/slider.json")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <Copy /> Copy install command
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a
                href="https://v0.app/chat?q=add%20component%20from%20https%3A%2F%2Fui.getlyse.com%2Fr%2Fslider.json"
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
                <div className="w-full max-w-sm">
                  <Slider defaultValue={[50]} aria-label="Volume" />
                </div>
              }
              codeString={importCode}
              language="tsx"
            />
          )}

          {/* Tab content */}
          {tab === "overview" ? (
            <OverviewTab />
          ) : tab === "props" ? (
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                <h2
                  className="text-heading-small font-accent"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  Slider
                </h2>
                <PropsTable propDefs={sliderPropDefs} />
              </div>
              <div className="flex flex-col gap-4">
                <h2
                  className="text-heading-small font-accent"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  SliderField
                </h2>
                <PropsTable propDefs={sliderFieldPropDefs} />
              </div>
            </div>
          ) : (
            <DocumentationTab />
          )}
        </div>
      </main>

      <TableOfContents sections={tab === "overview" ? overviewSections : []} />
    </>
  )
}
