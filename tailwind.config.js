const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./pages/**/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    './node_modules/react-toastify/dist/ReactToastify.min.css'
  ],
  theme: {
    screens: {
      'xsm': '390px',
      ...defaultTheme.screens,
    },
    extend: {
      margin: {
        '50vw': '50vw',
        'm2vw': '-2vw'
      },
    },
  },
  plugins: [],
}