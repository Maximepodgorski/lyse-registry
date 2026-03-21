import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import "./stepper.css"

const stepperVariants = cva(
  "stepper-base inline-flex items-center",
  {
    variants: {
      size: {
        sm: "gap-[var(--layout-gap-xs)]",
        md: "gap-[var(--layout-gap-sm)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

function Stepper({
  className,
  size = "md",
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
  const safeTotal = Math.max(1, total)
  const safeCurrent = Math.max(0, Math.min(current, safeTotal - 1))

  return (
    <div
      data-slot="stepper"
      role="group"
      aria-label={`Step ${safeCurrent + 1} of ${safeTotal}`}
      className={cn(
        stepperVariants({ size, className }),
        size === "sm" ? "stepper-sm" : "stepper-md"
      )}
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
              aria-label={`Step ${i + 1}`}
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
