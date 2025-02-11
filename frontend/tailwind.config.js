/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        funky: ["FunkyChony", "sans-serif"],
      },
      boxShadow: {
        'dot': '0 0 6px 2px rgba(52,211,153,0.3)',
      },
      keyframes: {
        rainbow: {
          '0%': { backgroundColor: '#ef4444' }, // red
          '16%': { backgroundColor: '#f97316' }, // orange
          '32%': { backgroundColor: '#eab308' }, // yellow
          '48%': { backgroundColor: '#22c55e' }, // green
          '64%': { backgroundColor: '#3b82f6' }, // blue
          '80%': { backgroundColor: '#8b5cf6' }, // indigo
          '100%': { backgroundColor: '#ec4899' }, // pink
        },
        feather: {
          '0%, 100%': { 
            transform: 'scale(1)',
            opacity: '0.7'
          },
          '50%': { 
            transform: 'scale(1.4)', 
            opacity: '0.3'
          },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSlow: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.7' },
        },
      },
      animation: {
        'rainbow-pulse': 'rainbow 4s ease infinite',
        'feather-pulse': 'feather 3s ease-in-out infinite',
        fadeIn: 'fadeIn 1s ease-out forwards',
        slideInLeft: 'slideInLeft 1s ease-out forwards',
        slideInRight: 'slideInRight 1s ease-out forwards',
        pulseSlow: 'pulseSlow 3s infinite',
      },
    },
  },
  plugins: [],
};
