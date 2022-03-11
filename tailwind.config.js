const defaultTheme = require('tailwindcss/defaultTheme')
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
      'xs': '360px',
      ...defaultTheme.screens,
    },
    extend: {
      margin: {
        '350': '350px',
        'm2vw': '-2vw'
      },
      width: {
        '1/2': '50%',
        '2/3': '90%',
      },
      height: {
        '40vh': '40vh',
        '128': '28rem',
        '138': '38rem',
      },
      left: {
        '1/2': '35%',
      },
      bottom: {
        '10': '45vh'
      }
    },
  },
  plugins: [],
}