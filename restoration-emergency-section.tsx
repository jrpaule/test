import { RestorationEmergencySystem } from "./restoration-emergency-system"

export function RestorationEmergencySection() {
  return (
    <section className="w-full py-12 md:py-24 bg-white" id="emergency-services">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-800">
              24/7 Emergency Response
            </div>
            <h2
              className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#003366]"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Immediate Restoration Services
            </h2>
            <p
              className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
              style={{ fontFamily: "Open Sans, sans-serif" }}
            >
              Water, fire, mold, and storm damage restoration with guaranteed 45-minute response time
            </p>
          </div>
        </div>

        <RestorationEmergencySystem />
      </div>
    </section>
  )
}
