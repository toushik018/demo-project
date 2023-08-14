/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [".**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#212F3D",
        "primary-color-light": "#020726",
        "primary-color-dark": "#010417",
      },
    },
    container: {
      center: true,
    }
  },
  plugins: [],
}

