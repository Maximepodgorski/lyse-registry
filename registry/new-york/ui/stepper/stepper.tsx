import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import "./stepper.css"

const stepperVariants = cva(
  "inline-flex items-center",
  {
    variants: {
      variant: {
        neutral: "stepper-neutral",
        brand: "stepper-brand",
      },
      size: {
        sm: "stepper-sm gap-[var(--layout-gap-xs)]",
        md: "stepper-md gap-[var(--layout-gap-sm)]",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "md",
    },
  }
)

function Stepper({
  className,
  variant,
  size,
  current = 0,
  total,
  onStepClick,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> &
  VariantProps<typeof stepperVariants> & {
    current?: number
    total: number
    onStepClick?: (step: number) => void
  }) {
  const safeTotal = Number.isFinite(total) ? Math.max(1, Math.floor(total)) : 1
  const safeCurrent = Math.max(0, Math.min(current, safeTotal - 1))

  return (
    <div
      data-slot="stepper"
      role="group"
      aria-label={`Step ${safeCurrent + 1} of ${safeTotal}`}
      className={cn(stepperVariants({ variant, size, className }))}
      {...props}
    >
      {Array.from({ length: safeTotal }, (_, i) => {
        const state =
          i < safeCurrent
            ? "complete"
            : i === safeCurrent
              ? "active"
              : "incomplete"

        const stateClass =
          state === "complete"
            ? "step-dot-complete"
            : state === "active"
              ? "step-dot-active"
              : "step-dot-incomplete"

        const shared = cn("step-dot rounded-full shrink-0", stateClass)

        if (onStepClick) {
          return (
            <button
              key={i}
              data-slot="step-dot"
              type="button"
              className={cn(shared, "step-dot-clickable")}
              aria-label={`Step ${i + 1}${state === "complete" ? " (completed)" : state === "active" ? " (current)" : ""}`}
              aria-current={state === "active" ? "step" : undefined}
              onClick={() => onStepClick(i)}
            />
          )
        }

        return (
          <span
            key={i}
            data-slot="step-dot"
            className={shared}
            aria-current={state === "active" ? "step" : undefined}
          />
        )
      })}
    </div>
  )
}

export { Stepper, stepperVariants }
