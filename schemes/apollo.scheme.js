// eslint-disable-next-line import/no-unresolved, import/extensions
import { RefreshScheme } from '~auth/runtime';

function getProp(holder, propName) {
  if (!propName || !holder || typeof holder !== 'object') {
    return holder;
  }

  if (propName in holder) {
    return holder[propName];
  }

  const propParts = Array.isArray(propName)
    ? propName
    : (propName.toString()).split('.');

  let result = holder;
  while (propParts.length && result) {
    result = result[propParts.shift()];
  }

  return result;
}

export default class ApolloRefreshScheme extends RefreshScheme {
  constructor($auth, options) {
    super($auth, options);
    this.$apolloHelpers = $auth.ctx.app.$apolloHelpers;
  }

  setUserToken(token, refreshToken = undefined) {
    return this.$apolloHelpers.onLogin(token).then(() => super.setUserToken(token, refreshToken));
  }

  updateTokens(response, { isRefreshing = false, updateOnRefresh = true } = {}) {
    const token = this.options.token.required
      ? getProp(response.data, this.options.token.property)
      : true;

    this.$apolloHelpers.onLogin(token);
    super.updateTokens(response, { isRefreshing, updateOnRefresh });
  }

  reset({ resetInterceptor = true } = {}) {
    this.$apolloHelpers.onLogout();
    super.reset({ resetInterceptor });
  }
}
