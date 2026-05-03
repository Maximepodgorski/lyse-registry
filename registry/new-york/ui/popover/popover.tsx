import * as React from "react"
import { Popover as PopoverPrimitive } from "@base-ui-components/react/popover"

import { cn } from "@/lib/utils"
import "./popover.css"

/* ------------------------------------------------------------------ */
/*  Anchor context                                                     */
/* ------------------------------------------------------------------ */

const PopoverAnchorContext = React.createContext<React.RefObject<HTMLElement | null> | null>(null)

/* ------------------------------------------------------------------ */
/*  Popover                                                            */
/* ------------------------------------------------------------------ */

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  const anchorRef = React.useRef<HTMLElement | null>(null)
  return (
    <PopoverAnchorContext.Provider value={anchorRef}>
      <PopoverPrimitive.Root {...props} />
    </PopoverAnchorContext.Provider>
  )
}

/* ------------------------------------------------------------------ */
/*  PopoverTrigger                                                     */
/* ------------------------------------------------------------------ */

function PopoverTrigger({
  asChild,
  children,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger> & {
  asChild?: boolean
}) {
  if (asChild && React.isValidElement(children)) {
    return (
      <PopoverPrimitive.Trigger
        data-slot="popover-trigger"
        render={children as React.ReactElement<Record<string, unknown>>}
        {...props}
      />
    )
  }
  return (
    <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props}>
      {children}
    </PopoverPrimitive.Trigger>
  )
}

/* ------------------------------------------------------------------ */
/*  PopoverAnchor                                                      */
/*  Captures the rendered child ref and exposes it to PopoverContent   */
/*  via context, so Positioner can anchor to it.                       */
/* ------------------------------------------------------------------ */

function PopoverAnchor({
  children,
}: {
  children: React.ReactElement<{ ref?: React.Ref<HTMLElement> }>
}) {
  const anchorRef = React.useContext(PopoverAnchorContext)
  const child = React.Children.only(children)
  return React.cloneElement(child, {
    ref: (node: HTMLElement | null) => {
      if (anchorRef) anchorRef.current = node
      const original = (child as { ref?: React.Ref<HTMLElement> }).ref
      if (typeof original === "function") original(node)
      else if (original && "current" in original) {
        (original as React.MutableRefObject<HTMLElement | null>).current = node
      }
    },
  })
}

/* ------------------------------------------------------------------ */
/*  PopoverContent                                                     */
/* ------------------------------------------------------------------ */

function PopoverContent({
  className,
  sideOffset = 6,
  align = "center",
  side,
  children,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Popup> & {
  sideOffset?: number
  side?: React.ComponentProps<typeof PopoverPrimitive.Positioner>["side"]
  align?: React.ComponentProps<typeof PopoverPrimitive.Positioner>["align"]
}) {
  const anchorRef = React.useContext(PopoverAnchorContext)
  const anchorFn = React.useCallback(
    () => anchorRef?.current ?? null,
    [anchorRef]
  )
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        sideOffset={sideOffset}
        align={align}
        side={side}
        anchor={anchorRef ? anchorFn : undefined}
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            "popover-content z-50 min-w-[8rem] overflow-hidden rounded-[var(--layout-radius-xl)] p-[var(--layout-padding-lg)] transition-[opacity,transform] duration-150 data-[starting-style]:opacity-0 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[ending-style]:scale-95 data-[side=bottom]:data-[starting-style]:-translate-y-2 data-[side=top]:data-[starting-style]:translate-y-2 data-[side=left]:data-[starting-style]:translate-x-2 data-[side=right]:data-[starting-style]:-translate-x-2",
            className
          )}
          {...props}
        >
          {children}
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  )
}

/* ------------------------------------------------------------------ */
/*  PopoverClose                                                       */
/* ------------------------------------------------------------------ */

function PopoverClose({
  asChild,
  children,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Close> & {
  asChild?: boolean
}) {
  if (asChild && React.isValidElement(children)) {
    return (
      <PopoverPrimitive.Close
        data-slot="popover-close"
        aria-label="Close"
        render={children as React.ReactElement<Record<string, unknown>>}
        {...props}
      />
    )
  }
  return (
    <PopoverPrimitive.Close data-slot="popover-close" aria-label="Close" {...props}>
      {children}
    </PopoverPrimitive.Close>
  )
}

export {
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverContent,
  PopoverClose,
}
