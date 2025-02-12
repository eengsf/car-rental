import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        custom: {
          dark: "#000000",
          light: "#ffffff",
          strong: "#03045e",
          semiStrong: "#0078b7",
          medium:"#00b4d7",
          semiThin: "#91e0ef",
          thin: "#caf1f8",
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
