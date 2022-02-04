module.exports = {
  mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./pages/**/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // './node_modules/react-toastify/dist/ReactToastify.css'
  ],
  theme: {
    extend: {
      margin: {
        '50vw': '50vw',
        'm2vw': '-2vw'
      }
    },
  },
  plugins: [],
}