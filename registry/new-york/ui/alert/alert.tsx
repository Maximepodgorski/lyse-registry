import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  Info,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"
import "./alert.css"

/* ------------------------------------------------------------------ */
/*  Variant icons                                                      */
/* ------------------------------------------------------------------ */

const variantIcons = {
  brand: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: XCircle,
} as const

/* ------------------------------------------------------------------ */
/*  CVA                                                                */
/* ------------------------------------------------------------------ */

const alertVariants = cva(
  "flex items-start gap-[var(--layout-gap-md)] rounded-[var(--layout-radius-lg)] p-[var(--layout-padding-lg)] [&_svg]:shrink-0 [&_svg]:size-4",
  {
    variants: {
      variant: {
        brand: "alert-brand",
        success: "alert-success",
        warning: "alert-warning",
        danger: "alert-danger",
      },
    },
    defaultVariants: {
      variant: "brand",
    },
  }
)

/* ------------------------------------------------------------------ */
/*  Alert                                                              */
/* ------------------------------------------------------------------ */

function Alert({
  className,
  variant = "brand",
  icon,
  action,
  actionPlacement = "bottom",
  onDismiss,
  children,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof alertVariants> & {
    icon?: React.ReactNode | null
    action?: React.ReactNode
    actionPlacement?: "bottom" | "right"
    onDismiss?: () => void
  }) {
  const showIcon = icon !== null
  const IconComponent = variant ? variantIcons[variant] : variantIcons.brand

  return (
    <div
      data-slot="alert"
      role="alert"
      aria-live="polite"
      className={cn(alertVariants({ variant, className }))}
      {...props}
    >
      {showIcon && (
        <span className="alert-icon mt-0.5 shrink-0" aria-hidden="true">
          {icon !== undefined ? icon : <IconComponent />}
        </span>
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-[var(--layout-gap-xs)]">
        {children}
        {action && actionPlacement === "bottom" && (
          <div className="mt-[var(--layout-gap-sm)]">{action}</div>
        )}
      </div>

      {action && actionPlacement === "right" && (
        <div className="shrink-0 self-center">{action}</div>
      )}

      {onDismiss && (
        <button
          type="button"
          className="alert-dismiss shrink-0"
          aria-label="Dismiss"
          onClick={onDismiss}
        >
          <X aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  AlertTitle                                                         */
/* ------------------------------------------------------------------ */

function AlertTitle({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="alert-title"
      className={cn("text-content-note font-accent [color:var(--text-base-strong)]", className)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  AlertDescription                                                   */
/* ------------------------------------------------------------------ */

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="alert-description"
      className={cn("text-content-note [color:var(--text-base-bolder)]", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, alertVariants }
