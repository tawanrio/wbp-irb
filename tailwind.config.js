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
        'custom-arrow':
          "url(\"data:image/svg+xml,<svg height='10px' width='10px' viewBox='0 0 16 16' fill='%23000000' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>\")",
      },
      fontFamily: {
        sans: ['Inter', 'arial', 'Times New Roman', 'Libre Baskerville'],
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
