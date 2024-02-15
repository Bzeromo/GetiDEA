/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
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
        poppins: ['Poppins' ],
        IBM : ['IBM Plex Sans KR', 'sans-serif'],
        inter:['Inter'],
        Nanum:['NanumSquare'],
        NanumGothic:['Nanum Gothic', 'sans-serif'],
        'black-han-sans': ['"Black Han Sans"', 'sans-serif'], // 폰트 이름과 폴백 지정
     
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
      'gray' : '#888888',
      'light_gray': '#CCCCCC',
      'line_gray': '#D7D7DB',
      'template_gray' : '#E5E5E5',
      'gradient_color' : '#8AAEC9',
      
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
      },
      slideDown: {
        '0%': { opacity: '0', transform: 'translateY(20px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
    },
    animation: {
      fadeIn: 'fadeIn 0.5s ease-out forwards',
      'slide-down': 'slideDown 0.5s ease-out'
    },
  
  },
  plugins: [],
}

