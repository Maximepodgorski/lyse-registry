import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
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

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
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
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
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
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="select-chevron h-[var(--layout-size-xs)] w-[var(--layout-size-xs)] shrink-0" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

/* ------------------------------------------------------------------ */
/*  SelectContent                                                      */
/* ------------------------------------------------------------------ */

function SelectContent({
  className,
  position = "popper",
  sideOffset = 6,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        position={position}
        sideOffset={sideOffset}
        className={cn(
          "select-content z-50 min-w-[8rem] overflow-hidden rounded-[var(--layout-radius-lg)] p-[var(--layout-padding-xs)] animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          position === "popper" && "max-h-[var(--radix-select-content-available-height)]",
          className
        )}
        {...props}
      >
        <SelectPrimitive.Viewport
          className={cn(
            position === "popper" && "w-full min-w-[var(--radix-select-trigger-width)]"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
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
      <SelectPrimitive.ItemIndicator className="select-item-indicator shrink-0">
        <Check className="h-[var(--layout-size-xs)] w-[var(--layout-size-xs)]" />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

/* ------------------------------------------------------------------ */
/*  SelectLabel                                                        */
/* ------------------------------------------------------------------ */

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
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
