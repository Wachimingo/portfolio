module.exports = {
  mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
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