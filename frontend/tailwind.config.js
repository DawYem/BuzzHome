/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#003057',
          dark: '#001a33',
          800: '#002040',
          light: '#004d8a',
        },
        gold: {
          DEFAULT: '#B3A369',
          bright: '#C9A227',
          light: '#EDD98A',
          dark: '#8a7a4f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 16px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 30px rgba(0,0,0,0.14)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #001a33 0%, #003057 50%, #002040 100%)',
      },
    },
  },
  plugins: [],
};
