/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        limestone: "#f7f3ee",
        sand: "#e8dfd2",
        clay: "#d8c8b8",
        copper: "#b87a4b",
        charcoal: "#2b2b2b",
      },
      borderRadius: {
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
};
