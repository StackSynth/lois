/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0f1e',
        mint: '#2dd4bf',
        teal: '#0d9488',
        cloud: '#f8fafc',
      },
      boxShadow: {
        soft: '0 24px 80px rgba(10, 15, 30, 0.08)',
        glow: '0 0 50px rgba(45, 212, 191, 0.24)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
