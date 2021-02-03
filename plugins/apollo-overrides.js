/* eslint-disable no-param-reassign */

export default ({ app }) => {
  // disable caching on all the queries
  app.apolloProvider.defaultClient.defaultOptions = {
    query: {
      fetchPolicy: 'no-cache',
    },
  };
};
