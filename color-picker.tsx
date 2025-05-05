"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface ColorPickerProps {
  value: string
  onChange: (value: string) => void
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  const [color, setColor] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setColor(value)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value
    setColor(newColor)
    onChange(newColor)
  }

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="w-10 h-10 rounded-md border shadow-sm"
            style={{ backgroundColor: color }}
            aria-label="Pick a color"
          />
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="space-y-2">
            <div>
              <input
                ref={inputRef}
                type="color"
                value={color}
                onChange={handleChange}
                className="w-full h-32 cursor-pointer"
              />
            </div>
            <div className="flex gap-2">
              <Input
                value={color}
                onChange={(e) => {
                  setColor(e.target.value)
                  onChange(e.target.value)
                }}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <Input
        value={color}
        onChange={(e) => {
          setColor(e.target.value)
          onChange(e.target.value)
        }}
      />
    </div>
  )
}
