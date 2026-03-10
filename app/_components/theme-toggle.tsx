"use client"

import * as React from "react"
import { Monitor, Moon, Sun } from "lucide-react"

type Theme = "light" | "dark" | "system"

const options = [
  { value: "light" as Theme, icon: Sun, label: "Light mode" },
  { value: "dark" as Theme, icon: Moon, label: "Dark mode" },
  { value: "system" as Theme, icon: Monitor, label: "System preference" },
]

function applyTheme(theme: Theme) {
  const isDark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
  document.documentElement.classList.toggle("dark", isDark)
}

function ThemeToggle() {
  const [theme, setTheme] = React.useState<Theme>("dark")
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("theme") as Theme | null
    if (stored && ["light", "dark", "system"].includes(stored)) {
      setTheme(stored)
    }
  }, [])

  React.useEffect(() => {
    if (!mounted) return
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = () => { if (theme === "system") applyTheme("system") }
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [mounted, theme])

  function select(next: Theme) {
    setTheme(next)
    applyTheme(next)
    localStorage.setItem("theme", next)
  }

  const activeIndex = options.findIndex((o) => o.value === theme)
  const [prevIndex, setPrevIndex] = React.useState(activeIndex)
  const [morphing, setMorphing] = React.useState(false)

  React.useEffect(() => {
    if (activeIndex !== prevIndex) {
      setMorphing(true)
      const timer = setTimeout(() => {
        setMorphing(false)
        setPrevIndex(activeIndex)
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [activeIndex, prevIndex])

  const segmentWidth = `calc((100% - 6px - 2px) / 3)`

  // During morph: stretch from prev to active position
  const morphLeft = Math.min(prevIndex, activeIndex)
  const morphSpan = Math.abs(activeIndex - prevIndex) + 1

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="relative flex items-center rounded-full p-[3px] gap-0.5 bg-[var(--background-neutral-lighter-default)] dark:bg-[var(--root-color-neutral-900)]"
      style={{
        border: "var(--layout-border-thin) solid var(--border-default)",
      }}
    >
      {/* Sliding indicator with morph stretch */}
      <div
        className="absolute top-[3px] bottom-[3px] rounded-full bg-[var(--background-base)] dark:bg-[var(--root-color-neutral-800)]"
        style={{
          left: `calc(3px + ${morphing ? morphLeft : activeIndex} * (${segmentWidth} + 1px))`,
          width: morphing
            ? `calc(${morphSpan} * ${segmentWidth} + ${morphSpan - 1} * 1px)`
            : segmentWidth,
          boxShadow: "0 1px 3px 0 rgba(0,0,0,.08)",
          transition: morphing
            ? "left 150ms cubic-bezier(0.4, 0, 0.2, 1), width 150ms cubic-bezier(0.4, 0, 0.2, 1)"
            : "left 125ms cubic-bezier(0.34, 1.56, 0.64, 1), width 125ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      />

      {options.map((opt) => {
        const Icon = opt.icon
        const isActive = theme === opt.value
        return (
          <button
            key={opt.value}
            role="radio"
            aria-checked={isActive}
            aria-label={opt.label}
            onClick={() => select(opt.value)}
            className="relative z-[1] flex items-center justify-center size-7 rounded-full cursor-pointer transition-colors duration-200"
            style={{
              color: isActive
                ? "var(--text-base-strong)"
                : "var(--text-base-moderate)",
            }}
          >
            <Icon className={mounted ? "size-3.5" : "size-3.5 opacity-0"} />
          </button>
        )
      })}
    </div>
  )
}

export { ThemeToggle }
