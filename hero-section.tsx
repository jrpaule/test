import { Phone, Clock, Shield, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { brandConfig } from "@/lib/brand-config"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 bg-gradient-to-r from-primary-800 to-primary-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <Image src="/aqueous-abstraction.png" alt="" fill className="object-cover" priority />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-left space-y-6">
            <div className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">
              <Clock className="mr-2 h-4 w-4" />
              45-MINUTE EMERGENCY RESPONSE
            </div>

            <h1 className="text-4xl md:text-5xl font-bold font-heading leading-tight">
              Ontario's Fastest <span className="text-yellow-300">Emergency Restoration</span> Service
            </h1>

            <p className="text-xl opacity-90 font-body">
              Water damage, fire damage, mold, or storm damage? We'll be there in 45 minutes or less, guaranteed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white text-lg font-bold px-8 py-6">
                <Phone className="mr-2 h-5 w-5" />
                CALL NOW: {brandConfig.company.phone}
              </Button>

              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6">
                Get a Free Estimate
              </Button>
            </div>

            <div className="flex items-center text-yellow-300 text-sm font-medium">
              <Shield className="h-4 w-4 mr-1" />
              <span>Fully licensed & insured • Available 24/7 • Serving all of Ontario</span>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
              <h3 className="text-xl font-bold mb-4 font-heading">Emergency Response Timer</h3>

              <div className="bg-primary-900/50 p-4 rounded-lg mb-4">
                <p className="text-sm mb-2">Our team is ready to respond to your emergency:</p>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-primary-700 p-2 rounded">
                    <span className="block text-2xl font-bold">00</span>
                    <span className="text-xs">Hours</span>
                  </div>
                  <div className="bg-primary-700 p-2 rounded">
                    <span className="block text-2xl font-bold">45</span>
                    <span className="text-xs">Minutes</span>
                  </div>
                  <div className="bg-primary-700 p-2 rounded">
                    <span className="block text-2xl font-bold">00</span>
                    <span className="text-xs">Seconds</span>
                  </div>
                  <div className="bg-red-600 p-2 rounded">
                    <span className="block text-2xl font-bold">
                      <Phone className="h-5 w-5 mx-auto" />
                    </span>
                    <span className="text-xs">Call Now</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="bg-yellow-400 text-primary-900 rounded-full p-1 mr-3 mt-0.5">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold">45-Minute Response</h4>
                    <p className="text-sm opacity-80">We guarantee to arrive at your location within 45 minutes</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-yellow-400 text-primary-900 rounded-full p-1 mr-3 mt-0.5">
                    <Shield className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold">Licensed & Insured</h4>
                    <p className="text-sm opacity-80">All our technicians are certified restoration professionals</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-yellow-400 text-primary-900 rounded-full p-1 mr-3 mt-0.5">
                    <Award className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold">Insurance Approved</h4>
                    <p className="text-sm opacity-80">We work directly with all major insurance companies</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex justify-center mt-4 gap-3">
              <div className="bg-white/20 p-2 rounded">
                <Image src="/generic-certification-seal.png" alt="IICRC Certified" width={80} height={40} />
              </div>
              <div className="bg-white/20 p-2 rounded">
                <Image src="/abstract-restoration-symbol.png" alt="Restoration Association" width={80} height={40} />
              </div>
              <div className="bg-white/20 p-2 rounded">
                <Image src="/round-the-clock-help.png" alt="24/7 Service" width={80} height={40} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
