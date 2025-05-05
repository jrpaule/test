"use client"

import type React from "react"

import { useState } from "react"
import { Search, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Sample locations data - would be dynamically loaded in production
const LOCATIONS = [
  {
    id: "toronto",
    city: "Toronto",
    state: "ON",
    serviceArea: ["Etobicoke", "North York", "Scarborough", "Downtown"],
    phoneNumber: "416-555-1234",
    address: "123 Restoration Ave, Toronto, ON M5V 2K7",
  },
  {
    id: "vancouver",
    city: "Vancouver",
    state: "BC",
    serviceArea: ["Downtown", "Kitsilano", "West End", "Gastown"],
    phoneNumber: "604-555-5678",
    address: "456 Emergency St, Vancouver, BC V6B 2J2",
  },
  {
    id: "calgary",
    city: "Calgary",
    state: "AB",
    serviceArea: ["Downtown", "Beltline", "Kensington", "Mission"],
    phoneNumber: "403-555-9012",
    address: "789 Response Blvd, Calgary, AB T2P 1J9",
  },
  {
    id: "montreal",
    city: "Montreal",
    state: "QC",
    serviceArea: ["Downtown", "Old Montreal", "Plateau", "Mile End"],
    phoneNumber: "514-555-3456",
    address: "321 Restoration Rue, Montreal, QC H2Y 1H1",
  },
]

export function LocationFinder() {
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState<typeof LOCATIONS>([])
  const [searching, setSearching] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearching(true)

    // Simulate API call with delay
    setTimeout(() => {
      const filteredResults = LOCATIONS.filter(
        (location) =>
          location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          location.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
          location.serviceArea.some((area) => area.toLowerCase().includes(searchTerm.toLowerCase())),
      )

      setResults(filteredResults)
      setSearching(false)
    }, 500)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Enter your city or neighborhood..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={searching || !searchTerm}>
          {searching ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Searching
            </span>
          ) : (
            <span className="flex items-center">
              <Search className="h-4 w-4 mr-2" />
              Find
            </span>
          )}
        </Button>
      </form>

      {results.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {results.map((location) => (
            <Card key={location.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-red-500" />
                  {location.city}, {location.state}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-2">{location.address}</p>
                <p className="text-sm text-muted-foreground mb-2">Serving: {location.serviceArea.join(", ")}</p>
                <Button size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                  <Phone className="h-4 w-4 mr-2" />
                  {location.phoneNumber}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {searchTerm && results.length === 0 && !searching && (
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p>No locations found for "{searchTerm}".</p>
          <p className="text-sm text-muted-foreground mt-2">
            Please call our main line at 1-800-XXX-XXXX for assistance.
          </p>
        </div>
      )}
    </div>
  )
}
