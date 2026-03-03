import * as React from "react"

import { cn } from "@/lib/utils"
import "./spotlight-card.css"

function SpotlightCard({
  className,
  title,
  description,
  image,
  ...props
}: React.ComponentProps<"div"> & {
  title?: string
  description?: string
  image?: React.ReactNode
}) {
  return (
    <div
      data-slot="spotlight-card"
      className={cn("spotlight-card-base", className)}
      {...props}
    >
      <div className="spotlight-card-image">
        {image ?? <div className="spotlight-card-image-fallback" />}
      </div>
      <div className="flex flex-col gap-[var(--layout-gap-xs)] p-[var(--layout-padding-lg)]">
        {title && (
          <p className="text-content-note font-accent [color:var(--text-base-strong)]">
            {title}
          </p>
        )}
        {description && (
          <p className="text-content-caption [color:var(--text-base-moderate)]">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

export { SpotlightCard }
