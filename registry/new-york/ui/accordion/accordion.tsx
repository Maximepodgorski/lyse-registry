import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Plus, X } from "lucide-react"

import { cn } from "@/lib/utils"
import "./accordion.css"

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex flex-col gap-[var(--layout-gap-sm)]", className)}
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
          <Plus className="accordion-icon-plus" />
          <X className="accordion-icon-x" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn("accordion-content overflow-hidden", className)}
      {...props}
    >
      <div className="accordion-content-inner px-[var(--layout-padding-lg)] pb-[var(--layout-padding-lg)] text-content-body">
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
