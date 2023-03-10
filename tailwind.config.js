/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/screens/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontFamily: {
      main: ['Poppins'],
    },
    colors: {
      black: '#121212',
      white: '#FFFFFF',
      red: '#9B2C2C',
      primary: {
        light: '#58BCA8',
        main: '#53AC9A',
        dark: '#38786B',
      },
      secondary: {
        light: '#D2EBC1',
        main: '#99E36C',
        dark: '#78AE57',
      },
    },
    extend: {},
  },
  plugins: [],
};
