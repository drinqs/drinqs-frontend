export default (_context) => ({
  httpEndpoint: process.env.GQL_ENDPOINT,
  browserHttpEndpoint: '/graphql',
});
