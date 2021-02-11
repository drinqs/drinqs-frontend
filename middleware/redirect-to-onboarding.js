export default ({ $auth, from, route, store, redirect }) => {
  console.log($auth.loggedIn, $auth.user, route, from);
  if ($auth.loggedIn && !$auth.user?.isOnboarded && route.path !== '/onboarding' && from?.path !== '/onboarding') {
    store.dispatch('navigation/setRedirectPath', route.path);
    redirect('/onboarding');
  }
};
