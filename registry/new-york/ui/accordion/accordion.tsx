import * as React from "react"
import { Accordion as AccordionPrimitive } from "@base-ui-components/react/accordion"
import { Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import "./accordion.css"

type AccordionValue = (string | number | null)[]

type AccordionProps = Omit<
  React.ComponentProps<typeof AccordionPrimitive.Root>,
  "value" | "defaultValue" | "onValueChange"
> & {
  type?: "single" | "multiple"
  collapsible?: boolean
  value?: string | string[] | AccordionValue
  defaultValue?: string | string[] | AccordionValue
  onValueChange?: (value: string | string[]) => void
}

function Accordion({
  className,
  type = "multiple",
  collapsible = true,
  value,
  defaultValue,
  onValueChange,
  ...props
}: AccordionProps) {
  const isSingle = type === "single"

  const toArray = (v: string | string[] | AccordionValue | undefined): AccordionValue => {
    if (v === undefined) return []
    if (Array.isArray(v)) return v as AccordionValue
    return [v]
  }

  const fromArray = (v: AccordionValue): string | string[] => {
    const filtered = v.filter((x): x is string | number => x !== null).map(String)
    return isSingle ? filtered[0] ?? "" : filtered
  }

  const [internalValue, setInternalValue] = React.useState<AccordionValue>(() =>
    defaultValue !== undefined ? toArray(defaultValue) : []
  )
  const isControlled = value !== undefined
  const currentValue = isControlled ? toArray(value) : internalValue

  const handleChange = (next: AccordionValue) => {
    let constrained: AccordionValue = next
    if (isSingle) {
      const last = next.slice(-1)
      // type=single: only one open at a time
      // collapsible=false: prevent closing the only open item
      if (!collapsible && last.length === 0 && currentValue.length > 0) {
        return
      }
      constrained = last
    }
    if (!isControlled) setInternalValue(constrained)
    onValueChange?.(fromArray(constrained))
  }

  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex flex-col gap-[var(--layout-gap-sm)]", className)}
      value={currentValue}
      onValueChange={handleChange}
      {...props}
    />
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "accordion-item rounded-[var(--layout-radius-md)] overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header data-slot="accordion-header" className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "accordion-trigger flex flex-1 items-center justify-between min-h-[var(--layout-size-lg)] px-[var(--layout-padding-lg)] py-[var(--layout-padding-md)] text-content-body font-accent cursor-pointer focus-visible:outline-none",
          className
        )}
        {...props}
      >
        <span>{children}</span>
        <span className="accordion-icon shrink-0 [&_svg]:h-[var(--layout-size-xs)] [&_svg]:w-[var(--layout-size-xs)]">
          <Plus />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Panel>) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className={cn("accordion-content overflow-hidden", className)}
      {...props}
    >
      <div className="accordion-content-inner px-[var(--layout-padding-lg)] pb-[var(--layout-padding-lg)] text-content-note">
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
