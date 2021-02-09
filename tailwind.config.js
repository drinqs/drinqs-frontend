/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...require('tailwindcss/colors'),
      primary: 'rgb(222, 126, 126)',
      'primary-dark': 'rgb(217, 95, 104)',
      secondary: 'rgb(43, 30, 112)',
      'secondary-lighter': 'rgb(54, 37, 141)',
      'secondary-light': 'rgb(179, 171, 188)',
      'secondary-dark': 'rgb(34, 25, 82)',
    },
    extend: {
      screens: {
        '3xs': '320px',
        '2xs': '375px',
        xs: '420px',
      },
      minWidth: {
        16: '4rem',
        20: '5rem',
        24: '6rem',
        28: '7rem',
        32: '8rem',
        48: '12rem',
      },
      maxWidth: {
        16: '4rem',
        20: '5rem',
        24: '6rem',
        28: '7rem',
        32: '8rem',
        48: '12rem',
      },
      boxShadow: {
        'underline-primary': '0 3px 0 rgb(255, 39, 115)',
        'underline-secondary': '0 3px 0 rgb(43, 30, 112)',
      },
      width: {
        fit: 'fit-content',
      },
      height: {
        fit: 'fit-content',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
