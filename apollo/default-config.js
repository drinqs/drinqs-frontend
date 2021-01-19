export default ({ $config: { graphQLEndpoint } }) => ({
  httpEndpoint: graphQLEndpoint,
  browserHttpEndpoint: graphQLEndpoint,
});
