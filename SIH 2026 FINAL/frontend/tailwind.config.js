/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          bg: "#D5D8C5",
          card: "#E1E4D5",
          border: "#C2C6B2",
        },
        obsidian: "#181818",
        brand: {
          orange: "#F9771D",
          green: "#18B880",
          coral: "#CE6969",
        }
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
}