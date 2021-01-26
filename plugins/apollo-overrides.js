export default ({ app }) => {
  // disable caching on all the queries
  // eslint-disable-next-line no-param-reassign
  app.apolloProvider.defaultClient.defaultOptions = {
    query: {
      fetchPolicy: 'no-cache',
    },
  };
};
