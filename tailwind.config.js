/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "custom-yellow": "#EACD2C",
        "custom-gold": "#FEE035",
      },
    },
  },
  plugins: [daisyui],
};
