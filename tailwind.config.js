/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F59E0B",
        secondary: "#451A03",
        accent: "#10B981",
      },
    },
  },
  plugins: [],
}
