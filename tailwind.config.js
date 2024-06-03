const flowbite = require("flowbite-react/tailwind");
import("tailwindcss").Config;
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        gistesy: ["gistesy", "cursive"],
        blackline: ["blackline", "cursive"],
      },
    },
  },
  plugins: [flowbite.plugin()],
};
