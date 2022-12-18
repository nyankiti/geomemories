/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './libs/editor/geomBlock.ts',
  ],
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
};
