import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./src/**.{ts,tsx,js,jsx}"],
  theme: { extend: {} },
  tailwindFunctions: ["tv"],
} as Config;
