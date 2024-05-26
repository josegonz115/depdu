/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'inter': ['Inter'],
    },
    extend: {
      boxShadow: {
        'glow-yellow': '0 4px 6px rgba(255, 223, 0, 0.7), 0 10px 20px rgba(255, 223, 0, 0.7), 0 15px 40px rgba(255, 223, 0, 0.7)',
      }
    },
  },
  plugins: [],
}