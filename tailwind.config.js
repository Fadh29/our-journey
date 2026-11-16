/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        blush: {
          50: '#fdf8f9',
          100: '#fceef2',
          200: '#f9dee6',
          300: '#f4c3d1',
          400: '#ea9db3',
          500: '#dc7493',
          600: '#c55273',
          700: '#a63e5b',
          800: '#8b364e',
          900: '#753144',
        },
        champagne: {
          50: '#fbf9f5',
          100: '#f7f2e8',
          200: '#ede2ce',
          300: '#e1cea9',
          400: '#d3b57f',
          500: '#c59f5e',
          600: '#b4884c',
          700: '#966d3f',
          800: '#7a5737',
          900: '#654830',
        },
        dusty: {
          100: '#f3e8eb',
          200: '#e4ccd2',
          300: '#cfabb5',
          400: '#b88594',
          500: '#a36777',
          600: '#8b5160',
          700: '#72404e',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(220, 116, 147, 0.08)',
        'soft-lg': '0 15px 40px rgba(220, 116, 147, 0.12)',
        'polaroid': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        }
      }
    },
  },
  plugins: [],
}
