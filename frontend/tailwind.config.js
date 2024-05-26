/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          my: '#E5A9CD',
        },
        grey: {
          mylight:'#D9D9D9',
          mydark: '#C5C5C5',
        }
      },
      flex: {
        '45': '0 0 45%'
      }
    },
  },
  plugins: [],
}