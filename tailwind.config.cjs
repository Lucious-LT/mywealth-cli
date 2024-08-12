/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const config = withMT({
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],

  theme: {
    extend: {
      fontFamily: {
        qs: ["Quicksand"],
        nun: ["Nunito"],
        inter: ["Inter"],
        mono: ["Inconsolata"],
      },
      backgroundColor: {
        blackOverlay: "rgba(0, 0 ,0 ,0.3)",
      },
      colors: {
        primary: "#3B82F6",
        secondary: "#A78BFA",
        tertiary: "#A1A1AA",
        active: "#0D9488",
        activeBg: "#99F6E4",
        inactive: "#E11D48",
        inactiveBg: "#FECDD3",
        pending: "#D97706",
        pendingBg: "#FDE68A",
      },
      borderWidth: {
        1: "1px",
      },
      keyframes: {
        rotate: {
          "0%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "rotate(90deg)" },
          "0%": { transform: "rotate(0.0deg)" },
        },
        shimer: {
          "100%": { transform: " translateX(100%)" },
        },
      },
      animation: {
        "rotate-card": "rotate 2s linear",
        "skeleton-shimmer": "shimmer 3s infinite",
      },
      fontSize: {
        xxs: "0.5rem",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/forms")],
  darkMode: "class",
  daisyui: {
    themes: [
      // "light",
      // "dark",
      // "aqua",
      {
        mytheme: {
          /* your theme name */ primary: "#2563EB" /* Primary color */,
          "primary-focus": "#1E40AF" /* Primary color - focused */,
          "primary-content":
            "#DBEAFE" /* Background content color to use on primary color */,

          secondary: "#f6d860" /* Secondary color */,
          "secondary-focus": "#f3cc30" /* Secondary color - focused */,
          "secondary-content":
            "#E9E2FE" /* Background content color to use on primary color */,

          accent: "#37cdbe" /* Accent color */,
          "accent-focus": "#2aa79b" /* Accent color - focused */,
          "accent-content":
            "#E6F9F7" /* Background content color to use on primary color */,

          neutral: "#3d4451" /* Neutral color */,
          "neutral-focus": "#2a2e37" /* Neutral color - focused */,
          "neutral-content":
            "#F4F4F5" /* Background content color to use on primary color */,

          "base-100":
            "#ffffff" /* Base color of page, used for blank backgrounds */,
          "base-200": "#f9fafb" /* Base color, a little darker */,
          "base-300": "#d1d5db" /* Base color, even more darker */,
          "base-content":
            "#1f2937" /* Foreground content color to use on base color */,

          info: "#2094f3" /* Info */,
          "info-background":
            "#E4F2FE" /* Background content color to use on primary color */,

          success: "#22C55E" /* Success */,
          "success-background":
            "#A7F3D0" /* Background content color to use on primary color */,

          warning: "#ff9900" /* Warning */,
          "warning-background":
            "#FED7AA" /* Background content color to use on primary color */,

          error: "#ff5724" /* Error */,
          "error-background":
            "FFEAE4" /* Background content color to use on primary color */,
        },
      },
      // "dark"
    ],
    // themes: false,
    // themes: ["cupcake", "dark", "cmyk"],
    //themes: ["light", "dark"],
    // themes: [ "dark"],
  },
});

module.exports = config;
