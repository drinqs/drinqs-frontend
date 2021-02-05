import fetchAllCocktailRoutes from './build/cocktail-routes';

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'server',

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
    { src: '~/plugins/notification-plugin', mode: 'client' },
    { src: '~/plugins/vue-clipboard', mode: 'client' },
    { src: '~/plugins/vuelidate' },
    { src: '~/plugins/apollo-overrides' },
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
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/apollo',
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
    defaultOptions: {
      $query: {
        fetchPolicy: 'no-cache',
      },
    },
  },

  auth: {
    strategies: {
      local: {
        scheme: '~/schemes/apollo.scheme.js',
        token: {
          property: 'token',
          type: 'JWT',
          // nearly one day
          maxAge: 86000,
        },
        refreshToken: {
          property: 'refreshToken',
          data: 'refreshToken',
          // nearly 30 days
          maxAge: 2000000,
          required: true,
          tokenRequired: true,
        },
        user: {
          property: 'user',
          autoFetch: true,
        },
        endpoints: {
          login: { url: `${process.env.API_URL || 'https://app.drinqs.de'}/api/auth/login`, method: 'post' },
          refresh: { url: `${process.env.API_URL || 'https://app.drinqs.de'}/api/auth/refresh`, method: 'post' },
          user: { url: `${process.env.API_URL || 'https://app.drinqs.de'}/api/auth/user`, method: 'get' },
          logout: false,
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
      'auth',
      'sync-authentication',
    ],
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    babel: {
      plugins: [
        '@babel/plugin-proposal-optional-chaining',
      ],
    },
  },

  generate: {
    async routes() {
      const cocktailRoutes = await fetchAllCocktailRoutes();

      return [
        '/',
        '/start',
        '/drinq-it',
        '/recommended-cocktails',
        '/bookmarks',
        '/search',
        '/login',
        '/register',
        '/profile',
        ...cocktailRoutes,
      ];
    },
  },
};
