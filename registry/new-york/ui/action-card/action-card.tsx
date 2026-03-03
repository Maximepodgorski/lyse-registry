import * as React from "react"

import { cn } from "@/lib/utils"
import "./action-card.css"

function ActionCard({
  className,
  title,
  description,
  icon,
  logo,
  action,
  label,
  ...props
}: React.ComponentProps<"div"> & {
  title?: string
  description?: string
  icon?: React.ReactNode
  logo?: React.ReactNode
  action?: React.ReactNode
  label?: string
}) {
  return (
    <div
      data-slot="action-card"
      className={cn("action-card-base", className)}
      {...props}
    >
      <div className="flex flex-1 items-center gap-[var(--layout-gap-lg)] min-w-0">
        {logo && (
          <div className="action-card-logo shrink-0">{logo}</div>
        )}
        {!logo && icon && (
          <div className="action-card-icon shrink-0">{icon}</div>
        )}
        {(title || description) && (
          <div className="flex flex-1 flex-col gap-[var(--layout-gap-xs)] min-w-0 text-content-note">
            {title && (
              <p className="font-accent [color:var(--text-base-bolder)]">
                {title}
              </p>
            )}
            {description && (
              <p className="[color:var(--text-base-moderate)]">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
      {!action && label && (
        <p className="action-card-label shrink-0 text-content-note">
          {label}
        </p>
      )}
    </div>
  )
}

export { ActionCard }
