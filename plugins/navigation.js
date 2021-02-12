const PROTECTED_ROUTES = [
  '/start',
  '/bookmarks',
  '/recommended-cocktails',
  '/drinq-it',
  '/search',
];

export default ({ app: { router }, store }) => {
  router.beforeEach((to, from, next) => {
    if (
      PROTECTED_ROUTES.includes(to.path)
      && store.$auth.loggedIn
      && !store.$auth.user?.isOnboarded
      && to.path !== '/onboarding'
    ) {
      store.dispatch('navigation/setRedirectPath', to.path);
      next('/onboarding');
    } else {
      next();
    }
  });

  router.afterEach(() => {
    store.dispatch('navigation/setIsBackNavigation', false);
  });
};
