/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins' ],
      },
    },
    colors:{
      'main': '#6AA2B8',
      'side' : '#F4F9FA',
      'red': '#9b111e',
      'yellow': '#FFFF00',
      'white': '#FFFFFF',
      'gradient_color' : '#8AAEC9',
      
    }
  },
  plugins: [],
}

