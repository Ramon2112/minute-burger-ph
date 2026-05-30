/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mb: {
          red: '#E30613',
          yellow: '#FFC72C',
          orange: '#FF6B00',
          dark: '#1C1917',
          light: '#FAFAFA'
        }
      },
      fontFamily: {
        heading: ['Lilita One', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
