/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [".**/*.{html,js}"],
  darkMode: 'media',
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
    },
    screens: {
      'sm': '640px',      // Small screens like smartphones
      'md': '768px',      // Medium screens like tablets
      'lg': '1024px',     // Large screens like laptops
      'xl': '1280px',     // Extra-large screens like desktops
      '2xl': '1536px',    // Larger desktop screens
    },
  },
  plugins: [],
}

