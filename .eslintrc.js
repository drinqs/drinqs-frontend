module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'airbnb-base',
  ],
  plugins: [
  ],
  settings: {
    'import/resolver': 'nuxt',
  },
  // add your custom rules here
  rules: {
    'max-len': ['error', { code: 120, ignoreRegExpLiterals: true, ignoreUrls: true }],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
};
