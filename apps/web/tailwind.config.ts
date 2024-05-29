import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-linear": "linear-gradient(rgba(0, 0,0, 40%), transparent)",
        image1:
          "url('https://assets.orluna.com/uploads/2021/02/desktop_orluna.jpg')",
      },
      keyframes: {
        fadein: {
          "0%": {
            visibility: "hidden",
            opacity: "0",
          },
          "1%": {
            visibility: "visible",
            opacity: "0",
          },
          "100%": {
            visibility: "visible",
            opacity: "1",
          },
        },
        fadeout: {
          "0%": {
            visibility: "visible",
            opacity: "1",
          },
          "99%": {
            visibility: "visible",
            opacity: "0",
          },
          "100%": {
            visibility: "hidden",
            opacity: "1",
          },
        },
      },
      animation: {
        "fade-in": "fadein 200ms ease-in-out forwards",
        "fade-out": "fadeout 200ms ease-in-out forwards",
      },
      transformOrigin: {
        mid: "3px 2px",
      },
    },
    screens: {
      sm: "640px",
      md: "780px",
      lg: "1024px",
      xl: "1480px",
    },
    colors: {
      accent: "#ff8c74",
      white: "white",
      yellow: "yellow",
      grey: "#46474a",
      dark: "#1c1c20",
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      select: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
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
  },
  plugins: [],
};
export default config;
