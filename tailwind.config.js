/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darik: {
          50: '#FBF8F2',
          100: '#F5EEDB',
          200: '#EBD9B4',
          300: '#DFC086',
          400: '#D4A859',
          500: '#C88A36', // Primary Gold Accent
          600: '#A96E25',
          700: '#7E4F18',
          800: '#3D2411',
          900: '#23140A',
          950: '#0E0704', // Deep Rich Roast
        },
        espresso: {
          dark: '#0E0906',
          base: '#180F0A',
          card: '#1F130C',
          border: '#331F14',
          hover: '#2A1A10',
          light: '#3D2517',
        },
        gold: {
          brand: '#C88A36',
          light: '#E5B268',
          dark: '#9A6218',
          subtle: 'rgba(200, 138, 54, 0.15)',
        },
        cream: {
          pure: '#FFFFFF',
          soft: '#FAF6F0',
          muted: '#E6DCCD',
          card: '#F6EFE6',
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        signature: ['var(--font-signature)', 'Alex Brush', 'cursive'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        ethiopic: ['var(--font-ethiopic)', 'Noto Sans Ethiopic', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'steam': 'steam 3s ease-in-out infinite alternate',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        steam: {
          '0%': { opacity: '0.4', transform: 'translateY(0) scaleX(1)' },
          '100%': { opacity: '0.8', transform: 'translateY(-12px) scaleX(1.15)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
};
