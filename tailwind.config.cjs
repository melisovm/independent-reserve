/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      primary: '#0F66BD',
      white: '#ffffff',
      'blue-light': '#ECF5FF',
      'alert-orange': '#FE9A01',
      grey: {
        100: '#6B7176',
        200: '#F7F8F9',
        300: '#D3D4D8',
      },
    }
  },
  plugins: [],
}
