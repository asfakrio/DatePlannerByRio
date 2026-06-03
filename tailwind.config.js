/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pinkAccent: "#ff4f8b",
        pinkHover: "#e03b73",
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Lora", "serif"],
        sans: ["Inter", "Outfit", "sans-serif"],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      }
    },
  },
  plugins: [],
}

