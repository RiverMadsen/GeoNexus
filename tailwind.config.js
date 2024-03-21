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
    fontFamily: {
      'sans': [ 'Helvetica','Arial', 'sans-serif'],
    },
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
        'nex-blue': 'hsl(190, 100%, 50%)',
        'nex-green': 'hsl(80, 100%, 50%)',
        'nex-red': 'hsl(320, 100%, 50%)',
        'nex-yellow': 'hsl(54, 100%, 50%)',
        'nex-orange': 'hsl(32, 100%, 50%)',
        'nex-purple': 'hsl(290, 100%, 53%)',
        'nex-white': 'hsl(0, 100%, 100%)',
        'nex-dark-white': 'hsl(0, 0%, 80%)',
        'nex-gray': 'hsl(0, 0%, 50%)',
        'nex-dark-gray': 'hsl(0, 0%, 30%)',
      },
    },
  },
  variants: {
    extend: {

    },
  },
  plugins: [],
}