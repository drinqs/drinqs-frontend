export default async ({ graphQLErrors }, { $auth, redirect }) => {
  if (graphQLErrors.map((error) => error.message).includes('Signature has expired')) {
    await $auth.logout();
    redirect('/login');
  }
};
