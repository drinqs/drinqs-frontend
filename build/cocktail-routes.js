/* eslint-disable no-param-reassign */
import { createApolloFetch } from 'apollo-fetch';

export default async () => {
  const uri = process.env.GQL_ENDPOINT;
  const apolloFetch = createApolloFetch({ uri });

  const loginQuery = await apolloFetch({
    query: `
      mutation Authenticate($username: String!, $password: String!) {
        tokenAuth(username: $username, password: $password) {
          payload
          refreshExpiresIn
          token
          refreshToken
        }
      }
    `,
    variables: {
      username: process.env.GQL_USERNAME,
      password: process.env.GQL_PASSWORD,
    },
  });
  console.log(loginQuery);
  const { token } = loginQuery.data.tokenAuth;
  apolloFetch.use(({ options }, next) => {
    if (!options.headers) {
      options.headers = {};
    }
    options.headers.Authorization = `JWT ${token}`;

    next();
  });

  const cocktailRoutes = [];
  let after = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const variables = {
      first: 100,
      after,
    };

    // eslint-disable-next-line no-await-in-loop
    const { data, errors } = await apolloFetch({
      query: `
        query AllCocktails {
          cocktails {
            pageInfo {
              hasNextPage
              endCursor
            }
            cocktails {
              id
              slug
              name
              alcoholic
              category
              preparation
              thumbnailUrl
              likeRatio
              glass {
                name
              }
              cocktailIngredients {
                ingredient {
                  name
                }
                position
                measurement
              }
            }
          }
        }
      `,
      variables,
    });

    console.log(errors);

    hasNextPage = data.cocktails.pageInfo.hasNextPage;
    after = data.cocktails.pageInfo.endCursor;
    cocktailRoutes.push(...data.cocktails.cocktails.map((cocktail) => ({
      route: `/cocktails/${cocktail.slug}`,
      payload: {
        cocktail,
      },
    })));
  }

  return cocktailRoutes;
};
