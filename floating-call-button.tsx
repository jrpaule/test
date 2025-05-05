"use client"

import { useState, useEffect } from "react"
import { Phone } from "lucide-react"
import { brandConfig } from "@/lib/brand-config"

export function FloatingCallButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 300px
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-20 right-4 z-40 md:hidden transition-all duration-300 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
    >
      <a
        href={`tel:${brandConfig.company.phone.replace(/\D/g, "")}`}
        className="flex items-center justify-center bg-red-600 text-white rounded-full w-16 h-16 shadow-lg hover:bg-red-700 transition-colors"
        aria-label="Call for emergency service"
      >
        <Phone className="h-8 w-8" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-yellow-500"></span>
        </span>
      </a>
    </div>
  )
}
