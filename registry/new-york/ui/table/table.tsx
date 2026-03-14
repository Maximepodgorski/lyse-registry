import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import "./table.css"

/* ------------------------------------------------------------------ */
/*  CVA                                                                */
/* ------------------------------------------------------------------ */

const tableVariants = cva("table-base w-full caption-bottom")

const tableHeaderVariants = cva("table-header")

const tableBodyVariants = cva("table-body")

const tableFooterVariants = cva("table-footer")

const tableRowVariants = cva("table-row")

const tableHeadVariants = cva(
  "table-head text-content-caption font-accent text-left"
)

const tableCellVariants = cva("table-cell text-content-note text-left")

const tableCaptionVariants = cva(
  "table-caption text-content-caption"
)

/* ------------------------------------------------------------------ */
/*  Table                                                              */
/* ------------------------------------------------------------------ */

function Table({
  className,
  wrapperClassName,
  variant = "default",
  compact = false,
  children,
  ...props
}: React.ComponentProps<"table"> & {
  wrapperClassName?: string
  variant?: "default" | "striped"
  compact?: boolean
}) {
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const [overflows, setOverflows] = React.useState(false)

  React.useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    function check() {
      if (el) setOverflows(el.scrollWidth > el.clientWidth)
    }

    check()

    const ro = new ResizeObserver(check)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      ref={wrapperRef}
      data-slot="table-wrapper"
      role={overflows ? "region" : undefined}
      aria-label={overflows ? "Scrollable table" : undefined}
      tabIndex={overflows ? 0 : undefined}
      className={cn("table-wrapper w-full", wrapperClassName)}
    >
      <table
        data-slot="table"
        data-variant={variant}
        data-compact={compact || undefined}
        className={cn(tableVariants(), className)}
        {...props}
      >
        {children}
      </table>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  TableHeader                                                        */
/* ------------------------------------------------------------------ */

function TableHeader({
  className,
  ...props
}: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn(tableHeaderVariants(), className)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  TableBody                                                          */
/* ------------------------------------------------------------------ */

function TableBody({
  className,
  ...props
}: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(tableBodyVariants(), className)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  TableFooter                                                        */
/* ------------------------------------------------------------------ */

function TableFooter({
  className,
  ...props
}: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(tableFooterVariants(), className)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  TableRow                                                           */
/* ------------------------------------------------------------------ */

function TableRow({
  className,
  ...props
}: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(tableRowVariants(), className)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  TableHead                                                          */
/* ------------------------------------------------------------------ */

function TableHead({
  className,
  scope = "col",
  align = "left",
  ...props
}: React.ComponentProps<"th"> & {
  align?: "left" | "center" | "right"
}) {
  return (
    <th
      data-slot="table-head"
      scope={scope}
      className={cn(
        tableHeadVariants(),
        align === "center" && "text-center",
        align === "right" && "text-right",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  TableCell                                                          */
/* ------------------------------------------------------------------ */

function TableCell({
  className,
  align = "left",
  ...props
}: React.ComponentProps<"td"> & {
  align?: "left" | "center" | "right"
}) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        tableCellVariants(),
        align === "center" && "text-center",
        align === "right" && "text-right",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  TableCaption                                                       */
/* ------------------------------------------------------------------ */

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn(tableCaptionVariants(), className)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  tableVariants,
  tableHeaderVariants,
  tableBodyVariants,
  tableFooterVariants,
  tableRowVariants,
  tableHeadVariants,
  tableCellVariants,
  tableCaptionVariants,
}
