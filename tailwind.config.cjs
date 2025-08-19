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
    animatedSettings: {
      animatedSpeed: 1000,
      heartBeatSpeed: 500,
      hingeSpeed: 2000,
      bounceInSpeed: 750,
      bounceOutSpeed: 750,
      animationDelaySpeed: 500,
      classes: ["bounce", "heartBeat"],
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    // @ts-ignore
    require("tailwindcss-animatecss"),
  ],
};
