"use client"

import * as React from "react"
import { useState } from "react"
import { Check, ChevronDown, ChevronUp, Copy, FileCode } from "lucide-react"
import { Button } from "@/registry/new-york/ui/button/button"

export function CodeBlock({
  preview,
  code,
  codeString,
  language = "tsx",
  fileName,
}: {
  preview?: React.ReactNode
  code: React.ReactNode
  codeString?: string
  language?: string
  fileName?: string
}) {
  const [copied, setCopied] = useState(false)
  const [collapsed, setCollapsed] = useState(true)
  const [lineCount, setLineCount] = useState(0)
  const codeRef = React.useRef<HTMLElement>(null)
  const copyTimeoutRef = React.useRef<ReturnType<typeof setTimeout>>(null)

  const handleCopy = () => {
    const text = codeString ?? codeRef.current?.textContent ?? ""
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current)
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000)
    }).catch(() => {})
  }

  React.useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current)
    }
  }, [])

  /* Count lines from rendered code for line numbers */
  React.useLayoutEffect(() => {
    if (!collapsed && codeRef.current) {
      const text = codeRef.current.textContent ?? ""
      setLineCount(text.split("\n").length)
    }
  }, [code, collapsed])

  return (
    <div
      className="flex flex-col overflow-hidden rounded-[var(--layout-radius-xl)]"
      style={{
        border: "var(--layout-border-thin) solid var(--border-default)",
      }}
    >
      {/* Preview area */}
      {preview && (
        <div
          className="flex items-center justify-center py-[var(--root-space-11)]"
          style={{ background: "var(--background-neutral-faint-default)" }}
        >
          {preview}
        </div>
      )}

      {/* Header bar */}
      <div
        className="flex items-center justify-between px-[var(--layout-padding-lg)] py-[var(--layout-padding-sm)]"
        style={{
          background: "var(--background-neutral-faint-default)",
          borderTop: preview
            ? "var(--layout-border-thin) solid var(--border-default)"
            : "none",
        }}
      >
        <div className="flex items-center gap-[var(--layout-gap-sm)]">
          <FileCode
            size={14}
            style={{ color: "var(--text-base-moderate)" }}
          />
          <span
            className="text-content-caption font-mono"
            style={{ color: "var(--text-base-moderate)" }}
          >
            {fileName ?? language}
          </span>
        </div>
        <div className="flex items-center gap-[var(--layout-gap-xs)]">
          <Button
            variant="terciary"
            size="xs"
            isIconOnly
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? "Expand code" : "Collapse code"}
          >
            {collapsed ? <ChevronDown /> : <ChevronUp />}
          </Button>
          <Button
            variant="terciary"
            size="xs"
            isIconOnly
            onClick={handleCopy}
            aria-label="Copy code"
          >
            {copied ? <Check /> : <Copy />}
          </Button>
        </div>
      </div>

      {/* Code area */}
      {!collapsed && (
        <div
          className="overflow-x-auto"
          style={{
            background: "var(--background-neutral-faint-default)",
          }}
        >
          <div className="flex">
            {/* Line numbers */}
            {lineCount > 0 && (
              <div
                className="text-content-caption font-mono select-none text-right shrink-0 py-[var(--layout-padding-md)] pl-[var(--layout-padding-md)] pr-[var(--layout-padding-sm)]"
                style={{
                  color: "var(--text-base-faint)",
                  lineHeight: "1.75",
                }}
                aria-hidden="true"
              >
                {Array.from({ length: lineCount }, (_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
            )}
            {/* Code content */}
            <pre
              className="text-content-caption font-mono py-[var(--layout-padding-md)] pr-[var(--layout-padding-lg)] pl-[var(--layout-padding-sm)] overflow-x-auto flex-1"
              style={{
                color: "var(--text-base-moderate)",
                lineHeight: "1.75",
              }}
            >
              <code ref={codeRef}>{code}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}
