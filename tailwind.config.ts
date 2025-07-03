import type { Config } from "tailwindcss";
const { addDynamicIconSelectors } = require("@iconify/tailwind");

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        mobile: { max: "599px" },
        tablet: { min: "600px", max: "799px" },
        desktop: { min: "800px", max: "1199px" },
      },
      // colors: {
      //   background: "var(--background)",
      //   foreground: "var(--foreground)",
      // },
    },
  },
  flyonui: {
    themes: [
      {
        light: {
          ...require("flyonui/src/theming/themes")["light"],
          background: "#ffffff",
          primary: "#0d699f",
          secondary: "#0d0d0d",
          accent: "#3a3a3a",
          neutral: "#e8e8e8",
          "--input": "#ffffff",
          "--popup": "#ffffff",
          "--border": "#d9dee1",
          "--crossHair": "#0d699f",
          "--text-button": "#3a3a3a",
          "--animated-skeleton": "#ffffff",
        },
      },
      {
        dark: {
          ...require("flyonui/src/theming/themes")["dark"],
          background: "#1a2029",
          primary: "#0d699f",
          secondary: "#ffffff",
          accent: "#ffffff",
          neutral: "#13181f",
          "--input": "#1a2029",
          "--popup": "#1a2029",
          "--border": "#3d444e",
          "--crossHair": "#0d699f",
          "--text-button": "#ffffff",
          "--animated-skeleton": "#1c232db0",
        },
      },
    ],
    base: true,
    styled: true,
    utils: true,
    vendors: true,
    logs: true,
    themeRoot: ":root",
  },
  darkMode: ["class", '[data-theme="dark"]'],
  plugins: [
    require("flyonui"),
    require("flyonui/plugin"),
    addDynamicIconSelectors(),
  ],
} satisfies Config;
