"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Phone, AlertTriangle, MapPin, Clock } from "lucide-react"
import { RestorationEmergencySystem } from "./restoration-emergency-system"
import { brandConfig } from "@/lib/brand-config"

export function RestorationEmergencyBanner() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-red-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <AlertTriangle className="h-6 w-6 text-yellow-300" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
            </span>
          </div>
          <div>
            <p className="font-bold text-lg font-heading">24/7 EMERGENCY RESTORATION</p>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <p className="text-sm">45-Minute Response Guarantee • Water • Fire • Mold • Storm</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            size="lg"
            className="emergency-call-button bg-white text-red-600 hover:bg-yellow-100 hover:scale-105 hover:shadow-md border-2 border-yellow-300 font-bold text-lg transition-all duration-200"
          >
            <Phone className="mr-2 h-5 w-5 animate-pulse text-red-600" />
            {brandConfig.company.phone}
          </Button>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-primary-700 text-white hover:bg-primary-800">
                <MapPin className="mr-1 h-4 w-4" />
                Find Local Service
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl p-4">
              <RestorationEmergencySystem />
            </DialogContent>
          </Dialog>
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
