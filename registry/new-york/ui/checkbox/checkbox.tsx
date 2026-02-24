import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { cva, type VariantProps } from "class-variance-authority"
import { Check, Minus } from "lucide-react"

import { cn } from "@/lib/utils"
import "./checkbox.css"

const checkboxVariants = cva(
  "checkbox-indicator inline-flex items-center justify-center shrink-0",
  {
    variants: {
      size: {
        sm: "h-[var(--layout-size-xs)] w-[var(--layout-size-xs)] rounded-[var(--layout-radius-sm)]",
        md: "h-[var(--layout-size-sm)] w-[var(--layout-size-sm)] rounded-[var(--layout-radius-md)]",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
)

function Checkbox({
  className,
  size = "sm",
  label,
  description,
  disabled,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> &
  VariantProps<typeof checkboxVariants> & {
    label?: string
    description?: string
  }) {
  const id = React.useId()

  return (
    <div
      data-slot="checkbox"
      data-disabled={disabled || undefined}
      className={cn("flex items-start gap-[var(--layout-gap-md)]", className)}
    >
      <div className="flex items-center py-[var(--layout-padding-2xs)]">
        <CheckboxPrimitive.Root
          id={id}
          className={cn(checkboxVariants({ size }))}
          disabled={disabled}
          {...props}
        >
          <CheckboxPrimitive.Indicator className="checkbox-icon flex items-center justify-center">
            <Check
              className={cn(
                "checkbox-check",
                size === "sm" ? "size-3" : "size-3.5"
              )}
              strokeWidth={3}
            />
            <Minus
              className={cn(
                "checkbox-minus",
                size === "sm" ? "size-3" : "size-3.5"
              )}
              strokeWidth={3}
            />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
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
              "font-accent checkbox-label",
              size === "sm" ? "text-content-note" : "text-content-body"
            )}
          >
            {label}
          </span>
          {description && (
            <span className="text-content-note checkbox-description">
              {description}
            </span>
          )}
        </label>
      )}
    </div>
  )
}

export { Checkbox, checkboxVariants }
