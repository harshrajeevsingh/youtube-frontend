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
      // themes: {
      //   light: {
      //     colors: {
      //       background: "#FFFFFF",
      //       foreground: "#11181C",
      //       primary: {
      //         background: "#FF7E3A", // #0466c8
      //         foreground: "#FFFFFF", // #112A46
      //         DEFAULT: "#F5A524", // #F5A524
      //       },
      //     },
      //   },
      //   dark: {
      //     colors: {
      //       background: "#11181C",
      //       foreground: "#FFFFFF",
      //       primary: {
      //         background: "#FF7E3A",
      //         foreground: "#FFFFFF",
      //         DEFAULT: "#FF7E3A",
      //       },
      //     },
      //   },
      // },
    }),
  ],
};
