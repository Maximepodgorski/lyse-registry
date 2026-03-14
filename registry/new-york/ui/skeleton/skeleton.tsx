import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import "./skeleton.css"

const skeletonVariants = cva("skeleton-base", {
  variants: {
    shape: {
      text: "w-full rounded-[var(--layout-radius-sm)]",
      circle: "rounded-full aspect-square",
      rect: "w-full rounded-[var(--layout-radius-md)]",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
    animated: {
      true: "skeleton-shimmer",
      false: "",
    },
  },
  compoundVariants: [
    // text × size
    { shape: "text", size: "sm", class: "h-[var(--layout-size-2xs)]" },
    { shape: "text", size: "md", class: "h-[var(--layout-size-xs)]" },
    { shape: "text", size: "lg", class: "h-[var(--layout-size-base)]" },
    // circle × size
    { shape: "circle", size: "sm", class: "size-[var(--layout-size-sm)]" },
    { shape: "circle", size: "md", class: "size-[var(--layout-size-lg)]" },
    { shape: "circle", size: "lg", class: "size-[var(--layout-size-xl)]" },
    // rect × size
    { shape: "rect", size: "sm", class: "h-[var(--layout-size-sm)]" },
    { shape: "rect", size: "md", class: "h-[var(--layout-size-lg)]" },
    { shape: "rect", size: "lg", class: "h-[var(--layout-size-xl)]" },
  ],
  defaultVariants: {
    shape: "rect",
    size: "md",
    animated: true,
  },
})

function Skeleton({
  className,
  shape,
  size,
  animated,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof skeletonVariants>) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn(skeletonVariants({ shape, size, animated, className }))}
      {...props}
    />
  )
}

export { Skeleton, skeletonVariants }
