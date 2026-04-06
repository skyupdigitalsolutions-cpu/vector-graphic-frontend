/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        ultra: ["Ultra", "serif"],
        unbounded: ["Unbounded", "sans-serif"],
        urbanist: ["Urbanist", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
      },
      animation: {
        marquee: "scroll-left 2s linear infinite",
      },
      keyframes: {
        "scroll-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};