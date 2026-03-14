import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import "./breadcrumb.css"

/* ------------------------------------------------------------------ */
/*  CVA                                                                */
/* ------------------------------------------------------------------ */

const breadcrumbLinkVariants = cva(
  "breadcrumb-link text-content-caption transition-colors duration-150 outline-none"
)

const breadcrumbPageVariants = cva(
  "breadcrumb-page text-content-caption font-accent outline-none"
)

const breadcrumbSeparatorVariants = cva(
  "breadcrumb-separator text-content-caption"
)

const breadcrumbEllipsisVariants = cva(
  "breadcrumb-ellipsis inline-flex items-center justify-center rounded-[var(--layout-radius-sm)] p-[var(--layout-padding-xs)] outline-none"
)

/* ------------------------------------------------------------------ */
/*  Breadcrumb                                                         */
/* ------------------------------------------------------------------ */

function Breadcrumb({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="breadcrumb"
      aria-label="breadcrumb"
      className={cn(className)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  BreadcrumbList                                                     */
/* ------------------------------------------------------------------ */

function BreadcrumbList({
  className,
  ...props
}: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      role="list"
      className={cn(
        "flex items-center gap-[var(--layout-gap-sm)]",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  BreadcrumbItem                                                     */
/* ------------------------------------------------------------------ */

function BreadcrumbItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-[var(--layout-gap-sm)]", className)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  BreadcrumbLink                                                     */
/* ------------------------------------------------------------------ */

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "a"
  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn(breadcrumbLinkVariants(), className)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  BreadcrumbPage                                                     */
/* ------------------------------------------------------------------ */

function BreadcrumbPage({
  className,
  ...props
}: React.ComponentProps<"a">) {
  return (
    <a
      data-slot="breadcrumb-page"
      aria-current="page"
      className={cn(breadcrumbPageVariants(), className)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  BreadcrumbSeparator                                                */
/* ------------------------------------------------------------------ */

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-separator"
      aria-hidden="true"
      role="presentation"
      className={cn(breadcrumbSeparatorVariants(), className)}
      {...props}
    >
      {children ?? "/"}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  BreadcrumbEllipsis                                                 */
/* ------------------------------------------------------------------ */

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      data-slot="breadcrumb-ellipsis"
      type="button"
      aria-label="Show more breadcrumbs"
      className={cn(breadcrumbEllipsisVariants(), className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
    </button>
  )
}

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  breadcrumbLinkVariants,
  breadcrumbPageVariants,
  breadcrumbSeparatorVariants,
  breadcrumbEllipsisVariants,
}
