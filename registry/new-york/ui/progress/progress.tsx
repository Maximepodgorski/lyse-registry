import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import "./progress.css"

const progressItemVariants = cva(
  "progress-item-base flex-[1_0_0] min-w-0",
  {
    variants: {
      size: {
        sm: "h-1.5",
        md: "h-2",
      },
      position: {
        left: "",
        middle: "",
        right: "",
      },
    },
    compoundVariants: [
      { size: "sm", position: "left", className: "rounded-l-[var(--layout-radius-xs)]" },
      { size: "sm", position: "right", className: "rounded-r-[var(--layout-radius-xs)]" },
      { size: "md", position: "left", className: "rounded-l-[var(--layout-radius-sm)]" },
      { size: "md", position: "right", className: "rounded-r-[var(--layout-radius-sm)]" },
    ],
    defaultVariants: {
      size: "md",
      position: "middle",
    },
  }
)

function ProgressItem({
  className,
  size,
  position,
  active = false,
  ...props
}: Omit<React.ComponentProps<"div">, "active"> &
  VariantProps<typeof progressItemVariants> & {
    active?: boolean
  }) {
  return (
    <div
      data-slot="progress-item"
      className={cn(
        progressItemVariants({ size, position, className }),
        active ? "progress-item-active" : "progress-item-inactive"
      )}
      {...props}
    />
  )
}

const progressIndicatorVariants = cva(
  "flex w-full",
  {
    variants: {
      labelPosition: {
        none: "items-center",
        right: "items-center gap-[var(--layout-gap-lg)]",
        bottom: "flex-col items-end gap-[var(--layout-gap-md)]",
      },
    },
    defaultVariants: {
      labelPosition: "none",
    },
  }
)

function ProgressIndicator({
  className,
  value = 0,
  steps = 5,
  size = "md",
  labelPosition = "none",
  label = "Progress",
  ...props
}: Omit<React.ComponentProps<"div">, "value"> &
  VariantProps<typeof progressIndicatorVariants> & {
    value?: number
    steps?: number
    size?: "sm" | "md"
    label?: string
  }) {
  const clampedValue = Math.max(0, Math.min(100, value))
  const safeSteps = Math.max(1, steps)
  const activeSteps = Math.round((clampedValue / 100) * safeSteps)

  const getPosition = (index: number): "left" | "middle" | "right" => {
    if (activeSteps === 0 || activeSteps === safeSteps) return "middle"
    if (index === activeSteps - 1) return "right"
    if (index === activeSteps) return "left"
    return "middle"
  }

  return (
    <div
      data-slot="progress-indicator"
      className={cn(progressIndicatorVariants({ labelPosition, className }))}
      {...props}
    >
      <div
        className={cn(
          "progress-track flex items-center overflow-hidden",
          size === "sm"
            ? "rounded-[var(--layout-radius-xs)]"
            : "rounded-[var(--layout-radius-sm)]",
          labelPosition === "bottom" ? "shrink-0 w-full" : "flex-1 min-w-0"
        )}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        {Array.from({ length: safeSteps }, (_, i) => (
          <ProgressItem
            key={i}
            size={size}
            position={getPosition(i)}
            active={i < activeSteps}
          />
        ))}
      </div>
      {labelPosition !== "none" && (
        <p className="progress-label text-content-note font-accent shrink-0 whitespace-nowrap text-right">
          {clampedValue}%
        </p>
      )}
    </div>
  )
}

export {
  ProgressItem,
  ProgressIndicator,
  progressItemVariants,
  progressIndicatorVariants,
}
