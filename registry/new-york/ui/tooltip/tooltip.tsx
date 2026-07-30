import * as React from "react"
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import "./tooltip.css"

const tooltipContentVariants = cva(
  "tooltip-content z-50 flex items-center overflow-hidden font-accent transition-[opacity,transform] duration-150 data-[starting-style]:opacity-0 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[ending-style]:scale-95 data-[side=bottom]:data-[starting-style]:-translate-y-2 data-[side=top]:data-[starting-style]:translate-y-2 data-[side=left]:data-[starting-style]:translate-x-2 data-[side=right]:data-[starting-style]:-translate-x-2",
  {
    variants: {
      size: {
        md: "max-w-40 gap-[var(--layout-gap-sm)] p-[var(--layout-padding-md)] rounded-[var(--layout-radius-lg)] text-content-note",
        sm: "max-w-40 gap-[var(--layout-gap-sm)] p-[var(--layout-padding-sm)] rounded-[var(--layout-radius-lg)] text-content-caption",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

function TooltipProvider({
  delayDuration = 300,
  ...props
}: Omit<React.ComponentProps<typeof TooltipPrimitive.Provider>, "delay"> & {
  delayDuration?: number
}) {
  return (
    <TooltipPrimitive.Provider
      delay={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root {...props} />
}

function TooltipTrigger({
  asChild,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger> & {
  asChild?: boolean
}) {
  if (asChild && React.isValidElement(children)) {
    return (
      <TooltipPrimitive.Trigger
        data-slot="tooltip-trigger"
        render={children as React.ReactElement<Record<string, unknown>>}
        {...props}
      />
    )
  }
  return (
    <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props}>
      {children}
    </TooltipPrimitive.Trigger>
  )
}

function TooltipContent({
  className,
  size,
  sideOffset = 6,
  side,
  align,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Popup> &
  VariantProps<typeof tooltipContentVariants> & {
    sideOffset?: number
    side?: React.ComponentProps<typeof TooltipPrimitive.Positioner>["side"]
    align?: React.ComponentProps<typeof TooltipPrimitive.Positioner>["align"]
  }) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner sideOffset={sideOffset} side={side} align={align}>
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(tooltipContentVariants({ size, className }))}
          {...props}
        >
          {children}
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

function TooltipShortcut({
  className,
  ...props
}: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="tooltip-shortcut"
      className={cn("tooltip-shortcut h-[var(--layout-size-sm)] shrink-0 text-content-caption", className)}
      {...props}
    />
  )
}

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  TooltipShortcut,
  tooltipContentVariants,
}
