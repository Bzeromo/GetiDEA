/** @type {import('tailwindcss').Config} */

const { join } = require('path');

module.exports = {
  content: [ "./src/**/*.{html, js, tsx, jsx, ts}",
 
  join(__dirname, 'src/**/*.{js,ts,jsx,tsx}'),
],
  theme: {
    patterns: {
      opacities: {
          100: "1",
          80: ".80",
          60: ".60",
          40: ".40",
          20: ".20",
          10: ".10",
          5: ".05",
      },
      sizes: {
          1: "0.25rem",
          2: "0.5rem",
          4: "1rem",
          6: "1.5rem",
          8: "2rem",
          16: "4rem",
          20: "5rem",
          24: "6rem",
          32: "8rem",
      }
  },
    extend: {
      fontFamily: {
        inter:['Inter'],
        Nanum:['NanumSquare'],
      },
    },
  },
  plugins: [],
}

