"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Info } from "lucide-react"

export function CostEstimator() {
  const [squareFeet, setSquareFeet] = useState(500)
  const [waterDepth, setWaterDepth] = useState(2)
  const [propertyType, setPropertyType] = useState("residential")
  const [waterType, setWaterType] = useState("clean")

  // Calculate estimated cost range
  const calculateCost = () => {
    // Base cost per square foot
    const baseCostPerSqFt = propertyType === "residential" ? 7 : 12

    // Multiplier based on water type
    let waterTypeMultiplier = 1
    if (waterType === "gray") waterTypeMultiplier = 1.5
    if (waterType === "black") waterTypeMultiplier = 2.5

    // Multiplier based on water depth (inches)
    const depthMultiplier = 1 + waterDepth / 10

    // Calculate low and high estimates
    const baseCost = squareFeet * baseCostPerSqFt * waterTypeMultiplier * depthMultiplier

    return {
      low: Math.round(baseCost * 0.8),
      high: Math.round(baseCost * 1.2),
    }
  }

  const costEstimate = calculateCost()

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-[#003366]" style={{ fontFamily: "Montserrat, sans-serif" }}>
          Water Damage Cost Estimator
        </CardTitle>
        <CardDescription style={{ fontFamily: "Open Sans, sans-serif" }}>
          Get a rough estimate of restoration costs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="residential" onValueChange={(value) => setPropertyType(value)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="residential">Residential</TabsTrigger>
            <TabsTrigger value="commercial">Commercial</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Affected Area (sq ft)
            </label>
            <span className="text-sm font-bold">{squareFeet} sq ft</span>
          </div>
          <Slider
            value={[squareFeet]}
            min={100}
            max={2000}
            step={50}
            onValueChange={(value) => setSquareFeet(value[0])}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>100 sq ft</span>
            <span>2000 sq ft</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Water Depth (inches)
            </label>
            <span className="text-sm font-bold">{waterDepth} inches</span>
          </div>
          <Slider value={[waterDepth]} min={1} max={24} step={1} onValueChange={(value) => setWaterDepth(value[0])} />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 inch</span>
            <span>24 inches</span>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Water Type
          </label>
          <Tabs defaultValue="clean" onValueChange={(value) => setWaterType(value)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="clean">Clean</TabsTrigger>
              <TabsTrigger value="gray">Gray</TabsTrigger>
              <TabsTrigger value="black">Black</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="text-xs text-muted-foreground flex items-start gap-1">
            <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
            <span>Clean: Fresh water | Gray: Washing machines, dishwashers | Black: Sewage, flooding from rivers</span>
          </div>
        </div>

        <div className="mt-6 p-4 bg-[#003366]/5 rounded-lg">
          <h3 className="text-center font-bold mb-2 text-[#003366]" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Estimated Cost Range
          </h3>
          <p className="text-center text-2xl font-bold text-[#003366]">
            ${costEstimate.low.toLocaleString()} - ${costEstimate.high.toLocaleString()}
          </p>
          <p className="text-center text-xs text-muted-foreground mt-2">
            This is a rough estimate. Actual costs may vary based on specific conditions.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex-col space-y-2">
        <Button className="w-full bg-[#003366]">
          <CreditCard className="mr-2 h-4 w-4" />
          Check Insurance Coverage
        </Button>
        <p className="text-xs text-center text-muted-foreground">
          Most homeowner's insurance policies cover sudden and accidental water damage.
        </p>
      </CardFooter>
    </Card>
  )
}
