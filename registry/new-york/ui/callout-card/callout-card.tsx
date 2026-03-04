import * as React from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import "./callout-card.css"

function CalloutCard({
  className,
  icon,
  title,
  description,
  action,
  onDismiss,
  ...props
}: React.ComponentProps<"div"> & {
  icon?: React.ReactNode
  title?: string
  description?: string
  action?: React.ReactNode
  onDismiss?: () => void
}) {
  return (
    <div
      data-slot="callout-card"
      className={cn("callout-card-base", className)}
      {...props}
    >
      <div className="flex flex-col gap-[var(--layout-gap-sm)] w-full">
        {(icon || title || onDismiss) && (
          <div className="flex items-start justify-between w-full">
            <div className="flex gap-[var(--layout-gap-sm)] items-center">
              {icon && (
                <span
                  className="callout-card-icon shrink-0"
                  aria-hidden="true"
                >
                  {icon}
                </span>
              )}
              {title && (
                <p className="callout-card-title text-content-note font-accent">
                  {title}
                </p>
              )}
            </div>
            {onDismiss && (
              <button
                type="button"
                onClick={onDismiss}
                className="callout-card-dismiss shrink-0 cursor-pointer inline-flex items-center justify-center size-[var(--layout-size-xs)]"
                aria-label="Dismiss"
              >
                <X className="size-[var(--layout-size-2xs)]" />
              </button>
            )}
          </div>
        )}
        {description && (
          <p className="callout-card-description text-content-note">
            {description}
          </p>
        )}
      </div>
      {action && <div className="w-full">{action}</div>}
    </div>
  )
}

export { CalloutCard }
