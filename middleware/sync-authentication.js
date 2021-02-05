export default async ({ $auth, app }) => {
  if ($auth.loggedIn) {
    const token = $auth.getStrategy().token.get().replace(/^JWT\s/, '');
    await app.$apolloHelpers.onLogin(token);
  }
};
