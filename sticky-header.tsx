"use client"

import { useState, useEffect } from "react"
import { Phone, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { brandConfig } from "@/lib/brand-config"
import { MobileMenu } from "@/components/mobile-menu"

export function StickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className={`font-bold text-xl font-heading ${isScrolled ? "text-primary" : "text-white"}`}>
          Rapid Restore Ontario
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className={`${isScrolled ? "text-gray-700" : "text-white"} hover:text-secondary`}>
            Home
          </a>
          <a href="#" className={`${isScrolled ? "text-gray-700" : "text-white"} hover:text-secondary`}>
            Services
          </a>
          <a href="#" className={`${isScrolled ? "text-gray-700" : "text-white"} hover:text-secondary`}>
            Locations
          </a>
          <a href="#" className={`${isScrolled ? "text-gray-700" : "text-white"} hover:text-secondary`}>
            About
          </a>
          <a href="#" className={`${isScrolled ? "text-gray-700" : "text-white"} hover:text-secondary`}>
            Contact
          </a>
        </div>

        <div className="flex items-center gap-4">
          <div className={`hidden md:flex items-center ${isScrolled ? "text-primary" : "text-white"}`}>
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">45-Min Response</span>
          </div>

          <Button
            size="sm"
            className="bg-secondary hover:bg-secondary-500 text-white hover:scale-105 hover:shadow-md border border-secondary-400 font-medium transition-all duration-200 emergency-call-button"
          >
            <Phone className="mr-1 h-4 w-4" />
            {brandConfig.company.phone}
          </Button>

          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes emergency-pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 rgba(255, 255, 255, 0.7);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.9);
          }
        }

        .emergency-call-button {
          animation: emergency-pulse 2s infinite;
        }

        .emergency-call-button:hover {
          animation: none;
        }
      `}</style>
    </div>
  )
}
