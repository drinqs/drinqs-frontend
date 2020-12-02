export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Drinqs',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/stylesheets/app.scss',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  storybook: {
    stories: [
      '~/stories/**/*.stories.js',
    ],
    addons: [
      {
        name: '@storybook/addon-essentials',
        options: {
          actions: false,
          toolbars: false,
        },
      },
    ],
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/apollo',
  ],

  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || 'https://drinqs.de',
  },
  privateRuntimeConfig: {
  },

  apollo: {
    clientConfigs: {
      default: '~/apollo/default-config.js',
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },
};
