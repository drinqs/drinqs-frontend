export default (ctx) => {
  if (ctx.$apolloHelpers.getToken()) {
    ctx.$auth.$storage.setUniversal('loggedIn', true);
  }
};
