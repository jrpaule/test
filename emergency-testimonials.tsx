import { Star, Quote } from "lucide-react"
import Image from "next/image"

export function EmergencyTestimonials() {
  const testimonials = [
    {
      name: "John Doe",
      location: "Toronto, ON",
      image: "/thoughtful-gaze.png",
      quote:
        "They arrived in just 35 minutes after our basement flooded at 2 AM. The team was professional and worked quickly to minimize the damage. Saved us thousands in repairs!",
      rating: 5,
      service: "Water Damage",
      responseTime: "35 minutes",
    },
    {
      name: "Sarah Johnson",
      location: "Ottawa, ON",
      image: "/serene-gaze.png",
      quote:
        "After a kitchen fire, I was devastated. Rapid Restore Ontario arrived quickly and helped me through the entire process. Their emergency response was incredible.",
      rating: 5,
      service: "Fire Damage",
      responseTime: "42 minutes",
    },
    {
      name: "Michael Williams",
      location: "Hamilton, ON",
      image: "/contemplative-gaze.png",
      quote:
        "Storm damage left our roof exposed during a rainstorm. Their team arrived quickly with temporary tarps and started repairs immediately. True emergency service!",
      rating: 5,
      service: "Storm Damage",
      responseTime: "40 minutes",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-primary font-heading">Emergency Response Success Stories</h2>
          <p className="max-w-2xl mx-auto text-gray-600 font-body">
            See how our rapid emergency response has helped Ontario homeowners minimize damage and stress during
            disasters.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 relative">
              <div className="absolute top-6 right-6 text-red-600">
                <Quote className="h-12 w-12 opacity-20" />
              </div>

              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg font-heading">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 font-body">{testimonial.location}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex mb-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="flex items-center text-sm">
                  <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs font-bold">
                    {testimonial.service}
                  </span>
                  <span className="mx-2">•</span>
                  <span className="text-green-700 font-medium text-xs">Response time: {testimonial.responseTime}</span>
                </div>
              </div>

              <p className="text-gray-700 font-body">"{testimonial.quote}"</p>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-primary-600 font-medium">Emergency restoration completed successfully</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-yellow-100 border border-yellow-200 rounded-lg px-6 py-3">
            <p className="text-yellow-800 font-medium">
              Average emergency response time: <span className="font-bold">39 minutes</span> across Ontario
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
