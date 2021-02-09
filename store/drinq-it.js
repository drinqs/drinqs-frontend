import { make } from 'vuex-pathify';
import NextCocktailQuery from '@/graphql/queries/Cocktail/NextCocktail.gql';

export const state = () => ({
  cocktail: null,
});

export const mutations = {
  ...make.mutations(state),
};

export const actions = {
  ...make.actions(state),
  async fetch({ commit }) {
    const client = this.app.apolloProvider.defaultClient;

    const { data } = await client.query({ query: NextCocktailQuery, fetchPolicy: 'no-cache' });
    commit('SET_COCKTAIL', data.nextCocktail);
  },

  reset({ commit }) {
    commit('SET_COCKTAIL', null);
  },
};

export const getters = {
  ...make.getters(state),
};
