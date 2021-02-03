/* eslint-disable import/no-extraneous-dependencies */
import { Observable } from 'apollo-link';
import { onError } from '@apollo/client/link/error';

const promiseToObservable = (promise) => new Observable((subscriber) => {
  promise.then(
    (value) => {
      if (subscriber.closed) return;
      subscriber.next(value);
      subscriber.complete();
    },
    (err) => subscriber.error(err),
  );
});

export default ({ $config: { graphQLEndpoint } }) => {
  const link = onError(({ graphQLErrors, forward, operation }) => {
    if (process.server) return undefined;
    if (!graphQLErrors) return undefined;
    if (!graphQLErrors.map((error) => error.message).includes('Signature has expired')) return undefined;

    // eslint-disable-next-line no-undef
    return promiseToObservable($nuxt.$auth.refreshTokens()).flatMap(() => {
      operation.setContext(() => ({
        headers: {
          // eslint-disable-next-line no-undef
          Authorization: $nuxt.$auth.strategies.apollo.token.get(),
        },
      }));

      return forward(operation);
    });
  });

  return {
    link,
    httpEndpoint: graphQLEndpoint,
    browserHttpEndpoint: graphQLEndpoint,
  };
};
