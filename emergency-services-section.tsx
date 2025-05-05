import { Droplet, Flame, AlertTriangle, Wind, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { brandConfig } from "@/lib/brand-config"

export function EmergencyServicesSection() {
  const emergencyServices = [
    {
      icon: Droplet,
      title: "Water Damage",
      description: "Flooding, burst pipes, sewage backups, or any water-related damage",
      responseTime: "45 minutes",
      color: "bg-blue-100 text-blue-700",
      iconColor: "text-blue-500",
    },
    {
      icon: Flame,
      title: "Fire Damage",
      description: "Fire, smoke, or soot damage to your property",
      responseTime: "60 minutes",
      color: "bg-red-100 text-red-700",
      iconColor: "text-red-500",
    },
    {
      icon: AlertTriangle,
      title: "Mold Remediation",
      description: "Mold growth or suspected mold issues",
      responseTime: "24 hours",
      color: "bg-green-100 text-green-700",
      iconColor: "text-green-500",
    },
    {
      icon: Wind,
      title: "Storm Damage",
      description: "Damage from storms, wind, hail, or fallen trees",
      responseTime: "90 minutes",
      color: "bg-purple-100 text-purple-700",
      iconColor: "text-purple-500",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-800 mb-4">
            24/7 EMERGENCY RESPONSE
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary font-heading">
            Emergency Restoration Services
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 md:text-lg font-body">
            When disaster strikes, every minute counts. Our emergency response teams are ready 24/7 to minimize damage
            and start the restoration process.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {emergencyServices.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={index}
                className="border-t-4 hover:shadow-lg transition-shadow flex flex-col"
                style={{ borderTopColor: service.iconColor }}
              >
                <CardHeader className={`${service.color} rounded-t-lg`}>
                  <div className="flex justify-between items-center">
                    <Icon className={`h-8 w-8 ${service.iconColor}`} />
                    <div className="bg-white text-primary-800 text-xs font-bold px-2 py-1 rounded">
                      {service.responseTime} response
                    </div>
                  </div>
                  <CardTitle className="text-xl mt-2 font-heading">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 flex-grow">
                  <p className="text-gray-600 font-body">{service.description}</p>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    <Phone className="mr-2 h-4 w-4" />
                    Call For {service.title}
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="max-w-3xl mx-auto bg-primary-50 border border-primary-100 rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4 text-primary font-heading">Need Emergency Restoration Services?</h3>
            <p className="mb-6 text-gray-700 font-body">
              Don't wait! Water damage gets worse by the minute. Our emergency teams are standing by 24/7 to respond to
              your call.
            </p>
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6 font-bold">
              <Phone className="mr-2 h-5 w-5" />
              CALL NOW: {brandConfig.company.phone}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
