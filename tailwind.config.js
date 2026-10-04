/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'apple-blue': '#0071e3',
        'apple-link': '#0066cc',
        'apple-link-dark': '#2997ff',
        'apple-light': '#f5f5f7',
        'apple-dark': '#1d1d1f',
        'apple-black': '#000000',
        'apple-gray': 'rgba(0, 0, 0, 0.8)',
        'apple-gray-light': 'rgba(0, 0, 0, 0.48)',
        'apple-surface-1': '#272729',
        'apple-active': '#ededf2',
      },
      fontFamily: {
        'sf-display': ['"SF Pro Display"', '"SF Pro Icons"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        'sf-text': ['"SF Pro Text"', '"SF Pro Icons"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        'pill': '980px',
      },
      boxShadow: {
        'apple-card': 'rgba(0, 0, 0, 0.22) 3px 5px 30px 0px',
      }
    },
  },
  plugins: [],
}
