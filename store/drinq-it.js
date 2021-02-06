import { make } from 'vuex-pathify';
import NextCocktailQuery from '@/graphql/queries/Cocktail/NextCocktail.gql';

export const state = () => ({
  cocktail: null,
  nextCocktail: null,
});

export const mutations = {
  ...make.mutations(state),
};

export const actions = {
  ...make.actions(state),
  async fetch({ commit, getters }) {
    const client = this.app.apolloProvider.defaultClient;

    if (getters.nextCocktail?.slug) {
      commit('SET_COCKTAIL', getters.nextCocktail);
    } else {
      const { data } = await client.query({ query: NextCocktailQuery, fetchPolicy: 'no-cache' });
      commit('SET_COCKTAIL', data.nextCocktail);
    }

    const { data: secondQuery } = await client.query({ query: NextCocktailQuery, fetchPolicy: 'no-cache' });
    commit('SET_NEXT_COCKTAIL', secondQuery.nextCocktail);
  },

  reset({ commit }) {
    commit('SET_COCKTAIL', null);
    commit('SET_NEXT_COCKTAIL', null);
  },
};

export const getters = {
  ...make.getters(state),
};
