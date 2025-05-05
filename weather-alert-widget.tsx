"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CloudRain, Droplets, AlertTriangle, MapPin, ExternalLink } from "lucide-react"

type AlertLevel = "none" | "low" | "moderate" | "high" | "severe"

export function WeatherAlertWidget() {
  const [location, setLocation] = useState<string>("Toronto, ON")
  const [alertLevel, setAlertLevel] = useState<AlertLevel>("moderate")
  const [alerts, setAlerts] = useState<string[]>([
    "Rainfall Warning: 30-50mm expected over next 24 hours",
    "Flood Watch: Don River and Humber River",
  ])
  const [loading, setLoading] = useState<boolean>(false)

  // In a real implementation, this would fetch actual weather data
  // from a weather API based on user's location
  useEffect(() => {
    // Simulating API call
    setLoading(true)
    setTimeout(() => {
      // This would be replaced with actual API data
      setLoading(false)
    }, 1000)
  }, [location])

  const getAlertColor = (level: AlertLevel) => {
    switch (level) {
      case "none":
        return "bg-green-100 text-green-800"
      case "low":
        return "bg-blue-100 text-blue-800"
      case "moderate":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "severe":
        return "bg-red-100 text-red-800"
    }
  }

  const getAlertIcon = (level: AlertLevel) => {
    switch (level) {
      case "none":
        return <Droplets className="h-4 w-4" />
      case "low":
        return <CloudRain className="h-4 w-4" />
      case "moderate":
        return <CloudRain className="h-4 w-4" />
      case "high":
        return <AlertTriangle className="h-4 w-4" />
      case "severe":
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const getAlertText = (level: AlertLevel) => {
    switch (level) {
      case "none":
        return "No Alerts"
      case "low":
        return "Low Risk"
      case "moderate":
        return "Moderate Risk"
      case "high":
        return "High Risk"
      case "severe":
        return "Severe Risk"
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden">
      <CardHeader className="bg-[#003366] text-white">
        <div className="flex justify-between items-center">
          <CardTitle style={{ fontFamily: "Montserrat, sans-serif" }}>Flood Risk Monitor</CardTitle>
          <Badge variant="outline" className="text-white border-white">
            Live
          </Badge>
        </div>
        <CardDescription className="text-white/80" style={{ fontFamily: "Open Sans, sans-serif" }}>
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{location}</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {loading ? (
          <div className="p-6 flex justify-center items-center">
            <div className="animate-spin h-6 w-6 border-2 border-[#003366] border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <>
            <div className={`p-4 ${getAlertColor(alertLevel)} flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                {getAlertIcon(alertLevel)}
                <span className="font-medium" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  Current Flood Risk: {getAlertText(alertLevel)}
                </span>
              </div>
              <Button size="sm" variant="outline" className="h-7 text-xs border-current bg-white/20">
                Details
              </Button>
            </div>

            <div className="p-4">
              <h3 className="text-sm font-medium mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Active Weather Alerts
              </h3>
              <ul className="space-y-2">
                {alerts.map((alert, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span>{alert}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 text-sm">
                <p className="font-medium" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  Flood Preparation Tips:
                </p>
                <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                  <li>Move valuables to higher floors</li>
                  <li>Check sump pumps and backwater valves</li>
                  <li>Clear gutters and storm drains</li>
                </ul>
              </div>

              <Button variant="link" size="sm" className="mt-2 h-auto p-0 text-[#003366]">
                <ExternalLink className="h-3 w-3 mr-1" />
                View Toronto Flood Map
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
