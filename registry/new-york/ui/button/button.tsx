import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import "./button.css"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap font-accent cursor-pointer transition-colors [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "btn-primary",
        secondary: "btn-secondary",
        terciary: "btn-terciary",
        destructive: "btn-destructive",
      },
      size: {
        xs: "h-[var(--layout-size-md)] gap-[var(--layout-gap-xs)] px-[var(--layout-padding-xs)] rounded-[var(--layout-radius-lg)] text-content-caption [&_svg]:size-3.5",
        sm: "h-[var(--layout-size-lg)] gap-[var(--layout-gap-sm)] px-[var(--layout-padding-md)] rounded-[var(--layout-radius-lg)] text-content-note [&_svg]:h-[var(--layout-size-xs)] [&_svg]:w-[var(--layout-size-xs)]",
        md: "h-[var(--layout-size-xl)] gap-[var(--layout-gap-sm)] px-[var(--layout-padding-lg)] rounded-[var(--layout-radius-lg)] text-content-note [&_svg]:h-[var(--layout-size-xs)] [&_svg]:w-[var(--layout-size-xs)]",
        lg: "h-[var(--layout-size-2xl)] gap-[var(--layout-gap-sm)] px-[var(--layout-padding-xl)] rounded-[var(--layout-radius-xl)] text-content-body [&_svg]:h-[var(--layout-size-sm)] [&_svg]:w-[var(--layout-size-sm)]",
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
  onPointerDown,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    isIconOnly?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  const handlePointerDown = React.useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      onPointerDown?.(e)
      const btn = e.currentTarget
      const rect = btn.getBoundingClientRect()
      const diameter = Math.sqrt(rect.width ** 2 + rect.height ** 2) * 2
      const ripple = document.createElement("span")
      ripple.className = "absolute rounded-full bg-current pointer-events-none animate-ripple motion-reduce:hidden"
      ripple.style.width = `${diameter}px`
      ripple.style.height = `${diameter}px`
      ripple.style.left = `${e.clientX - rect.left - diameter / 2}px`
      ripple.style.top = `${e.clientY - rect.top - diameter / 2}px`
      btn.appendChild(ripple)
      ripple.addEventListener("animationend", () => ripple.remove())
    },
    [onPointerDown]
  )

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, className }),
        isIconOnly && "aspect-square px-0 gap-0"
      )}
      onPointerDown={handlePointerDown}
      {...props}
    />
  )
}

export { Button, buttonVariants }
