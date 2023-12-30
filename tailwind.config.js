/** @type {import('tailwindcss').Config} */
import { _home  } from './src/controller/data';



const home = _home 

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
      
      fontFamily: {
        sans : ['Inter', 'sans']
      },
      height: {
        'banner-home-h': [home.banners.size.height],
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
      }
    },
    
  },
  plugins: [],
}
