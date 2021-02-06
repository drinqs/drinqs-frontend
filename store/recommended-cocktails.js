import { make } from 'vuex-pathify';
import RecommendedCocktailsQuery from '@/graphql/queries/Cocktail/RecommendedCocktails.gql';

export const state = () => ({
  loading: false,
  cocktails: [],
  hasNextPage: true,
  after: null,
});

export const mutations = {
  ...make.mutations(state),
  ADD_COCKTAILS({ cocktails }, furtherCocktails) {
    cocktails.push(...furtherCocktails);
  },
};

export const actions = {
  ...make.actions(state),
  async fetch({ commit, getters }) {
    if (!getters.hasNextPage || getters.loading) return;

    const client = this.app.apolloProvider.defaultClient;
    commit('SET_LOADING', true);

    const { data } = await client.query({
      query: RecommendedCocktailsQuery,
      variables: {
        searchTerm: getters.searchTerm,
        first: 20,
        after: getters.after,
      },
    });

    commit('SET_HAS_NEXT_PAGE', data.recommendedCocktails.pageInfo.hasNextPage);
    commit('SET_AFTER', data.recommendedCocktails.pageInfo.endCursor);
    commit('ADD_COCKTAILS', data.recommendedCocktails.cocktails);
    commit('SET_LOADING', false);
  },

  reset({ commit }) {
    commit('SET_LOADING', false);
    commit('SET_HAS_NEXT_PAGE', true);
    commit('SET_AFTER', null);
    commit('SET_COCKTAILS', []);
  },
};

export const getters = {
  ...make.getters(state),
};
