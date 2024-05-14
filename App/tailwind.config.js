/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        aquamarine: {
          50: "#eefdfc",
          100: "#d5f8f7",
          200: "#aff2f1",
          300: "#78e8e8",
          400: "#58dadc",
          500: "#1eb8bc",
          600: "#1c949e",
          700: "#1d7781",
          800: "#20616a",
          900: "#1f515a",
          950: "#0f353d",
        },
      },
    },
  },
  plugins: [],
};
