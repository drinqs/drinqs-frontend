export default ({ $auth, store }) => {
  $auth.onRedirect((to, from) => {
    if (from === '/login' && to !== '/onboarding' && $auth.loggedIn && !$auth.user?.isOnboarded) {
      store.dispatch('navigation/setRedirectPath', to);
      store.dispatch('navigation/setRedirectToOnboarding', true);
    }
  });
};
