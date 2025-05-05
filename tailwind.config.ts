import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Brand colors
        primary: {
          DEFAULT: "#2A5C82", // Ontario-themed blue
          50: "#EBF2F7",
          100: "#D7E5F0",
          200: "#AFCBE1",
          300: "#87B1D2",
          400: "#5F97C3",
          500: "#3A7DB4",
          600: "#2A5C82", // Base primary
          700: "#224B6A",
          800: "#1A3A53",
          900: "#12293B",
        },
        secondary: {
          DEFAULT: "#E57200", // Alert orange
          50: "#FFF2E5",
          100: "#FFE5CC",
          200: "#FFCB99",
          300: "#FFB166",
          400: "#FF9733",
          500: "#FF7D00",
          600: "#E57200", // Base secondary
          700: "#B25800",
          800: "#804000",
          900: "#4D2600",
        },
        accent: {
          DEFAULT: "#00843D", // Ontario green
          50: "#E5F5ED",
          100: "#CCEBDB",
          200: "#99D7B7",
          300: "#66C393",
          400: "#33AF6F",
          500: "#009B4B",
          600: "#00843D", // Base accent
          700: "#006B31",
          800: "#005225",
          900: "#003919",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        heading: ["'Roboto Condensed'", "sans-serif"],
        body: ["'Open Sans'", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
