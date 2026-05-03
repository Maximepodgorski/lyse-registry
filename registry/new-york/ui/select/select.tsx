import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui-components/react/select"
import { cva, type VariantProps } from "class-variance-authority"
import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import "./select.css"

/* ------------------------------------------------------------------ */
/*  CVA                                                                */
/* ------------------------------------------------------------------ */

const selectTriggerVariants = cva(
  "select-trigger inline-flex items-center justify-between gap-[var(--layout-gap-md)] rounded-[var(--layout-radius-lg)] px-[var(--layout-padding-md)] text-content-note font-accent",
  {
    variants: {
      variant: {
        default: "",
        destructive: "select-trigger-destructive",
        success: "select-trigger-success",
      },
      size: {
        sm: "h-[var(--layout-size-lg)]",
        md: "h-9",
        lg: "h-[var(--layout-size-xl)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

/* ------------------------------------------------------------------ */
/*  Select                                                             */
/* ------------------------------------------------------------------ */

function Select<Value>(
  props: React.ComponentProps<typeof SelectPrimitive.Root<Value, false>>
) {
  return <SelectPrimitive.Root {...props} />
}

/* ------------------------------------------------------------------ */
/*  SelectGroup                                                        */
/* ------------------------------------------------------------------ */

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

/* ------------------------------------------------------------------ */
/*  SelectValue                                                        */
/* ------------------------------------------------------------------ */

function SelectValue({
  placeholder,
  children,
  ...props
}: Omit<React.ComponentProps<typeof SelectPrimitive.Value>, "children"> & {
  placeholder?: React.ReactNode
  children?: React.ReactNode | ((value: unknown) => React.ReactNode)
}) {
  return (
    <SelectPrimitive.Value data-slot="select-value" {...props}>
      {children !== undefined
        ? (children as React.ComponentProps<typeof SelectPrimitive.Value>["children"])
        : (value: unknown) =>
            value === null || value === undefined || value === ""
              ? placeholder
              : (value as React.ReactNode)}
    </SelectPrimitive.Value>
  )
}

/* ------------------------------------------------------------------ */
/*  SelectTrigger                                                      */
/* ------------------------------------------------------------------ */

function SelectTrigger({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> &
  VariantProps<typeof selectTriggerVariants>) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(selectTriggerVariants({ variant, size, className }))}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        render={
          <ChevronDown className="select-chevron h-[var(--layout-size-xs)] w-[var(--layout-size-xs)] shrink-0" />
        }
      />
    </SelectPrimitive.Trigger>
  )
}

/* ------------------------------------------------------------------ */
/*  SelectContent                                                      */
/* ------------------------------------------------------------------ */

function SelectContent({
  className,
  sideOffset = 6,
  side,
  align,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Popup> & {
  sideOffset?: number
  side?: React.ComponentProps<typeof SelectPrimitive.Positioner>["side"]
  align?: React.ComponentProps<typeof SelectPrimitive.Positioner>["align"]
  position?: "popper" | "item-aligned"
}) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        sideOffset={sideOffset}
        side={side}
        align={align}
        className="z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={cn(
            "select-content min-w-[var(--anchor-width)] rounded-[var(--layout-radius-xl)] p-[var(--layout-padding-xs)] transition-[opacity,transform] duration-150 data-[starting-style]:opacity-0 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[ending-style]:scale-95 max-h-[var(--available-height)] overflow-y-auto",
            className
          )}
          {...props}
        >
          {children}
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

/* ------------------------------------------------------------------ */
/*  SelectItem                                                         */
/* ------------------------------------------------------------------ */

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "select-item flex items-center gap-[var(--layout-gap-md)] rounded-[var(--layout-radius-lg)] h-9 py-[var(--layout-padding-sm)] px-[var(--layout-padding-md)] text-content-note font-accent",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex-1">{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="select-item-indicator shrink-0 ml-auto">
        <Check className="h-[var(--layout-size-xs)] w-[var(--layout-size-xs)]" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

/* ------------------------------------------------------------------ */
/*  SelectLabel                                                        */
/* ------------------------------------------------------------------ */

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.GroupLabel>) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn(
        "select-label px-[var(--layout-padding-md)] py-[var(--layout-padding-sm)] text-content-caption font-accent",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  SelectSeparator                                                    */
/* ------------------------------------------------------------------ */

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("select-separator my-[var(--layout-gap-xs)]", className)}
      {...props}
    />
  )
}

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  selectTriggerVariants,
}
