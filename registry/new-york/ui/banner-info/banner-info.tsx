import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  Sparkles,
  Info,
  TriangleAlert,
  CircleCheck,
} from "lucide-react"

import { cn } from "@/lib/utils"
import "./banner-info.css"

const bannerInfoVariants = cva(
  "flex items-start gap-[var(--layout-gap-md)] rounded-[var(--layout-radius-xl)] p-[var(--layout-padding-lg)] text-content-note [&_svg]:shrink-0 [&_svg]:h-[var(--layout-size-sm)] [&_svg]:w-[var(--layout-size-sm)]",
  {
    variants: {
      variant: {
        brand: "banner-info-brand",
        neutral: "banner-info-neutral",
        danger: "banner-info-danger",
        success: "banner-info-success",
        warning: "banner-info-warning",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
)

const variantIcons = {
  brand: Sparkles,
  neutral: Info,
  danger: TriangleAlert,
  success: CircleCheck,
  warning: TriangleAlert,
} as const

function BannerInfo({
  className,
  variant = "neutral",
  withIcon = true,
  children,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof bannerInfoVariants> & {
    withIcon?: boolean
  }) {
  const Icon = variant ? variantIcons[variant] : variantIcons.neutral

  return (
    <div
      data-slot="banner-info"
      role="status"
      className={cn(bannerInfoVariants({ variant, className }))}
      {...props}
    >
      {withIcon && <Icon aria-hidden="true" />}
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  )
}

export { BannerInfo, bannerInfoVariants }
