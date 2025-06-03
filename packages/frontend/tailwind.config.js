/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        '1/3': '33.333333%',
      },
      height: {
        full: '100%',
      },
      colors: {
        primary: '#4F46E5', // Indigo-600
        secondary: '#0EA5E9', // Sky-500
        accent: '#8B5CF6', // Violet-500
        neutral: '#F3F4F6', // Gray-100
        'light-bg': '#FFFFFF',
        'light-text': '#1F2937', // Gray-800
      },
      borderRadius: {
        'xl': '1rem',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('@tailwindcss/typography')],
}
