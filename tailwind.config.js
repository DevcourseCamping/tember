/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  safelist: [
    'translate-y-full',
    'translate-y-0',
    'transition-transform',
    'duration-500',
    'ease-in-out',
  ],
  theme: {
    extend: {
      fontFamily: {
        postNoBills: ['PostNoBillsJaffna'],
      },
      translate: {
        full: '100%',
      },
    },
  },
  plugins: [],
}
