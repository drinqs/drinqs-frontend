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
      'light-purple': 'rgb(179, 171, 188)',
      'medium-purple': 'rgb(104, 88, 121)',
      'dark-purple': 'rgb(43, 30, 112)',
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
