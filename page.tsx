"use client"

import { RestorationEmergencyBanner } from "@/components/restoration-emergency-banner"
import { SkipToContent } from "@/components/skip-to-content"
import { StickyHeader } from "@/components/sticky-header"
import { MobileMenu } from "@/components/mobile-menu"
import { LocationFinder } from "@/components/location-finder"
import { LeadCaptureForm } from "@/components/lead-capture-form"
import { ServiceWorkerRegistration } from "@/components/service-worker-registration"
import { HeroSection } from "@/components/hero-section"
import { EmergencyServicesSection } from "@/components/emergency-services-section"
import { EmergencyTestimonials } from "@/components/emergency-testimonials"
import { FloatingCallButton } from "@/components/floating-call-button"
import { RestorationEmergencySection } from "@/components/restoration-emergency-section"
import { DamageAssessmentTool } from "@/components/damage-assessment-tool"
import { CostEstimator } from "@/components/cost-estimator"
import { WeatherAlertWidget } from "@/components/weather-alert-widget"
import { ImageComparisonSlider } from "@/components/image-comparison-slider"

export default function LandingPage() {
  return (
    <>
      <ServiceWorkerRegistration />
      <SkipToContent />
      <FloatingCallButton />

      <div className="flex min-h-screen flex-col bg-[#F5F5F5]">
        <StickyHeader />
        <div className="md:hidden">
          <MobileMenu />
        </div>

        <main id="main-content" className="flex-1">
          {/* Hero Section */}
          <HeroSection />

          {/* Emergency Services Section */}
          <EmergencyServicesSection />

          {/* Location Finder */}
          <section className="w-full py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-primary mb-2 font-heading">Find Your Local Service</h2>
                <p className="text-gray-600 max-w-2xl mx-auto font-body">
                  We provide emergency restoration services across Ontario. Enter your city or neighborhood to find the
                  nearest service center.
                </p>
              </div>
              <LocationFinder />
            </div>
          </section>

          {/* Emergency Response System */}
          <RestorationEmergencySection />

          {/* Emergency Testimonials */}
          <EmergencyTestimonials />

          {/* Tools Section */}
          <section className="w-full py-12 md:py-24 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 text-primary font-heading">Emergency Assessment Tools</h2>
                <p className="max-w-2xl mx-auto text-gray-600 font-body">
                  Use these tools to assess your situation while waiting for our emergency response team.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <DamageAssessmentTool />
                <CostEstimator />
              </div>

              <div className="mt-12 grid md:grid-cols-2 gap-8">
                <WeatherAlertWidget />
                <ImageComparisonSlider />
              </div>
            </div>
          </section>

          {/* Lead Capture Section */}
          <section className="w-full py-12 md:py-24 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-800 mb-4">
                    FREE DAMAGE ASSESSMENT
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-primary font-heading">
                    Get a Free Emergency Damage Assessment
                  </h2>
                  <p className="text-gray-600 mb-6 font-body">
                    Our expert technicians will assess the damage to your property and provide a detailed estimate at no
                    cost to you. We're available 24/7 for emergency situations.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Detailed damage assessment",
                      "Itemized cost breakdown",
                      "Insurance documentation",
                      "Restoration timeline",
                      "No obligation quote",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <div className="bg-green-100 text-green-800 rounded-full p-1 mr-2 mt-0.5">
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <LeadCaptureForm />
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="w-full py-8 bg-gray-800 text-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 font-heading">Rapid Restore Ontario</h3>
                <p className="text-gray-300 font-body">
                  Professional emergency restoration services available 24/7 across Ontario.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 font-heading">Emergency Services</h3>
                <ul className="space-y-2 text-gray-300 font-body">
                  <li>Water Damage Restoration</li>
                  <li>Fire Damage Restoration</li>
                  <li>Mold Remediation</li>
                  <li>Storm Damage Restoration</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 font-heading">Ontario Locations</h3>
                <ul className="space-y-2 text-gray-300 font-body">
                  <li>Toronto, ON</li>
                  <li>Ottawa, ON</li>
                  <li>Hamilton, ON</li>
                  <li>London, ON</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 font-heading">Emergency Contact</h3>
                <ul className="space-y-2 text-gray-300 font-body">
                  <li className="font-bold text-red-400">24/7 Emergency: 1-800-555-HELP</li>
                  <li>info@rapidrestoreontario.com</li>
                  <li>123 Restoration Ave, Toronto, ON</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 font-body">
              <p>&copy; {new Date().getFullYear()} Rapid Restore Ontario. All rights reserved.</p>
            </div>
          </div>
        </footer>

        <RestorationEmergencyBanner />
      </div>
    </>
  )
}
