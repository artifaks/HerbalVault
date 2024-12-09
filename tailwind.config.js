/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8f7e9',
          100: '#f4efc4',
          200: '#eee39f',
          300: '#e8d77a',
          400: '#e2cb55',
          500: '#dcbf30', // gold
          600: '#b39926',
          700: '#8a731d',
          800: '#614c13',
          900: '#38260a',
        },
        accent: {
          50: '#ecfdf4',
          100: '#c9f2de',
          200: '#a6e7c8',
          300: '#83dbb2',
          400: '#60d09c',
          500: '#3dc586', // green
          600: '#319e6b',
          700: '#257750',
          800: '#195036',
          900: '#0c291b',
        },
      },
    },
  },
  plugins: [],
};