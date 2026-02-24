import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import "./toggle.css"

const toggleVariants = cva(
  "toggle-track inline-flex items-center shrink-0 rounded-[var(--layout-radius-full)] p-[var(--layout-padding-2xs)] transition-colors cursor-pointer",
  {
    variants: {
      size: {
        sm: "h-[var(--layout-size-sm)] w-9",
        md: "h-[var(--layout-size-md)] w-11",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
)

const thumbVariants = cva(
  "toggle-thumb block rounded-full",
  {
    variants: {
      size: {
        sm: "h-[var(--layout-size-xs)] w-[var(--layout-size-xs)] data-[state=checked]:translate-x-[14px]",
        md: "h-[var(--layout-size-sm)] w-[var(--layout-size-sm)] data-[state=checked]:translate-x-[18px]",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
)

function Toggle({
  className,
  size = "sm",
  label,
  description,
  disabled,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> &
  VariantProps<typeof toggleVariants> & {
    label?: string
    description?: string
  }) {
  const id = React.useId()

  return (
    <div
      data-slot="toggle"
      data-disabled={disabled || undefined}
      className={cn("flex items-center gap-[var(--layout-gap-md)]", className)}
    >
      <SwitchPrimitive.Root
        id={id}
        className={cn(toggleVariants({ size }))}
        disabled={disabled}
        {...props}
      >
        <SwitchPrimitive.Thumb className={cn(thumbVariants({ size }))} />
      </SwitchPrimitive.Root>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "flex flex-col",
            disabled ? "cursor-default" : "cursor-pointer"
          )}
        >
          <span
            className={cn(
              "font-accent toggle-label",
              size === "sm" ? "text-content-note" : "text-content-body"
            )}
          >
            {label}
          </span>
          {description && (
            <span className="text-content-note toggle-description">
              {description}
            </span>
          )}
        </label>
      )}
    </div>
  )
}

export { Toggle, toggleVariants }
