import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import "./button.css"

const buttonVariants = cva(
  "inline-flex items-center justify-center overflow-hidden whitespace-nowrap font-accent cursor-pointer transition-colors [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "btn-primary",
        secondary: "btn-secondary",
        terciary: "btn-terciary",
        destructive: "btn-destructive",
      },
      size: {
        xs: "h-6 gap-[var(--layout-gap-xs)] px-[var(--layout-padding-xs)] rounded-lg text-content-caption [&_svg]:size-3.5",
        sm: "h-8 gap-[var(--layout-gap-sm)] px-[var(--layout-padding-md)] rounded-lg text-content-note [&_svg]:size-4",
        md: "h-10 gap-[var(--layout-gap-sm)] px-[var(--layout-padding-lg)] rounded-lg text-content-note [&_svg]:size-4",
        lg: "h-12 gap-[var(--layout-gap-sm)] px-[var(--layout-padding-xl)] rounded-xl text-content-body [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

function Button({
  className,
  variant,
  size,
  isIconOnly = false,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    isIconOnly?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, className }),
        isIconOnly && "aspect-square px-0 gap-0"
      )}
      {...props}
    />
  )
}

export { Button, buttonVariants }
