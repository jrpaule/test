import Image from "next/image"
import Link from "next/link"
import { brandConfig } from "@/lib/brand-config"

interface LogoProps {
  variant?: "default" | "white" | "compact"
  size?: "sm" | "md" | "lg"
  withTagline?: boolean
}

export function Logo({ variant = "default", size = "md", withTagline = false }: LogoProps) {
  const logoSrc = variant === "white" ? "/logo-white.png" : variant === "compact" ? "/logo-icon.png" : "/logo.png"

  const logoAlt = `${brandConfig.company.name} logo`

  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
  }

  return (
    <div className="flex flex-col items-start">
      <Link href="/" className="flex items-center">
        <div className={`relative ${sizeClasses[size]} aspect-auto`}>
          <Image
            src={logoSrc || "/placeholder.svg"}
            alt={logoAlt}
            width={size === "lg" ? 240 : size === "md" ? 200 : 160}
            height={size === "lg" ? 48 : size === "md" ? 40 : 32}
            priority
          />
        </div>
      </Link>

      {withTagline && (
        <span className={`text-xs ${variant === "white" ? "text-white/80" : "text-gray-600"} mt-1`}>
          {brandConfig.company.tagline}
        </span>
      )}
    </div>
  )
}
