import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import "./slider.css"

const sliderVariants = cva(
  "slider-root relative flex w-full touch-none items-center select-none h-[var(--layout-size-md)]"
)

function Slider({
  className,
  defaultValue = [0],
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn(sliderVariants(), className)}
      defaultValue={defaultValue}
      {...props}
    >
      <SliderPrimitive.Track className="slider-track relative grow overflow-visible rounded-[var(--layout-radius-full)] h-1.5">
        <SliderPrimitive.Range className="slider-range absolute h-full rounded-[var(--layout-radius-full)]" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="slider-thumb block h-[var(--layout-size-xs)] w-[var(--layout-size-xs)] rounded-[var(--layout-radius-xs)] rotate-45 focus-visible:outline-none" />
    </SliderPrimitive.Root>
  )
}

function SliderField({
  className,
  label,
  suffix,
  value,
  onValueChange,
  onValueCommit,
  min = 0,
  max = 100,
  step = 1,
  disabled,
  ...props
}: Omit<React.ComponentProps<"div">, "value" | "onChange"> & {
  label: string
  suffix?: string
  value: number[]
  onValueChange: (value: number[]) => void
  onValueCommit?: (value: number[]) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}) {
  const id = React.useId()
  const [inputValue, setInputValue] = React.useState(String(value[0]))

  React.useEffect(() => {
    setInputValue(String(value[0]))
  }, [value])

  const commitInput = () => {
    const parsed = Number(inputValue)
    if (Number.isNaN(parsed)) {
      setInputValue(String(value[0]))
      return
    }
    const clamped = Math.min(max, Math.max(min, parsed))
    const newValue = [clamped]
    onValueChange(newValue)
    onValueCommit?.(newValue)
    setInputValue(String(clamped))
  }

  return (
    <div
      data-slot="slider-field"
      data-disabled={disabled || undefined}
      className={cn("flex flex-col gap-[var(--layout-gap-md)]", className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className={cn(
            "text-content-body font-accent slider-field-label",
            disabled ? "cursor-default" : "cursor-pointer"
          )}
        >
          {label}
        </label>
        <div className="slider-field-input-wrapper flex items-center overflow-hidden">
          <input
            id={id}
            type="number"
            inputMode="numeric"
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={commitInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitInput()
            }}
            className="slider-field-input w-12 text-center font-mono bg-transparent border-none outline-none px-[var(--layout-padding-sm)] py-[var(--layout-padding-xs)] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          {suffix && (
            <span className="slider-field-suffix font-mono py-[var(--layout-padding-xs)]">
              {suffix}
            </span>
          )}
        </div>
      </div>
      <Slider
        value={value}
        onValueChange={onValueChange}
        onValueCommit={onValueCommit}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        aria-label={label}
      />
    </div>
  )
}

export { Slider, SliderField, sliderVariants }
