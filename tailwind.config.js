/** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        '100': '100',
        '1000': '1000',
        'max': '2147483647', // Highest possible z-index value
      },
      colors: {
        'primary': '#FF6B6B',
        'secondary': '#FFD166',
        'tertiary': '#06D6A0',
        'quaternary': '#118AB2',
        'quinary': '#073B4C',
        'grey': '#F5F5F5',
        'black': '#000000',
        'white': '#FFFFFF',
        'semitransparent': 'rgba(0, 0, 0, 0.5)',
      },
    },
  },
  variants: {
    extend: {

    },
  },
  plugins: [],
}