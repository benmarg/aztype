import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#262a33",
        subprimary: "#526777",
        secondary: "#43ffaf",
        error: "#ff5f5f",
        textcolor: "#e5f7ef",
      },
      fontFamily: {
        sans: ["Roboto Mono", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
