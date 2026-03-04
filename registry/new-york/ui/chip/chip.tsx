import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import "./chip.css"

const chipVariants = cva(
  "chip-base inline-flex h-[var(--layout-size-md)] items-center justify-center whitespace-nowrap rounded-[var(--layout-radius-full)] py-[var(--layout-padding-xs)] text-content-caption cursor-pointer [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        filled: "chip-filled",
        outline: "chip-outline",
        ghost: "chip-ghost",
      },
    },
    defaultVariants: {
      variant: "filled",
    },
  }
)

function Chip({
  className,
  variant,
  hasDropdown = false,
  icon,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof chipVariants> & {
    hasDropdown?: boolean
    icon?: React.ReactNode
  }) {
  return (
    <button
      data-slot="chip"
      type="button"
      className={cn(
        chipVariants({ variant, className }),
        hasDropdown
          ? "gap-0 pl-[var(--layout-padding-md)] pr-[var(--layout-padding-xs)]"
          : "gap-[var(--layout-gap-xs)] px-[var(--layout-padding-md)]"
      )}
      {...props}
    >
      {!hasDropdown && icon && (
        <span className="chip-icon shrink-0 flex items-center" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
      {hasDropdown && (
        <ChevronDown className="chip-chevron" aria-hidden="true" />
      )}
    </button>
  )
}

export { Chip, chipVariants }
