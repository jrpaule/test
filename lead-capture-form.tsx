"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, AlertTriangle, Phone } from "lucide-react"
import { brandConfig } from "@/lib/brand-config"

export function LeadCaptureForm() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    serviceType: "",
    message: "",
    urgent: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("submitting")

    // Simulate form submission
    setTimeout(() => {
      // In production, this would be an API call
      console.log("Form submitted:", formData)
      setFormState("success")
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  if (formState === "success") {
    return (
      <Card>
        <CardHeader>
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-center">Request Received!</CardTitle>
          <CardDescription className="text-center">
            Thank you for contacting Rapid Restore Ontario. A member of our team will be in touch shortly.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground">
            {formData.urgent
              ? "Since you marked this as urgent, we'll prioritize your request and contact you as soon as possible."
              : "We typically respond to all inquiries within 2 hours during business hours."}
          </p>

          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm font-medium text-yellow-800">Need immediate assistance?</p>
            <Button className="mt-2 bg-red-600 hover:bg-red-700 text-white">
              <Phone className="mr-2 h-4 w-4" />
              Call Now: {brandConfig.company.phone}
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            variant="outline"
            onClick={() => {
              setFormState("idle")
              setFormData({
                name: "",
                email: "",
                phone: "",
                address: "",
                serviceType: "",
                message: "",
                urgent: false,
              })
            }}
          >
            Submit Another Request
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="border-t-4 border-red-600">
      <CardHeader className="bg-gray-50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-primary font-heading">Request a Free Assessment</CardTitle>
          <div className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full">24/7 Service</div>
        </div>
        <CardDescription>Fill out the form below and our team will get back to you promptly.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-yellow-50 border border-yellow-100 rounded p-3 mb-4 flex items-start">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-yellow-800">
            <p className="font-medium">Need immediate assistance?</p>
            <p>For emergencies, please call us directly at {brandConfig.company.phone}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address">Property Address</Label>
              <Input id="address" name="address" value={formData.address} onChange={handleChange} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="serviceType">Service Needed</Label>
              <Select value={formData.serviceType} onValueChange={(value) => handleSelectChange("serviceType", value)}>
                <SelectTrigger id="serviceType">
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="water">Water Damage Restoration</SelectItem>
                  <SelectItem value="fire">Fire Damage Restoration</SelectItem>
                  <SelectItem value="mold">Mold Remediation</SelectItem>
                  <SelectItem value="storm">Storm Damage Restoration</SelectItem>
                  <SelectItem value="other">Other Services</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Please describe your situation..."
                className="min-h-[100px]"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="urgent"
                checked={formData.urgent}
                onCheckedChange={(checked) => handleCheckboxChange("urgent", checked as boolean)}
              />
              <Label
                htmlFor="urgent"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                This is an urgent request
              </Label>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white"
            disabled={formState === "submitting"}
          >
            {formState === "submitting" ? (
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
                Submitting...
              </span>
            ) : (
              "Submit Request"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
