export default {
  darkMode: ["class"],
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent:  "#6f0414",
        "accent-soft": "rgba(111,4,20,0.20)",
        "accent-glow": "rgba(111,4,20,0.45)",
        "card-border": "rgba(255,255,255,0.09)",
        muted: "rgba(255,255,255,0.60)",
        // keep compat aliases
        portfolioTheme: {
          primary:    "#6f0414",
          secondary:  "#0a0a0a",
          accent:     "#6f0414",
          cardBg:     "#0d0d0d",
          textMain:   "#ffffff",
          textAccent: "rgba(255,255,255,0.60)",
        },
      },
      fontFamily: {
        sans:    ["Geist","Arial","sans-serif"],
        heading: ["Geist","Arial","sans-serif"],
        body:    ["Arial","Helvetica","sans-serif"],
      },
      borderRadius: { lg: "0.75rem", md: "0.6rem", sm: "0.4rem" },
      boxShadow: {
        "glow-red": "0 0 24px rgba(111,4,20,0.50)",
        "glow-red-sm": "0 0 12px rgba(111,4,20,0.35)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
