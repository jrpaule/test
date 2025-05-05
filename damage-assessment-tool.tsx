"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { AlertTriangle, ArrowRight } from "lucide-react"

export function DamageAssessmentTool() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState({
    waterType: "",
    waterDepth: "",
    timeElapsed: "",
    area: "",
  })
  const [result, setResult] = useState<null | {
    severity: "Low" | "Moderate" | "Severe" | "Critical"
    description: string
    action: string
    timeframe: string
  }>(null)

  const handleChange = (field: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      calculateResult()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const calculateResult = () => {
    // Simple scoring system
    let score = 0

    // Water type scoring
    if (answers.waterType === "clean") score += 1
    if (answers.waterType === "gray") score += 2
    if (answers.waterType === "black") score += 4

    // Water depth scoring
    if (answers.waterDepth === "small") score += 1
    if (answers.waterDepth === "ankle") score += 2
    if (answers.waterDepth === "knee") score += 3

    // Time elapsed scoring
    if (answers.timeElapsed === "recent") score += 1
    if (answers.timeElapsed === "hours") score += 2
    if (answers.timeElapsed === "days") score += 3

    // Area affected scoring
    if (answers.area === "small") score += 1
    if (answers.area === "room") score += 2
    if (answers.area === "multiple") score += 3

    // Determine severity based on score
    let severity: "Low" | "Moderate" | "Severe" | "Critical"
    let description = ""
    let action = ""
    let timeframe = ""

    if (score <= 4) {
      severity = "Low"
      description = "Limited water damage with minimal risk."
      action = "Professional assessment recommended but not urgent."
      timeframe = "Within 24-48 hours"
    } else if (score <= 7) {
      severity = "Moderate"
      description = "Noticeable water damage with potential for structural issues if not addressed."
      action = "Professional restoration recommended soon."
      timeframe = "Within 12-24 hours"
    } else if (score <= 10) {
      severity = "Severe"
      description = "Significant water damage with high risk of structural damage and mold growth."
      action = "Immediate professional restoration required."
      timeframe = "Within 4-6 hours"
    } else {
      severity = "Critical"
      description = "Extensive water damage with immediate health and safety risks."
      action = "Emergency restoration required immediately."
      timeframe = "Immediate response needed"
    }

    setResult({ severity, description, action, timeframe })
  }

  const resetTool = () => {
    setStep(1)
    setAnswers({
      waterType: "",
      waterDepth: "",
      timeElapsed: "",
      area: "",
    })
    setResult(null)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-[#003366]" style={{ fontFamily: "Montserrat, sans-serif" }}>
          Water Damage Assessment Tool
        </CardTitle>
        <CardDescription style={{ fontFamily: "Open Sans, sans-serif" }}>
          Answer a few questions to assess the severity of your water damage
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!result ? (
          <>
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  What type of water is involved?
                </h3>
                <RadioGroup value={answers.waterType} onValueChange={(value) => handleChange("waterType", value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="clean" id="water-clean" />
                    <Label htmlFor="water-clean">Clean water (broken pipe, rain)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="gray" id="water-gray" />
                    <Label htmlFor="water-gray">Gray water (washing machine, dishwasher)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="black" id="water-black" />
                    <Label htmlFor="water-black">Black water (sewage, flood from outside)</Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  How deep is the water?
                </h3>
                <RadioGroup value={answers.waterDepth} onValueChange={(value) => handleChange("waterDepth", value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="small" id="depth-small" />
                    <Label htmlFor="depth-small">Small puddles or damp areas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ankle" id="depth-ankle" />
                    <Label htmlFor="depth-ankle">Ankle deep or less</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="knee" id="depth-knee" />
                    <Label htmlFor="depth-knee">Knee deep or more</Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  How long has the area been wet?
                </h3>
                <RadioGroup value={answers.timeElapsed} onValueChange={(value) => handleChange("timeElapsed", value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="recent" id="time-recent" />
                    <Label htmlFor="time-recent">Just happened (less than 2 hours)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hours" id="time-hours" />
                    <Label htmlFor="time-hours">Several hours (2-24 hours)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="days" id="time-days" />
                    <Label htmlFor="time-days">More than a day</Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  How much area is affected?
                </h3>
                <RadioGroup value={answers.area} onValueChange={(value) => handleChange("area", value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="small" id="area-small" />
                    <Label htmlFor="area-small">Small area (less than 10 sq ft)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="room" id="area-room" />
                    <Label htmlFor="area-room">One room or area</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="multiple" id="area-multiple" />
                    <Label htmlFor="area-multiple">Multiple rooms or levels</Label>
                  </div>
                </RadioGroup>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-4">
            <div
              className={`p-4 rounded-lg ${
                result.severity === "Low"
                  ? "bg-blue-50 text-blue-800"
                  : result.severity === "Moderate"
                    ? "bg-yellow-50 text-yellow-800"
                    : result.severity === "Severe"
                      ? "bg-orange-50 text-orange-800"
                      : "bg-red-50 text-red-800"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5" />
                <h3 className="font-bold" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  {result.severity} Risk Level
                </h3>
              </div>
              <p className="text-sm">{result.description}</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Recommended Action:
              </h4>
              <p className="text-sm">{result.action}</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Response Timeframe:
              </h4>
              <p className="text-sm">{result.timeframe}</p>
            </div>

            {(result.severity === "Severe" || result.severity === "Critical") && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800 flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Immediate action required</p>
                  <p>
                    This situation requires emergency professional restoration. Call our emergency line immediately.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!result ? (
          <>
            <Button variant="outline" onClick={handleBack} disabled={step === 1}>
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={
                (step === 1 && !answers.waterType) ||
                (step === 2 && !answers.waterDepth) ||
                (step === 3 && !answers.timeElapsed) ||
                (step === 4 && !answers.area)
              }
              className="bg-[#003366]"
            >
              {step < 4 ? "Next" : "Get Results"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </>
        ) : (
          <div className="w-full space-y-3">
            <Button className="w-full bg-[#FF3333]">
              <Phone className="mr-2 h-4 w-4" />
              Call Emergency Line
            </Button>
            <Button variant="outline" onClick={resetTool} className="w-full">
              Start Over
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

// Add missing import
import { Phone } from "lucide-react"
