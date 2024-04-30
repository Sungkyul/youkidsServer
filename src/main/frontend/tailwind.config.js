/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neutral: {
          100: "#F5F5F5",
          900: "#111111",
        },
        stone: {
          300: "#bdbdbd",
        },
        emerald: {
          200: "#B5D8CB",
        },
        slate: {
          500: "#6490B1",
        },
      },
    },
  },
  plugins: [],
};
