"use client"

import { useState, useEffect } from "react"

export type TocSection = {
  id: string
  label: string
}

export function TableOfContents({ sections }: { sections: TocSection[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach((section) => {
      const el = document.getElementById(section.id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(section.id)
        },
        { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [sections])

  return (
    <aside className="hidden xl:block w-56 shrink-0 py-16 pr-6">
      <nav className="sticky top-20 flex flex-col gap-4">
        <span
          className="text-content-caption font-bold uppercase tracking-wider"
          style={{ color: "var(--text-base-moderate)" }}
        >
          On this page
        </span>
        <ul className="flex flex-col">
          {sections.map((s) => {
            const isActive = s.id === activeId
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-content-note block py-1.5 transition-colors"
                  style={{
                    color: isActive
                      ? "var(--text-base-strong)"
                      : "var(--text-base-moderate)",
                    borderLeft: isActive
                      ? "2px solid var(--text-base-strong)"
                      : "2px solid transparent",
                    paddingLeft: "12px",
                  }}
                >
                  {s.label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
