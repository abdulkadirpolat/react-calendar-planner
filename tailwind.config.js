module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minHeight: {
         96: "24rem",
      },
      colors : {
        "gray-light" : "#F4F6F8",
        "gray1": "#98989E",
        "primary": "#3183FF",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
