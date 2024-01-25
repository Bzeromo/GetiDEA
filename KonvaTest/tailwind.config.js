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
    colors:{
      'main': '#6AA2B8',
      'side' : '#F4F9FA',
      'red': '#9b111e',
      'yellow': '#FFFF00',
      'blue': '#006AFF',
      'white': '#FFFFFF',
      'black': '#000000',
      'light_gray': '#CCCCCC',
      'line_gray': '#D7D7DB',
      'gradient_color' : '#8AAEC9',
      
    }
  },
  plugins: [],
}

