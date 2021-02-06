export default ({ app: { router }, store }) => {
  router.afterEach(() => {
    store.dispatch('navigation/setIsBackNavigation', false);
  });
};
