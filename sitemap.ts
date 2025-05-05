import type { MetadataRoute } from "next"

// Sample locations - in production, these would come from your database
const locations = [
  { city: "Toronto", state: "ON" },
  { city: "Vancouver", state: "BC" },
  { city: "Calgary", state: "AB" },
  { city: "Montreal", state: "QC" },
]

// Sample services - in production, these would come from your database
const services = [
  { slug: "water-damage-restoration", name: "Water Damage Restoration" },
  { slug: "fire-damage-restoration", name: "Fire Damage Restoration" },
  { slug: "mold-remediation", name: "Mold Remediation" },
  { slug: "storm-damage-restoration", name: "Storm Damage Restoration" },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.rapidresponserestoration.com"

  // Base pages
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]

  // Service pages
  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }))

  // Location pages
  const locationRoutes = locations.map((location) => ({
    url: `${baseUrl}/locations/${location.city.toLowerCase()}-${location.state.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }))

  // Location + Service pages (for maximum local SEO)
  const locationServiceRoutes = locations.flatMap((location) =>
    services.map((service) => ({
      url: `${baseUrl}/locations/${location.city.toLowerCase()}-${location.state.toLowerCase()}/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  )

  return [...routes, ...serviceRoutes, ...locationRoutes, ...locationServiceRoutes]
}
