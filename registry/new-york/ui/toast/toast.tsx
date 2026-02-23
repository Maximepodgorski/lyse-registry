"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { CircleCheck, CircleAlert, Info, TriangleAlert, X } from "lucide-react"

import { cn } from "@/lib/utils"
import "./toast.css"

/* ------------------------------------------------------------------ */
/*  Variant icons                                                      */
/* ------------------------------------------------------------------ */

const variantIcons = {
  brand: Info,
  success: CircleCheck,
  danger: CircleAlert,
  warning: TriangleAlert,
} as const

/* ------------------------------------------------------------------ */
/*  CVA                                                                */
/* ------------------------------------------------------------------ */

const toastVariants = cva(
  "toast-base inline-flex w-[400px] items-center gap-[var(--layout-gap-md)] overflow-hidden rounded-[var(--layout-radius-xl)] p-[var(--layout-padding-lg)] text-content-note font-accent",
  {
    variants: {
      variant: {
        brand: "toast-brand",
        success: "toast-success",
        danger: "toast-danger",
        warning: "toast-warning",
      },
    },
    defaultVariants: {
      variant: "success",
    },
  }
)

/* ------------------------------------------------------------------ */
/*  Toast                                                              */
/* ------------------------------------------------------------------ */

function Toast({
  className,
  variant = "success",
  children,
  onClose,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof toastVariants> & {
    onClose?: () => void
  }) {
  const Icon = variant ? variantIcons[variant] : variantIcons.success
  return (
    <div
      data-slot="toast"
      className={cn(toastVariants({ variant, className }))}
      role="status"
      aria-live="polite"
      {...props}
    >
      <Icon className="toast-icon shrink-0 size-6" />
      <p className="flex-1 min-w-0">{children}</p>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="toast-close shrink-0 cursor-pointer inline-flex items-center justify-center size-6"
          aria-label="Dismiss"
        >
          <X className="size-3.5" />
        </button>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  State (pub/sub)                                                    */
/* ------------------------------------------------------------------ */

type ToastVariant = NonNullable<VariantProps<typeof toastVariants>["variant"]>

type ToastData = {
  id: string
  variant: ToastVariant
  text: string
  duration?: number
}

type ToastHandler = (t: ToastData) => void

let listeners: ToastHandler[] = []
let count = 0

function dispatch(data: Omit<ToastData, "id">) {
  const t = { ...data, id: String(++count) }
  listeners.forEach((l) => l(t))
  return t.id
}

function toast(
  text: string,
  opts?: { variant?: ToastVariant; duration?: number }
) {
  return dispatch({ variant: "brand", text, ...opts })
}

toast.success = (text: string, opts?: { duration?: number }) =>
  dispatch({ variant: "success", text, ...opts })
toast.danger = (text: string, opts?: { duration?: number }) =>
  dispatch({ variant: "danger", text, ...opts })
toast.brand = (text: string, opts?: { duration?: number }) =>
  dispatch({ variant: "brand", text, ...opts })
toast.warning = (text: string, opts?: { duration?: number }) =>
  dispatch({ variant: "warning", text, ...opts })

/* ------------------------------------------------------------------ */
/*  Toaster                                                            */
/* ------------------------------------------------------------------ */

const STACK_OVERLAP = 32
const EXPANDED_GAP = 12
const VISIBLE_COUNT = 3
const DEFAULT_DURATION = 5000

function Toaster({ className }: { className?: string }) {
  const [toasts, setToasts] = React.useState<ToastData[]>([])
  const [expanded, setExpanded] = React.useState(false)
  const timersRef = React.useRef(
    new Map<string, ReturnType<typeof setTimeout>>()
  )
  const toastsRef = React.useRef(toasts)
  toastsRef.current = toasts

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
    const timer = timersRef.current.get(id)
    if (timer) clearTimeout(timer)
    timersRef.current.delete(id)
  }, [])

  React.useEffect(() => {
    const handler: ToastHandler = (t) => {
      setToasts((prev) => [...prev, t])
      const timer = setTimeout(
        () => dismiss(t.id),
        t.duration ?? DEFAULT_DURATION
      )
      timersRef.current.set(t.id, timer)
    }
    listeners.push(handler)
    return () => {
      listeners = listeners.filter((l) => l !== handler)
      timersRef.current.forEach((timer) => clearTimeout(timer))
    }
  }, [dismiss])

  const pauseTimers = React.useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer))
    timersRef.current.clear()
  }, [])

  const resumeTimers = React.useCallback(() => {
    toastsRef.current.forEach((t) => {
      const timer = setTimeout(() => dismiss(t.id), DEFAULT_DURATION)
      timersRef.current.set(t.id, timer)
    })
  }, [dismiss])

  if (toasts.length === 0) return null

  return (
    <ol
      data-slot="toaster"
      className={cn(
        "fixed bottom-6 right-6 z-[9999] flex flex-col items-end",
        className
      )}
      style={{ width: 400 }}
      onMouseEnter={() => {
        setExpanded(true)
        pauseTimers()
      }}
      onMouseLeave={() => {
        setExpanded(false)
        resumeTimers()
      }}
    >
      {toasts.map((t, i) => {
        const distFromFront = toasts.length - 1 - i
        const isVisible = distFromFront < VISIBLE_COUNT || expanded
        const isLast = i === toasts.length - 1

        return (
          <li
            key={t.id}
            className="toast-item w-full list-none"
            style={{
              marginBottom: isLast
                ? 0
                : expanded
                  ? EXPANDED_GAP
                  : -STACK_OVERLAP,
              transform:
                !expanded && distFromFront > 0
                  ? `scale(${Math.max(1 - distFromFront * 0.05, 0.85)})`
                  : "none",
              opacity: isVisible
                ? expanded
                  ? 1
                  : Math.max(1 - distFromFront * 0.1, 0)
                : 0,
              transformOrigin: "bottom center",
              zIndex: i,
              pointerEvents: isVisible ? "auto" : "none",
            }}
          >
            <div className="toast-enter">
              <Toast variant={t.variant} onClose={() => dismiss(t.id)}>
                {t.text}
              </Toast>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export { Toast, Toaster, toast, toastVariants }
