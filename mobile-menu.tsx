"use client"

import { useState } from "react"
import { Menu, Phone, MapPin, Info, Home, FileText, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle className="text-left">Rapid Response Restoration</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <div className="space-y-1">
            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setOpen(false)}>
                <Home className="mr-2 h-5 w-5" />
                Home
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setOpen(false)}>
                <Info className="mr-2 h-5 w-5" />
                About Us
              </Button>
            </SheetClose>
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="mr-2 h-5 w-5" />
              Services
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <MapPin className="mr-2 h-5 w-5" />
              Locations
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <MessageSquare className="mr-2 h-5 w-5" />
              Contact
            </Button>
          </div>

          <div className="border-t mt-4 pt-4">
            <p className="text-sm font-medium mb-2">Emergency Contact</p>
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
              <Phone className="mr-2 h-4 w-4" />
              1-800-XXX-XXXX
            </Button>
          </div>

          <div className="border-t mt-4 pt-4">
            <p className="text-sm font-medium mb-2">Our Locations</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 text-red-500 shrink-0" />
                <span>Toronto, ON</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 text-red-500 shrink-0" />
                <span>Vancouver, BC</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 text-red-500 shrink-0" />
                <span>Calgary, AB</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 text-red-500 shrink-0" />
                <span>Montreal, QC</span>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
