import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import "./spinner.css"

const spinnerVariants = cva(
  "inline-flex items-center justify-center",
  {
    variants: {
      size: {
        sm: "size-[var(--layout-size-xs)]",
        md: "size-[var(--layout-size-md)]",
        lg: "size-[var(--layout-size-lg)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

function Spinner({
  className,
  size,
  label = "Loading",
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof spinnerVariants> & {
    label?: string
  }) {
  return (
    <span
      data-slot="spinner"
      role="status"
      className={cn(spinnerVariants({ size, className }))}
      {...props}
    >
      <svg
        className="size-full spinner-svg"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          className="spinner-track"
          cx="12"
          cy="12"
          r="9"
          strokeWidth="1.5"
        />
        <circle
          className="spinner-arc"
          cx="12"
          cy="12"
          r="9"
          strokeWidth="1.5"
          strokeDasharray="14.14 42.41"
          strokeLinecap="round"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  )
}

export { Spinner, spinnerVariants }
