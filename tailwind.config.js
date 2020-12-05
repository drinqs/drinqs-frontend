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
      primary: 'rgb(255, 39, 115)',
      'primary-dark': 'rgb(250, 8, 93)',
      secondary: 'rgb(43, 30, 112)',
      'secondary-lighter': 'rgb(104, 88, 121)',
      'secondary-light': 'rgb(179, 171, 188)',
      'secondary-dark': 'rgb(34, 25, 82)',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-children'),
    require('@tailwindcss/forms'),
  ],
};
