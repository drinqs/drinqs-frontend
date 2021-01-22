export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Drinqs',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      {
        rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png',
      },
      {
        rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest' },
    ],
  },

  loading: {
    color: 'rgb(43, 30, 112)',
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/stylesheets/app.scss',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '@/plugins/notification-plugin', mode: 'client' },
    { src: '@/plugins/vue-clipboard', mode: 'client' },
    { src: '@/plugins/vuelidate' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/html-validator',
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
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || 'https://drinqs.de',
    graphQLEndpoint: process.env.GQL_ENDPOINT || 'https://app.drinqs.de/graphql',
  },
  privateRuntimeConfig: {
  },

  apollo: {
    clientConfigs: {
      default: '~/apollo/default-config.js',
    },
    authenticationType: 'JWT',
    cookieAttributes: {
      // expiration in days
      expires: 7,
    },
  },

  auth: {
    strategies: {
      local: false,

      apollo: {
        scheme: '~/schemes/apollo.js',
        name: 'apollo',
        provider: 'apollo',

        token: {
          required: true,
          property: 'token',
          type: 'JWT',
          maxAge: 300,
        },
        refreshToken: {
          property: 'refreshToken',
          maxAge: 60 * 60 * 24 * 7,
          required: true,
          tokenRequired: true,
        },
        autoLogout: false,
      },
    },
    redirect: {
      login: '/login',
      logout: '/',
      home: '/start',
    },
  },

  router: {
    middleware: [
      'logged-in-state',
      'auth',
    ],
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    babel: {
      plugins: [
        '@babel/plugin-proposal-optional-chaining',
      ],
    },

    routes() {
      return [
        '/',
      ];
    },
  },
};
