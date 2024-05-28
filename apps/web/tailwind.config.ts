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
        "image1": "url('https://assets.orluna.com/uploads/2021/02/desktop_orluna.jpg')"
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
      dark: "#1c1c20",
    },
  },
  plugins: [],
};
export default config;
