import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "var(--background)",
        },
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
        },
        border: {
          DEFAULT: "var(--border)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
