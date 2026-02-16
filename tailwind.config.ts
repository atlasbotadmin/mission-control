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
        background: "#0a0a0a",
        card: "#141414",
        border: "#252525",
        accent: "#0080FF",
        status: "#00d4aa",
        idle: "#F59E0B",
        text: "#ededed",
        muted: "#888",
      },
    },
  },
  plugins: [],
};
export default config;
