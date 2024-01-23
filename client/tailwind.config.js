/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xsm: '270px',
      sm : '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      colors: {
        brightBlue: 'hsl(245, 60%, 33%)',
        brightBlueLight: 'hsl(210, 100%, 60%)',
        brightRedSupLight: 'hsl(12, 88%, 95%)',
        darkBlue: 'hsl(228, 39%, 23%)',
        darkGrayisBlue: 'hsl(227, 12%, 61%)',
        veryDarkBlue: 'hsl(223, 12%, 13%)',
        veryPaleRed: 'hsl(13, 100%, 96%)',
        lightGray: 'hsl(218, 11%, 65%)',

      }
    },
  },
  plugins: [],
}

