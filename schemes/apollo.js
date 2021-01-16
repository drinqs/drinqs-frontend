import meQuery from '@/graphql/queries/user/me.gql';
import loginMutation from '@/graphql/mutations/user/authenticate.gql';
import refreshTokenMutation from '@/graphql/mutations/user/refreshToken.gql';

// eslint-disable-next-line import/no-unresolved, import/extensions
import { RefreshScheme, ExpiredAuthSessionError } from '~auth/runtime';

function getProp(holder, propName) {
  if (!propName || !holder || typeof holder !== 'object') {
    return holder;
  }

  if (propName in holder) {
    return holder[propName];
  }

  const propParts = Array.isArray(propName)
    ? propName
    : (`${propName}`).split('.');

  let result = holder;
  while (propParts.length && result) {
    result = result[propParts.shift()];
  }

  return result;
}

export default class ApolloScheme extends RefreshScheme {
  constructor($auth, options) {
    super($auth, options);

    this.$apollo = $auth.ctx.app.apolloProvider.defaultClient;
    this.$apolloHelpers = $auth.ctx.app.$apolloHelpers;
  }

  async login(variables) {
    const { data } = await this.$apollo.mutate({
      mutation: loginMutation,
      variables,
    });

    await this.updateTokens(Object.values(data)[0]);

    return data;
  }

  setUser(user) {
    return this.$auth.setUser(user);
  }

  async setUserToken(token, refreshToken = undefined) {
    await this.$apolloHelpers.onLogin(token);

    this.token.set(token);

    if (refreshToken) {
      this.refreshToken.set(refreshToken);
    }

    // Fetch user
    return this.fetchUser();
  }

  async refreshTokens() {
    // Token and refresh token are required but not available
    if (!this.check().valid) {
      return;
    }

    // Get refresh token status
    const refreshTokenStatus = this.refreshToken.status();

    // Refresh token is expired. There is no way to refresh. Force reset.
    if (refreshTokenStatus.expired()) {
      this.$auth.reset();

      throw new ExpiredAuthSessionError();
    }

    try {
      const { data } = await this.$apollo.mutate({
        mutation: refreshTokenMutation,
        variables: {
          [this.options.refreshToken.property]: this.refreshToken.get(),
        },
      });

      this.updateTokens(Object.values(data)[0], { isRefreshing: true });
    } catch (error) {
      this.$auth.callOnError(error, { method: 'refreshToken' });
      throw error;
    }
  }

  async updateTokens(
    data,
    { isRefreshing = false, updateOnRefresh = true } = {},
  ) {
    const token = this.options.token.required
      ? getProp(data, this.options.token.property)
      : true;
    const refreshToken = this.options.refreshToken.required
      ? getProp(data, this.options.refreshToken.property)
      : true;

    this.token.set(token);
    await this.$apolloHelpers.onLogin(token);

    // Update refresh token if defined and if `isRefreshing` is `false`
    // If `isRefreshing` is `true`, then only update if `updateOnRefresh` is also `true`
    if (refreshToken && (!isRefreshing || (isRefreshing && updateOnRefresh))) {
      this.refreshToken.set(refreshToken);
    }

    if (this.options.user.autoFetch) {
      await this.fetchUser();
    }

    return data;
  }

  async fetchUser() {
    if (!this.check().valid) {
      this.reset();
      throw new Error('Credentials are invalid');
    }

    try {
      const { data } = await this.$apollo.query({ query: meQuery });
      this.setUser(Object.values(data)[0]);
    } catch (error) {
      this.$auth.callOnError(error, { method: 'fetchUser' });
    }
  }

  async logout() {
    await this.$apolloHelpers.onLogout();

    this.reset();
  }
}
