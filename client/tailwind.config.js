/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#117FE2',
        secondary: '#f0f8fe',
        transparent: 'transparent',
      },
    },
  },
  plugins: [],
};
