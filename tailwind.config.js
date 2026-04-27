// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#F97316",
          dark:    "#EA580C",
          light:   "#FB923C",
        },
      },
      animation: {
        "slide-in":  "slideIn 0.25s ease forwards",
        "fade-up":   "fadeUp 0.2s ease forwards",
        "modal-in":  "modalIn 0.2s ease forwards",
      },
      keyframes: {
        slideIn: { from:{ opacity:"0", transform:"translateX(20px)" }, to:{ opacity:"1", transform:"translateX(0)" } },
        fadeUp:  { from:{ opacity:"0", transform:"translateY(8px)" },  to:{ opacity:"1", transform:"translateY(0)" } },
        modalIn: { from:{ opacity:"0", transform:"scale(0.95)" },      to:{ opacity:"1", transform:"scale(1)" } },
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};
