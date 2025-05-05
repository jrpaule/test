"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ComparisonImage {
  id: number
  title: string
  description: string
  beforeImage: string
  afterImage: string
}

export function ImageComparisonSlider() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Sample data - in a real implementation, this would come from your CMS or database
  const comparisonImages: ComparisonImage[] = [
    {
      id: 1,
      title: "Basement Flood Restoration",
      description: "Complete restoration after a burst pipe caused extensive flooding",
      beforeImage: "/placeholder.svg?height=400&width=600",
      afterImage: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 2,
      title: "Kitchen Water Damage Repair",
      description: "Restoration after dishwasher leak damaged flooring and cabinets",
      beforeImage: "/placeholder.svg?height=400&width=600",
      afterImage: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 3,
      title: "Commercial Office Restoration",
      description: "Complete restoration of office space after sprinkler system malfunction",
      beforeImage: "/placeholder.svg?height=400&width=600",
      afterImage: "/placeholder.svg?height=400&width=600",
    },
  ]

  const currentImage = comparisonImages[currentIndex]

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const position = (x / rect.width) * 100
      setSliderPosition(Math.min(Math.max(position, 0), 100))
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.touches[0].clientX - rect.left
      const position = (x / rect.width) * 100
      setSliderPosition(Math.min(Math.max(position, 0), 100))
    }
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % comparisonImages.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + comparisonImages.length) % comparisonImages.length)
  }

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp)
    return () => {
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-[#003366]" style={{ fontFamily: "Montserrat, sans-serif" }}>
          Before & After Restoration
        </CardTitle>
        <CardDescription style={{ fontFamily: "Open Sans, sans-serif" }}>
          Slide to compare before and after results
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          <div
            ref={containerRef}
            className="relative w-full h-[300px] md:h-[400px] overflow-hidden cursor-ew-resize"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* After Image (Full) */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={currentImage.afterImage || "/placeholder.svg"}
                alt="After restoration"
                fill
                className="object-cover"
              />
            </div>

            {/* Before Image (Partial, controlled by slider) */}
            <div className="absolute inset-0 h-full overflow-hidden" style={{ width: `${sliderPosition}%` }}>
              <Image
                src={currentImage.beforeImage || "/placeholder.svg"}
                alt="Before restoration"
                fill
                className="object-cover"
              />
            </div>

            {/* Slider Control */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
              style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                <div className="flex items-center">
                  <ChevronLeft className="h-4 w-4 text-[#003366]" />
                  <ChevronRight className="h-4 w-4 text-[#003366]" />
                </div>
              </div>
            </div>

            {/* Before/After Labels */}
            <div className="absolute top-4 left-4 bg-black/50 text-white text-sm py-1 px-2 rounded">Before</div>
            <div className="absolute top-4 right-4 bg-black/50 text-white text-sm py-1 px-2 rounded">After</div>
          </div>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-4 pointer-events-none">
            <button
              onClick={prevImage}
              className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-md pointer-events-auto"
            >
              <ChevronLeft className="h-6 w-6 text-[#003366]" />
            </button>
            <button
              onClick={nextImage}
              className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-md pointer-events-auto"
            >
              <ChevronRight className="h-6 w-6 text-[#003366]" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-medium text-lg text-[#003366]" style={{ fontFamily: "Montserrat, sans-serif" }}>
            {currentImage.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1" style={{ fontFamily: "Open Sans, sans-serif" }}>
            {currentImage.description}
          </p>
          <div className="flex justify-center mt-4">
            {comparisonImages.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full mx-1 ${index === currentIndex ? "bg-[#003366]" : "bg-gray-300"}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
