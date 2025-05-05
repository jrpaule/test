"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  MicIcon,
  PhoneOff,
  User,
  Volume2,
  Loader2,
  CheckCircle2,
  MapPin,
  Clock,
  Calendar,
  Droplet,
  Flame,
  Wind,
  AlertTriangle,
  Building,
  HomeIcon,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type CallState = "idle" | "connecting" | "active" | "completed" | "scheduled" | "transferring"
type MessageType = "dispatcher" | "system" | "user"
type EmergencyType = "water" | "fire" | "mold" | "storm" | "other"
type PropertyType = "residential" | "commercial" | "multi-family"

interface Message {
  id: number
  type: MessageType
  text: string
  time: Date
}

interface Location {
  id: string
  city: string
  state: string
  serviceArea: string[]
  phoneNumber: string
}

// Sample locations data - would be dynamically loaded in production
const LOCATIONS: Location[] = [
  {
    id: "toronto",
    city: "Toronto",
    state: "ON",
    serviceArea: ["Etobicoke", "North York", "Scarborough", "Downtown"],
    phoneNumber: "416-555-1234",
  },
  {
    id: "ottawa",
    city: "Ottawa",
    state: "ON",
    serviceArea: ["Centretown", "Kanata", "Orleans", "Nepean"],
    phoneNumber: "613-555-5678",
  },
  {
    id: "hamilton",
    city: "Hamilton",
    state: "ON",
    serviceArea: ["Stoney Creek", "Dundas", "Ancaster", "Burlington"],
    phoneNumber: "905-555-9012",
  },
  {
    id: "london",
    city: "London",
    state: "ON",
    serviceArea: ["Downtown", "Byron", "Masonville", "Lambeth"],
    phoneNumber: "519-555-3456",
  },
]

// Emergency type data with descriptions and response times
const EMERGENCY_TYPES = {
  water: {
    icon: Droplet,
    title: "Water Damage",
    description: "Flooding, burst pipes, sewage backups, or any water-related damage",
    responseTime: "45 minutes",
    urgencyLevel: "high",
    commonCauses: ["Burst pipes", "Roof leaks", "Flooding", "Appliance failures", "Sewage backups"],
  },
  fire: {
    icon: Flame,
    title: "Fire Damage",
    description: "Fire, smoke, or soot damage to your property",
    responseTime: "60 minutes",
    urgencyLevel: "high",
    commonCauses: ["Kitchen fires", "Electrical fires", "Heating equipment", "Candles", "Lightning"],
  },
  mold: {
    icon: AlertTriangle,
    title: "Mold Remediation",
    description: "Mold growth or suspected mold issues",
    responseTime: "24 hours",
    urgencyLevel: "medium",
    commonCauses: ["Water damage", "High humidity", "Poor ventilation", "Leaking pipes", "Flooding"],
  },
  storm: {
    icon: Wind,
    title: "Storm Damage",
    description: "Damage from storms, wind, hail, or fallen trees",
    responseTime: "90 minutes",
    urgencyLevel: "high",
    commonCauses: ["High winds", "Hail", "Fallen trees", "Heavy rain", "Lightning"],
  },
  other: {
    icon: Building,
    title: "Other Restoration",
    description: "Other restoration emergencies",
    responseTime: "Same day",
    urgencyLevel: "medium",
    commonCauses: ["Biohazard cleanup", "Vandalism", "Vehicle impact", "Structural issues"],
  },
}

