export default (ctx) => {
  if (ctx.app.$auth.$state.loggedIn) {
    return ctx.app.$auth.redirect('home');
  }

  return true;
};
