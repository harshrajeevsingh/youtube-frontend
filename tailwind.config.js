// const { nextui } = require("@nextui-org/react");
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#EDEDED",
            foreground: "#0a0a0a",
            primary: {
              background: "#F1F1F1", // #0466c8
              foreground: "#F1F1F1", // #112A46
              DEFAULT: "#006FEE", // #F5A524
            },
          },
        },
        dark: {
          colors: {
            background: "#0a0a0a",
            foreground: "#EDEDED",
            primary: {
              background: "#0F0F0F",
              foreground: "#F1F1F1",
              DEFAULT: "#006FEE", //#272727 #006FEE
            },
          },
        },
      },
    }),
  ],
};