export function RestorationEmergencySystem() {
  // State for location and service selection
  const [selectedLocation, setSelectedLocation] = useState<string>("")
  const [detectedLocation, setDetectedLocation] = useState<string | null>(null)
  const [emergencyType, setEmergencyType] = useState<EmergencyType | null>(null)
  const [propertyType, setPropertyType] = useState<PropertyType | null>(null)

  // Call state management
  const [callState, setCallState] = useState<CallState>("idle")
  const [callDuration, setCallDuration] = useState(0)
  const [messages, setMessages] = useState<Message[]>([])
  const [address, setAddress] = useState<string | null>(null)
  const [teamDispatchTime, setTeamDispatchTime] = useState<number | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Lead capture and scheduling
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  })
  const [scheduledTime, setScheduledTime] = useState<Date | null>(null)
  const [insuranceInfo, setInsuranceInfo] = useState({
    hasInsurance: false,
    provider: "",
    policyNumber: "",
  })

  // Call summary
  const [callSummary, setCallSummary] = useState<{
    callDuration: number
    dispatchTime: number
    estimatedArrival: number
    ticketNumber: string
    serviceType: string
    location: string
    propertyType: string
  } | null>(null)

  // Attempt to detect user's location on component mount
  useEffect(() => {
    // Simulate location detection - in production, use geolocation API or IP-based detection
    const detectLocation = async () => {
      try {
        // Simulating a geolocation API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        // For demo purposes, randomly select a location
        const randomLocation = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)]
        setDetectedLocation(randomLocation.id)
        setSelectedLocation(randomLocation.id)
      } catch (error) {
        console.error("Error detecting location:", error)
      }
    }

    detectLocation()
  }, [])

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Handle call timer
  useEffect(() => {
    if (callState === "active") {
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [callState])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const addMessage = (text: string, type: MessageType = "dispatcher") => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        type,
        text,
        time: new Date(),
      },
    ])
  }

  const simulateTyping = async (duration = 1500) => {
    setIsTyping(true)
    await new Promise((resolve) => setTimeout(resolve, duration))
    setIsTyping(false)
  }

  const getLocationById = (id: string) => {
    return LOCATIONS.find((loc) => loc.id === id) || LOCATIONS[0]
  }

  const startCall = async () => {
    if (!selectedLocation || !emergencyType) {
      return
    }

    setCallState("connecting")
    setMessages([])

    // Simulate connecting
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setCallState("active")

    const location = getLocationById(selectedLocation)
    const emergency = EMERGENCY_TYPES[emergencyType]

    addMessage(`${emergency.title} Emergency Response for ${location.city}. This is Sarah. How can I help you?`)

    // Simulate dispatcher responses based on emergency type
    simulateDispatcherConversation(emergency, location)
  }

  const simulateDispatcherConversation = async (emergency: any, location: Location) => {
    // Wait for initial greeting to be read
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Ask for address
    await simulateTyping()
    addMessage(
      `I understand you're experiencing a ${emergency.title.toLowerCase()} emergency. Can you please provide your address in ${location.city} so we can dispatch a team to your location?`,
    )

    // Wait for user to potentially respond
    await new Promise((resolve) => setTimeout(resolve, 5000))

    // Prompt for address again with example
    await simulateTyping()
    addMessage(`For example: "123 Main Street, ${location.city}" or your current location`)

    // After user provides address or 10 seconds pass
    await new Promise((resolve) => setTimeout(resolve, 10000))

    if (!address) {
      // Generate a random address if user hasn't provided one
      const randomAddress = `42 Maple Avenue, ${location.city}, ${location.state}`
      setAddress(randomAddress)
      addMessage(`I'll use your account address: ${randomAddress}`, "system")
    }

    // Confirm address
    await simulateTyping()
    addMessage(
      `Thank you. I've confirmed your address as ${address || `42 Maple Avenue, ${location.city}`}. Is that correct?`,
    )

    // Wait for confirmation
    await new Promise((resolve) => setTimeout(resolve, 4000))

    // Ask about the situation
    await simulateTyping()
    addMessage(
      `Can you briefly describe the ${emergency.title.toLowerCase()} situation? ${getEmergencySpecificQuestion(emergencyType)}`,
    )

    // Wait for description
    await new Promise((resolve) => setTimeout(resolve, 8000))

    // Acknowledge and provide instructions
    await simulateTyping()
    addMessage(`I understand. This is definitely an emergency situation that requires immediate attention.`)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    await simulateTyping()
    addMessage(getEmergencySpecificInstructions(emergencyType))

    // Dispatch team
    await new Promise((resolve) => setTimeout(resolve, 3000))

    await simulateTyping(2000)
    addMessage(`I'm dispatching our nearest ${emergency.title.toLowerCase()} response team to your location right now.`)

    const dispatchTime = getDispatchTime(emergencyType)
    setTeamDispatchTime(dispatchTime)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    addMessage(`Team dispatched. Estimated arrival time: ${dispatchTime} minutes.`, "system")

    // Generate ticket number
    const prefix = getEmergencyPrefix(emergencyType)
    const ticketNumber = `${prefix}${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`

    await simulateTyping()
    addMessage(
      `I've created emergency ticket #${ticketNumber} for your situation. Our team leader will call you when they're 5 minutes away.`,
    )

    await new Promise((resolve) => setTimeout(resolve, 3000))

    await simulateTyping()
    addMessage(`Is there anything else I should tell the response team about your situation?`)

    // Wait for final response
    await new Promise((resolve) => setTimeout(resolve, 8000))

    await simulateTyping()
    addMessage(
      `Thank you for this information. Our team is on the way and fully prepared to handle your ${emergency.title.toLowerCase()} emergency.`,
    )

    await new Promise((resolve) => setTimeout(resolve, 2000))

    await simulateTyping()
    addMessage(
      `You can end this call now, but please keep your phone nearby. Is there anything else you need from me before we disconnect?`,
    )
  }

  const getEmergencySpecificQuestion = (type: EmergencyType | null) => {
    switch (type) {
      case "water":
        return "Is it a burst pipe, flooding, or something else?"
      case "fire":
        return "Is the fire out? Are you in a safe location?"
      case "mold":
        return "How long have you noticed the mold? Is anyone experiencing health symptoms?"
      case "storm":
        return "What type of damage has occurred? Is your property secure?"
      default:
        return "Can you provide more details about the emergency?"
    }
  }

  const getEmergencySpecificInstructions = (type: EmergencyType | null) => {
    switch (type) {
      case "water":
        return "While our team is on the way, if it's safe to do so, please turn off your main water supply to prevent further damage."
      case "fire":
        return "Please ensure everyone remains at a safe distance from the affected area. Our team will assess the structural safety upon arrival."
      case "mold":
        return "Please avoid disturbing the mold area to prevent spore dispersal. If possible, close off the affected room until our team arrives."
      case "storm":
        return "If there are any broken windows or roof damage, try to temporarily cover them if it's safe to do so. Stay away from any structural damage."
      default:
        return "Please ensure everyone is in a safe location. Our team will provide further instructions upon arrival."
    }
  }

  const getDispatchTime = (type: EmergencyType | null) => {
    switch (type) {
      case "water":
        return Math.floor(Math.random() * 16) + 30 // 30-45 minutes
      case "fire":
        return Math.floor(Math.random() * 16) + 45 // 45-60 minutes
      case "mold":
        return Math.floor(Math.random() * 4) + 1 // 1-4 hours, converted to minutes
      case "storm":
        return Math.floor(Math.random() * 31) + 60 // 60-90 minutes
      default:
        return Math.floor(Math.random() * 61) + 60 // 1-2 hours
    }
  }

  const getEmergencyPrefix = (type: EmergencyType | null) => {
    switch (type) {
      case "water":
        return "WD"
      case "fire":
        return "FD"
      case "mold":
        return "MD"
      case "storm":
        return "SD"
      default:
        return "RS"
    }
  }

  const endCall = () => {
    if (!emergencyType || !selectedLocation || !propertyType) return

    // Create call summary
    setCallSummary({
      callDuration,
      dispatchTime: callDuration,
      estimatedArrival: teamDispatchTime || 35,
      ticketNumber: `${getEmergencyPrefix(emergencyType)}${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`,
      serviceType: EMERGENCY_TYPES[emergencyType].title,
      location: getLocationById(selectedLocation).city,
      propertyType:
        propertyType === "residential" ? "Residential" : propertyType === "commercial" ? "Commercial" : "Multi-family",
    })

    setCallState("completed")

    // Reset for next call
    if (timerRef.current) clearInterval(timerRef.current)

    // In a real implementation, this would send the lead data to your CRM or call center system
    const leadData = {
      timestamp: new Date().toISOString(),
      customerInfo,
      emergencyType,
      propertyType,
      location: selectedLocation,
      address: address || "",
      callDuration,
      messages: messages.map((m) => ({
        type: m.type,
        text: m.text,
        time: m.time.toISOString(),
      })),
    }

    // Log the lead data - in production this would be sent to your backend
    console.log("Lead data captured:", leadData)
  }

  const scheduleCallback = () => {
    setCallState("scheduled")

    // In a real implementation, this would schedule a callback in your system
    const callbackData = {
      customerInfo,
      scheduledTime,
      emergencyType,
      propertyType,
      location: selectedLocation,
      insuranceInfo,
    }

    // Log the callback data - in production this would be sent to your backend
    console.log("Callback scheduled:", callbackData)
  }

  const resetCall = () => {
    setCallState("idle")
    setCallDuration(0)
    setMessages([])
    setAddress(null)
    setTeamDispatchTime(null)
    setCallSummary(null)
    setEmergencyType(null)
    setPropertyType(null)
    setCustomerInfo({
      name: "",
      phone: "",
      email: "",
      address: "",
      notes: "",
    })
    setScheduledTime(null)
    setInsuranceInfo({
      hasInsurance: false,
      provider: "",
      policyNumber: "",
    })
  }

  const handleAddressSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const addressInput = formData.get("address") as string

    if (addressInput) {
      setAddress(addressInput)
      addMessage(addressInput, "user")

      // Clear the input
      const form = e.target as HTMLFormElement
      form.reset()
    }
  }

  const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const messageInput = formData.get("message") as string

    if (messageInput) {
      addMessage(messageInput, "user")

      // Clear the input
      const form = e.target as HTMLFormElement
      form.reset()
    }
  }

  const handleTransferToLive = () => {
    setCallState("transferring")

    // Simulate transfer to live operator
    setTimeout(() => {
      window.location.href = `tel:${getLocationById(selectedLocation).phoneNumber}`
    }, 2000)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid md:grid-cols-5 gap-4">
        {/* Service selection sidebar */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-heading">Emergency Restoration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {callState === "idle" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="location">Your Location</Label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger id="location">
                        <SelectValue placeholder="Select your location" />
                      </SelectTrigger>
                      <SelectContent>
                        {LOCATIONS.map((location) => (
                          <SelectItem key={location.id} value={location.id}>
                            {location.city}, {location.state}
                            {detectedLocation === location.id && " (Detected)"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedLocation && (
                      <p className="text-xs text-muted-foreground font-body">
                        Serving: {getLocationById(selectedLocation).serviceArea.join(", ")}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Emergency Type</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(EMERGENCY_TYPES).map(([key, value]) => {
                        const Icon = value.icon
                        return (
                          <Button
                            key={key}
                            variant={emergencyType === key ? "default" : "outline"}
                            className={`flex flex-col h-auto py-3 ${emergencyType === key ? "bg-primary text-primary-foreground" : ""}`}
                            onClick={() => setEmergencyType(key as EmergencyType)}
                          >
                            <Icon className="h-5 w-5 mb-1" />
                            <span className="text-xs">{value.title}</span>
                          </Button>
                        )
                      })}
                    </div>
                  </div>

                  {emergencyType && (
                    <div className="space-y-2">
                      <Label>Property Type</Label>
                      <RadioGroup
                        value={propertyType || ""}
                        onValueChange={(value) => setPropertyType(value as PropertyType)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="residential" id="residential" />
                          <Label htmlFor="residential" className="flex items-center">
                            <HomeIcon className="h-3 w-3 mr-1" />
                            Residential
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="commercial" id="commercial" />
                          <Label htmlFor="commercial" className="flex items-center">
                            <Building className="h-3 w-3 mr-1" />
                            Commercial
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="multi-family" id="multi-family" />
                          <Label htmlFor="multi-family">Multi-family</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}

                  {emergencyType && (
                    <div className="bg-muted p-3 rounded-md space-y-2 text-sm">
                      <h4 className="font-medium flex items-center font-heading">
                        <AlertTriangle className="h-4 w-4 mr-1 text-amber-500" />
                        {EMERGENCY_TYPES[emergencyType].title} Emergency
                      </h4>
                      <p className="font-body">{EMERGENCY_TYPES[emergencyType].description}</p>
                      <div>
                        <span className="text-xs font-medium">Response Time: </span>
                        <Badge variant="outline" className="ml-1">
                          {EMERGENCY_TYPES[emergencyType].responseTime}
                        </Badge>
                      </div>
                      <div className="text-xs">
                        <span className="font-medium">Common causes:</span>
                        <ul className="list-disc pl-4 mt-1 space-y-1">
                          {EMERGENCY_TYPES[emergencyType].commonCauses.map((cause: string, i: number) => (
                            <li key={i}>{cause}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={startCall}
                    disabled={!selectedLocation || !emergencyType || !propertyType}
                    className="w-full bg-secondary hover:bg-secondary-700 text-white"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Start Emergency Call
                  </Button>

                  <div className="text-center">
                    <span className="text-xs text-muted-foreground font-body">or</span>
                    <Button variant="link" className="w-full" onClick={() => setCallState("scheduled")}>
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule a Callback
                    </Button>
                  </div>
                </>
              )}

              {(callState === "active" || callState === "connecting") && emergencyType && (
                <div className="space-y-4">
                  <div className="bg-muted p-3 rounded-md space-y-2">
                    <h4 className="font-medium flex items-center font-heading">
                      <AlertTriangle className="h-4 w-4 mr-1 text-amber-500" />
                      {EMERGENCY_TYPES[emergencyType].title} Emergency
                    </h4>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-xs font-medium block">Location:</span>
                        {getLocationById(selectedLocation).city}, {getLocationById(selectedLocation).state}
                      </div>
                      <div>
                        <span className="text-xs font-medium block">Property:</span>
                        {propertyType === "residential"
                          ? "Residential"
                          : propertyType === "commercial"
                            ? "Commercial"
                            : "Multi-family"}
                      </div>
                    </div>

                    <div className="text-xs space-y-1">
                      <span className="font-medium">Safety Tips:</span>
                      <ul className="list-disc pl-4 space-y-1">
                        {emergencyType === "water" && (
                          <>
                            <li>Turn off water main if possible</li>
                            <li>Avoid electrical hazards</li>
                            <li>Move valuables to higher ground</li>
                          </>
                        )}
                        {emergencyType === "fire" && (
                          <>
                            <li>Ensure everyone is evacuated</li>
                            <li>Do not re-enter the building</li>
                            <li>Stay clear of damaged areas</li>
                          </>
                        )}
                        {emergencyType === "mold" && (
                          <>
                            <li>Avoid disturbing mold areas</li>
                            <li>Turn off HVAC systems if possible</li>
                            <li>Keep affected areas isolated</li>
                          </>
                        )}
                        {emergencyType === "storm" && (
                          <>
                            <li>Watch for fallen power lines</li>
                            <li>Beware of structural damage</li>
                            <li>Document damage with photos</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full" onClick={handleTransferToLive}>
                    <Phone className="mr-2 h-4 w-4" />
                    Transfer to Live Operator
                  </Button>
                </div>
              )}

              {callState === "completed" && callSummary && (
                <div className="space-y-4">
                  <div className="bg-green-50 p-3 rounded-md space-y-2 border border-green-100">
                    <h4 className="font-medium flex items-center text-green-800 font-heading">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Response Team Dispatched
                    </h4>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-xs font-medium block">Service:</span>
                        {callSummary.serviceType}
                      </div>
                      <div>
                        <span className="text-xs font-medium block">Location:</span>
                        {callSummary.location}
                      </div>
                      <div>
                        <span className="text-xs font-medium block">Property:</span>
                        {callSummary.propertyType}
                      </div>
                      <div>
                        <span className="text-xs font-medium block">Ticket:</span>#{callSummary.ticketNumber}
                      </div>
                    </div>

                    <div className="text-xs space-y-1">
                      <span className="font-medium">Next Steps:</span>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Team will arrive in approximately {callSummary.estimatedArrival} minutes</li>
                        <li>Team leader will call when 5 minutes away</li>
                        <li>Prepare insurance information if available</li>
                        <li>Document damage with photos if safe to do so</li>
                      </ul>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full" onClick={resetCall}>
                    Start New Call
                  </Button>
                </div>
              )}

              {callState === "scheduled" && (
                <div className="space-y-4">
                  <h3 className="font-medium text-lg font-heading">Schedule a Callback</h3>

                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                        placeholder="Full Name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                        placeholder="(555) 555-5555"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                        placeholder="you@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="callback-address">Property Address</Label>
                      <Input
                        id="callback-address"
                        value={customerInfo.address}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                        placeholder="123 Main St, City, State"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="callback-time">Preferred Callback Time</Label>
                      <Input
                        id="callback-time"
                        type="datetime-local"
                        onChange={(e) => setScheduledTime(new Date(e.target.value))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        value={customerInfo.notes}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                        placeholder="Please describe your situation"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="has-insurance"
                        checked={insuranceInfo.hasInsurance}
                        onCheckedChange={(checked) =>
                          setInsuranceInfo({ ...insuranceInfo, hasInsurance: checked as boolean })
                        }
                      />
                      <Label htmlFor="has-insurance">I have insurance coverage</Label>
                    </div>

                    {insuranceInfo.hasInsurance && (
                      <div className="space-y-3 pl-6">
                        <div className="space-y-2">
                          <Label htmlFor="insurance-provider">Insurance Provider</Label>
                          <Input
                            id="insurance-provider"
                            value={insuranceInfo.provider}
                            onChange={(e) => setInsuranceInfo({ ...insuranceInfo, provider: e.target.value })}
                            placeholder="Provider Name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="policy-number">Policy Number</Label>
                          <Input
                            id="policy-number"
                            value={insuranceInfo.policyNumber}
                            onChange={(e) => setInsuranceInfo({ ...insuranceInfo, policyNumber: e.target.value })}
                            placeholder="Policy Number"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={scheduleCallback} disabled={!customerInfo.phone} className="flex-1">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Callback
                    </Button>
                    <Button variant="outline" onClick={resetCall} className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {callState === "transferring" && (
                <div className="text-center py-8 space-y-4">
                  <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
                  <h3 className="font-medium text-lg font-heading">Transferring to Live Operator</h3>
                  <p className="text-sm text-muted-foreground font-body">
                    Please wait while we connect you with a live emergency response specialist...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Call simulator */}
        <div className="md:col-span-3">
          <Card className="overflow-hidden">
            <CardHeader
              className={`${
                callState === "idle" || callState === "scheduled"
                  ? "bg-gray-100"
                  : callState === "connecting"
                    ? "bg-blue-100"
                    : callState === "active"
                      ? "bg-green-100"
                      : callState === "transferring"
                        ? "bg-amber-100"
                        : "bg-gray-100"
              }`}
            >
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2 font-heading">
                  {callState === "idle" && <Phone className="h-5 w-5" />}
                  {callState === "connecting" && <Loader2 className="h-5 w-5 animate-spin" />}
                  {callState === "active" && <Volume2 className="h-5 w-5 animate-pulse" />}
                  {callState === "completed" && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                  {callState === "scheduled" && <Calendar className="h-5 w-5" />}
                  {callState === "transferring" && <Phone className="h-5 w-5 animate-pulse" />}

                  <span>
                    {callState === "idle" && "Emergency Response Line"}
                    {callState === "connecting" && "Connecting..."}
                    {callState === "active" && "Call in Progress"}
                    {callState === "completed" && "Call Completed"}
                    {callState === "scheduled" && "Schedule Callback"}
                    {callState === "transferring" && "Transferring Call"}
                  </span>
                </CardTitle>

                {callState === "active" && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatTime(callDuration)}
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="p-0">
              {callState === "active" && (
                <div className="flex flex-col h-[400px]">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`
                          max-w-[80%] rounded-lg p-3 
                          ${
                            message.type === "dispatcher"
                              ? "bg-blue-100 text-blue-800"
                              : message.type === "system"
                                ? "bg-gray-100 text-gray-800"
                                : "bg-green-100 text-green-800"
                          }
                        `}
                        >
                          {message.type !== "user" && (
                            <div className="flex items-center gap-1 mb-1">
                              {message.type === "dispatcher" ? (
                                <User className="h-3 w-3" />
                              ) : (
                                <Volume2 className="h-3 w-3" />
                              )}
                              <span className="text-xs font-medium">
                                {message.type === "dispatcher" ? "Dispatcher" : "System"}
                              </span>
                            </div>
                          )}
                          <p className="text-sm font-body">{message.text}</p>
                          <div className="text-xs opacity-70 mt-1 text-right">
                            {message.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </div>
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-blue-50 rounded-lg p-3 max-w-[80%]">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                              style={{ animationDelay: "600ms" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  <div className="p-3 border-t">
                    {!address ? (
                      <form onSubmit={handleAddressSubmit} className="flex gap-2">
                        <input
                          type="text"
                          name="address"
                          placeholder="Enter your address..."
                          className="flex-1 px-3 py-2 border rounded-md text-sm"
                          required
                        />
                        <Button type="submit" size="sm">
                          <MapPin className="h-4 w-4" />
                        </Button>
                      </form>
                    ) : (
                      <form onSubmit={handleMessageSubmit} className="flex gap-2">
                        <input
                          type="text"
                          name="message"
                          placeholder="Type your response..."
                          className="flex-1 px-3 py-2 border rounded-md text-sm"
                        />
                        <Button type="submit" size="sm">
                          <MicIcon className="h-4 w-4" />
                        </Button>
                      </form>
                    )}
                  </div>
                </div>
              )}

              {callState === "completed" && callSummary && (
                <div className="p-6 space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>

                  <h3 className="font-bold text-lg text-center font-heading">Emergency Call Summary</h3>

                  <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 font-body">Service Type:</span>
                      <span className="font-medium">{callSummary.serviceType}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 font-body">Location:</span>
                      <span className="font-medium">{callSummary.location}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 font-body">Property Type:</span>
                      <span className="font-medium">{callSummary.propertyType}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 font-body">Call Duration:</span>
                      <span className="font-medium">{formatTime(callSummary.callDuration)}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 font-body">Team Dispatched:</span>
                      <span className="font-medium text-green-600">✓ {formatTime(callSummary.dispatchTime)}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 font-body">Estimated Arrival:</span>
                      <span className="font-medium">{callSummary.estimatedArrival} minutes</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 font-body">Ticket Number:</span>
                      <span className="font-medium">{callSummary.ticketNumber}</span>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
                    <p className="font-medium font-body">What happens next?</p>
                    <p className="mt-1 font-body">
                      In a real emergency, our team would be on the way to your location. The team leader would call you
                      when they're 5 minutes away.
                    </p>
                  </div>
                </div>
              )}

              {callState === "connecting" && (
                <div className="p-6 text-center space-y-4">
                  <div className="flex justify-center">
                    <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
                  </div>
                  <p className="font-body">Connecting to emergency dispatcher...</p>
                </div>
              )}

              {callState === "transferring" && (
                <div className="p-6 text-center space-y-4">
                  <div className="flex justify-center">
                    <Loader2 className="h-12 w-12 text-amber-600 animate-spin" />
                  </div>
                  <p className="font-body">Transferring to live operator...</p>
                  <p className="text-sm text-muted-foreground font-body">
                    You will be connected with a live emergency specialist in a few seconds.
                  </p>
                </div>
              )}
            </CardContent>

            {callState === "active" && (
              <CardFooter className="border-t p-3">
                <Button onClick={endCall} variant="destructive" className="w-full">
                  <PhoneOff className="mr-2 h-4 w-4" />
                  End Call
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>

      {/* SEO-optimized structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EmergencyService",
            name: "Rapid Restore Ontario",
            serviceType: [
              "Water Damage Restoration",
              "Fire Damage Restoration",
              "Mold Remediation",
              "Storm Damage Restoration",
            ],
            availableChannel: {
              "@type": "ServiceChannel",
              serviceUrl: "https://www.rapidresponserestoration.com",
              servicePhone: "1-800-XXX-XXXX",
              availableLanguage: "English",
            },
            areaServed: [
              {
                "@type": "City",
                name: "Toronto",
                containedInPlace: {
                  "@type": "State",
                  name: "Ontario",
                },
              },
              {
                "@type": "City",
                name: "Ottawa",
                containedInPlace: {
                  "@type": "State",
                  name: "Ontario",
                },
              },
            ],
            serviceArea: {
              "@type": "GeoCircle",
              geoMidpoint: {
                "@type": "GeoCoordinates",
                latitude: 43.6532,
                longitude: -79.3832,
              },
              geoRadius: "50000",
            },
            availabilityStarts: "00:00",
            availabilityEnds: "23:59",
            hoursAvailable: "24/7",
            termsOfService: "Emergency response within 45 minutes guaranteed",
          }),
        }}
      />
    </div>
  )
}
