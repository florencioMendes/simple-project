import type { Config } from "tailwindcss";

const config: Config = {
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
      },
      fontFamily: {
        Poppins : ["Poppins", "sans-serif"],
        Poppins_bold : ["Poppins-bold", "sans-serif"],
        Poppins_light : ["Poppins-light", "sans-serif"]
      }
    },
  },
  plugins: [],
};
export default config;
