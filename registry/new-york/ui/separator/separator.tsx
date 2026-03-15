import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import "./separator.css"

const separatorVariants = cva("separator-base shrink-0", {
  variants: {
    orientation: {
      horizontal: "w-full h-px",
      vertical: "w-px h-full",
    },
    variant: {
      subtle: "separator-subtle",
      default: "separator-default",
      strong: "separator-strong",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    variant: "default",
  },
})

function Separator({
  className,
  orientation = "horizontal",
  variant,
  decorative = true,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof separatorVariants> & {
    decorative?: boolean
  }) {
  return (
    <div
      data-slot="separator"
      role={decorative ? "none" : "separator"}
      aria-orientation={
        !decorative && orientation === "vertical" ? "vertical" : undefined
      }
      aria-hidden={decorative ? true : undefined}
      className={cn(separatorVariants({ orientation, variant, className }))}
      {...props}
    />
  )
}

export { Separator, separatorVariants }
