import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import "./tag.css"

const tagVariants = cva(
  "inline-flex items-center overflow-hidden whitespace-nowrap font-accent [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        brand: "tag-brand",
        neutral: "tag-neutral",
        success: "tag-success",
        danger: "tag-danger",
        warning: "tag-warning",
      },
      size: {
        sm: "gap-[var(--layout-gap-xs)] px-[var(--layout-padding-sm)] py-[var(--layout-padding-2xs)] rounded-[var(--layout-radius-sm)] text-content-caption [&_svg]:size-3 [&_.tag-dot]:size-1.5",
        md: "gap-[var(--layout-gap-sm)] px-[var(--layout-padding-md)] py-[var(--layout-padding-xs)] rounded-[var(--layout-radius-md)] text-content-caption [&_svg]:size-3 [&_.tag-dot]:size-2",
        lg: "gap-[var(--layout-gap-sm)] px-[var(--layout-padding-md)] py-[var(--layout-padding-xs)] rounded-[var(--layout-radius-lg)] text-content-note [&_svg]:size-3.5 [&_.tag-dot]:size-2",
      },
      type: {
        fill: "tag-fill",
        dash: "tag-dash",
        emphasis: "tag-emphasis",
        ghost: "tag-ghost",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "sm",
      type: "fill",
    },
  }
)

function TagDot({ className }: { className?: string }) {
  return <span className={cn("tag-dot shrink-0", className)} />
}

function TagClose({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      data-slot="tag-close"
      type="button"
      className={cn(
        "tag-close shrink-0 cursor-pointer inline-flex items-center justify-center",
        className
      )}
      {...props}
    >
      {children ?? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      )}
    </button>
  )
}

function Tag({
  className,
  variant,
  size,
  type,
  children,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof tagVariants>) {
  return (
    <span
      data-slot="tag"
      className={cn(tagVariants({ variant, size, type, className }))}
      {...props}
    >
      {children}
    </span>
  )
}

export { Tag, TagDot, TagClose, tagVariants }
