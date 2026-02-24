import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import "./radio.css"

const radioVariants = cva(
  "radio-indicator inline-flex items-center justify-center shrink-0 rounded-full transition-colors cursor-pointer",
  {
    variants: {
      size: {
        sm: "h-[var(--layout-size-xs)] w-[var(--layout-size-xs)]",
        md: "h-[var(--layout-size-sm)] w-[var(--layout-size-sm)]",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
)

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("flex flex-col gap-[var(--layout-gap-md)]", className)}
      {...props}
    />
  )
}

function Radio({
  className,
  size = "sm",
  label,
  description,
  disabled,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item> &
  VariantProps<typeof radioVariants> & {
    label?: string
    description?: string
  }) {
  const id = React.useId()

  return (
    <div
      data-slot="radio"
      data-disabled={disabled || undefined}
      className={cn("flex items-start gap-[var(--layout-gap-md)]", className)}
    >
      <div className="flex items-center py-[var(--layout-padding-2xs)]">
        <RadioGroupPrimitive.Item
          id={id}
          className={cn(radioVariants({ size }))}
          disabled={disabled}
          {...props}
        >
          <RadioGroupPrimitive.Indicator
            className={cn(
              "radio-dot rounded-full",
              size === "sm" ? "size-1.5" : "size-2"
            )}
          />
        </RadioGroupPrimitive.Item>
      </div>
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
              "font-accent radio-label",
              size === "sm" ? "text-content-note" : "text-content-body"
            )}
          >
            {label}
          </span>
          {description && (
            <span className="text-content-note radio-description">
              {description}
            </span>
          )}
        </label>
      )}
    </div>
  )
}

export { RadioGroup, Radio, radioVariants }
