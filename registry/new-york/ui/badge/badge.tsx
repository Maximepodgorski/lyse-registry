import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import "./badge.css"

const badgeVariants = cva(
  "inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-full [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        brand: "badge-brand",
        neutral: "badge-neutral",
        success: "badge-success",
        danger: "badge-danger",
        warning: "badge-warning",
      },
      size: {
        sm: "min-w-5 gap-[var(--layout-gap-xs)] px-[var(--layout-padding-sm)] py-[var(--layout-padding-2xs)] text-content-caption [&_svg]:size-3 [&_.badge-dot]:size-1.5",
        md: "min-w-6 gap-[var(--layout-gap-sm)] px-[var(--layout-padding-md)] py-[var(--layout-padding-xs)] text-content-caption [&_svg]:size-3 [&_.badge-dot]:size-1.5",
        lg: "min-w-7 gap-[var(--layout-gap-sm)] px-[var(--layout-padding-lg)] py-[var(--layout-padding-xs)] text-content-note [&_svg]:size-3.5 [&_.badge-dot]:size-2",
      },
      type: {
        fill: "",
        light: "badge-light",
        dash: "badge-dash",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "md",
      type: "fill",
    },
  }
)

function BadgeDot({ className }: { className?: string }) {
  return <span className={cn("badge-dot shrink-0", className)} />
}

function Badge({
  className,
  variant,
  size,
  type,
  isFilled = false,
  children,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    isFilled?: boolean
  }) {
  return (
    <span
      data-slot="badge"
      className={cn(
        badgeVariants({ variant, size, type, className }),
        isFilled && "badge-filled"
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export { Badge, BadgeDot, badgeVariants }
