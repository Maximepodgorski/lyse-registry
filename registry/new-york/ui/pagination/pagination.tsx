import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import "./pagination.css"

/* ------------------------------------------------------------------ */
/*  CVA                                                                */
/* ------------------------------------------------------------------ */

const paginationLinkVariants = cva(
  "pagination-link inline-flex items-center justify-center rounded-[var(--layout-radius-md)] outline-none transition-colors duration-150",
  {
    variants: {
      size: {
        sm: "pagination-link-sm text-content-caption",
        md: "pagination-link-md text-content-note",
      },
    },
    defaultVariants: { size: "md" },
  }
)

const paginationPrevNextVariants = cva(
  "pagination-prev-next inline-flex items-center gap-[var(--layout-gap-sm)] rounded-[var(--layout-radius-md)] outline-none transition-colors duration-150",
  {
    variants: {
      size: {
        sm: "pagination-prev-next-sm text-content-caption",
        md: "pagination-prev-next-md text-content-note",
      },
    },
    defaultVariants: { size: "md" },
  }
)

/* ------------------------------------------------------------------ */
/*  Pagination                                                         */
/* ------------------------------------------------------------------ */

function Pagination({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="pagination"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  PaginationContent                                                  */
/* ------------------------------------------------------------------ */

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      role="list"
      className={cn(
        "flex flex-row items-center gap-[var(--layout-gap-sm)]",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  PaginationItem                                                     */
/* ------------------------------------------------------------------ */

function PaginationItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="pagination-item"
      className={cn(className)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  PaginationLink                                                     */
/* ------------------------------------------------------------------ */

type PaginationLinkProps = React.ComponentProps<"a"> &
  VariantProps<typeof paginationLinkVariants> & {
    isActive?: boolean
    asChild?: boolean
  }

function PaginationLink({
  asChild,
  isActive = false,
  size,
  className,
  children,
  "aria-label": ariaLabelProp,
  ...props
}: PaginationLinkProps) {
  const Comp = asChild ? Slot : "a"

  // Auto-inject aria-label when children is numeric and no aria-label provided
  const autoLabel =
    !ariaLabelProp &&
    (typeof children === "string" || typeof children === "number")
      ? isActive
        ? `Page ${children}`
        : `Go to page ${children}`
      : ariaLabelProp

  return (
    <Comp
      data-slot="pagination-link"
      data-active={isActive ? "true" : undefined}
      aria-current={isActive ? "page" : undefined}
      aria-label={autoLabel}
      className={cn(paginationLinkVariants({ size }), className)}
      {...props}
    >
      {children}
    </Comp>
  )
}

/* ------------------------------------------------------------------ */
/*  PaginationPrevious                                                 */
/* ------------------------------------------------------------------ */

type PaginationPrevNextProps = React.ComponentProps<"a"> &
  VariantProps<typeof paginationPrevNextVariants> & {
    asChild?: boolean
  }

function PaginationPrevious({
  asChild,
  size,
  className,
  children,
  "aria-label": ariaLabel = "Go to previous page",
  ...props
}: PaginationPrevNextProps) {
  if (asChild) {
    return (
      <Slot
        data-slot="pagination-previous"
        aria-label={ariaLabel}
        className={cn(paginationPrevNextVariants({ size }), className)}
        {...props}
      >
        {children}
      </Slot>
    )
  }

  const label = children === undefined ? "Previous" : children

  return (
    <a
      data-slot="pagination-previous"
      aria-label={ariaLabel}
      className={cn(paginationPrevNextVariants({ size }), className)}
      {...props}
    >
      <ChevronLeft className="size-4" aria-hidden="true" />
      {label !== null && (
        <span className="hidden sm:inline-block">{label}</span>
      )}
    </a>
  )
}

/* ------------------------------------------------------------------ */
/*  PaginationNext                                                     */
/* ------------------------------------------------------------------ */

function PaginationNext({
  asChild,
  size,
  className,
  children,
  "aria-label": ariaLabel = "Go to next page",
  ...props
}: PaginationPrevNextProps) {
  if (asChild) {
    return (
      <Slot
        data-slot="pagination-next"
        aria-label={ariaLabel}
        className={cn(paginationPrevNextVariants({ size }), className)}
        {...props}
      >
        {children}
      </Slot>
    )
  }

  const label = children === undefined ? "Next" : children

  return (
    <a
      data-slot="pagination-next"
      aria-label={ariaLabel}
      className={cn(paginationPrevNextVariants({ size }), className)}
      {...props}
    >
      {label !== null && (
        <span className="hidden sm:inline-block">{label}</span>
      )}
      <ChevronRight className="size-4" aria-hidden="true" />
    </a>
  )
}

/* ------------------------------------------------------------------ */
/*  PaginationStatus                                                   */
/* ------------------------------------------------------------------ */

type PaginationStatusProps = Omit<React.ComponentProps<"li">, "children"> & {
  current: number
  total: number
  format?: (current: number, total: number) => React.ReactNode
}

function PaginationStatus({
  current,
  total,
  format = (c, t) => `Page ${c} of ${t}`,
  className,
  ...props
}: PaginationStatusProps) {
  return (
    <li
      data-slot="pagination-status"
      aria-live="polite"
      className={cn(
        "pagination-status inline-flex items-center px-[var(--layout-padding-sm)] text-content-note sm:hidden",
        className
      )}
      {...props}
    >
      {format(current, total)}
    </li>
  )
}

/* ------------------------------------------------------------------ */
/*  PaginationEllipsis                                                 */
/* ------------------------------------------------------------------ */

function PaginationEllipsis({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="pagination-ellipsis"
      className={cn(
        "pagination-ellipsis hidden sm:inline-flex h-[var(--layout-size-lg)] w-[var(--layout-size-lg)] items-center justify-center",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <MoreHorizontal className="size-4" aria-hidden="true" />
          <span className="sr-only">More pages</span>
        </>
      )}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationStatus,
  PaginationEllipsis,
  paginationLinkVariants,
  paginationPrevNextVariants,
}
