/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/templates/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        circle: 'linear-gradient(330deg, rgba(0,0,5,0) 13%, rgba(0,2,3,1) 86%)',
        'white-to-tramsp':
          'linear-gradient(0deg, rgba(255,255,255,1) 10%, rgba(0,0,0,0) 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'arial', 'Times New Roman'],
      },
      animation: {
        fadeIn: 'fadeIn 1s',
        fadeOut: 'fadeOut 1s',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        fadeOut: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
