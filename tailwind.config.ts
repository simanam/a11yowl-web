import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        owl: {
          accent: "#c93a30",
          "accent-hover": "#a83228",
          danger: "#DC2626",
          "danger-bg": "#FEF2F2",
          warning: "#D97706",
          "warning-bg": "#FFFBEB",
          success: "#059669",
          "success-bg": "#ECFDF5",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
