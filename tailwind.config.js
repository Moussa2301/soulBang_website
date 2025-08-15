/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8B5CF6",
        secondary: "#EC4899",
        dark: "#1F2937",
        light: "#F3F4F6",
        "gray-800":"#1F2937",
        "gray-900":"#111827"
      },
      fontFamily: { sans: ["Urbanist", "System"] }
    }
  },
  plugins: []
};