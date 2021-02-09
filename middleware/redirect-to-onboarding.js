export default ({ store, redirect }) => {
  const redirectToOnboarding = store.getters['navigation/redirectToOnboarding'];
  if (redirectToOnboarding) {
    store.dispatch('navigation/setRedirectToOnboarding', false);
    redirect('/onboarding');
  }
};
