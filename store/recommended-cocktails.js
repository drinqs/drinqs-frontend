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
  SET_REVIEW({ cocktails }, { review, cocktailId }) {
    const index = cocktails.findIndex((cocktail) => cocktail.id === cocktailId);
    if (index === -1) return;
    const cocktail = cocktails[index];
    // eslint-disable-next-line no-param-reassign
    cocktails[index] = { ...cocktail, review };
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

  setReview({ commit }, { review, cocktailId }) {
    commit('SET_REVIEW', { review, cocktailId });
  },
};

export const getters = {
  ...make.getters(state),
};
