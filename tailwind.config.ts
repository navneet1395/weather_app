import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/component/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "wind-light": "moveWind 20s linear infinite",
        "wind-gentle": "moveWind 16s linear infinite",
        "wind-moderate": "moveWind 12s linear infinite",
        "wind-fresh": "moveWind 8s linear infinite",
        "wind-strong": "moveWind 4s linear infinite",
      },
      keyframes: {
        moveWind: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "100% 100%" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
