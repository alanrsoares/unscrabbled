/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      fontFamily: {
        display: "'Saira Stencil One', cursive",
      },
      animation: {
        "appear-1": "fade-in-down 1s ease",
        "appear-2": "fade-in 0.3s ease",
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        "fade-in-down": {
          "0%": {
            opacity: 0,
            transform: "translateY(-25vh)",
          },
          "66%": {
            transform: "translateY(0)",
          },
          "100%": {
            opacity: 1,
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
