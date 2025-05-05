import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "Rapid Restore Ontario | 24/7 Emergency Water, Fire & Mold Damage Services",
  description:
    "Professional restoration services for water damage, fire damage, mold remediation, and storm damage with guaranteed 45-minute response time. Available 24/7 across Ontario.",
  keywords:
    "water damage restoration, fire damage repair, mold remediation, storm damage restoration, emergency restoration services, 24/7 restoration, ontario restoration, rapid restore ontario",
  openGraph: {
    title: "Rapid Restore Ontario | 24/7 Emergency Restoration Services",
    description:
      "Professional restoration services for water damage, fire damage, mold remediation, and storm damage with guaranteed 45-minute response time.",
    url: "https://www.rapidrestoreontario.com",
    siteName: "Rapid Restore Ontario",
    images: [
      {
        url: "https://www.rapidrestoreontario.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rapid Restore Ontario Services",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
