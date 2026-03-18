/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8F0',
        caramel: '#C08552',
        brown: '#8C5A3C',
        darkBrown: '#4B2E2B',
      },
    },
  },
  plugins: [],
}
