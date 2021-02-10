import { make } from 'vuex-pathify';
import CocktailSearchQuery from '@/graphql/queries/Cocktail/Search.gql';

export const state = () => ({
  searchTerm: '',
  error: '',
  loading: false,
  searchResults: [],
  hasNextPage: true,
  after: null,
  searchTermChanged: false,
});

export const mutations = {
  ...make.mutations(state),
  ADD_SEARCH_RESULTS({ searchResults }, furtherResults) {
    searchResults.push(...furtherResults);
  },
  SET_REVIEW({ searchResults }, { review, cocktailId }) {
    const index = searchResults.findIndex((cocktail) => cocktail.id === cocktailId);
    if (index === -1) return;
    const cocktail = searchResults[index];
    // eslint-disable-next-line no-param-reassign
    searchResults[index] = { ...cocktail, review };
  },
};

export const actions = {
  ...make.actions(['searchResults', 'error', 'loading', 'hasNextPage', 'after']),
  setSearchTerm({ commit, getters }, searchTerm) {
    commit('SET_SEARCH_TERM_CHANGED', getters.searchTerm !== searchTerm);
    commit('SET_SEARCH_TERM', searchTerm);
  },
  async performSearch({ commit, getters }) {
    try {
      commit('SET_ERROR', '');
      if (getters.searchTermChanged) {
        commit('SET_HAS_NEXT_PAGE', true);
        commit('SET_AFTER', null);
        commit('SET_SEARCH_RESULTS', []);
        commit('SET_SEARCH_TERM_CHANGED', false);
      }
      if (!getters.hasNextPage || getters.loading) return;

      const client = this.app.apolloProvider.defaultClient;
      commit('SET_LOADING', true);

      const { data, errors } = await client.query({
        query: CocktailSearchQuery,
        variables: {
          searchTerm: getters.searchTerm,
          first: 20,
          after: getters.after,
        },
      });
      if (errors?.length > 0) {
        throw new Error('GraphQL Error');
      }
      commit('SET_HAS_NEXT_PAGE', data.search.pageInfo.hasNextPage);
      commit('SET_AFTER', data.search.pageInfo.endCursor);
      commit('ADD_SEARCH_RESULTS', data.search.cocktails);
    } catch (error) {
      commit('SET_ERROR', 'Oops! Something went wrong.');
    }
    commit('SET_LOADING', false);
  },

  reset({ commit }) {
    commit('SET_SEARCH_TERM', '');
    commit('SET_ERROR', '');
    commit('SET_LOADING', false);
    commit('SET_HAS_NEXT_PAGE', true);
    commit('SET_AFTER', null);
    commit('SET_SEARCH_RESULTS', []);
  },

  setReview({ commit }, { review, cocktailId }) {
    commit('SET_REVIEW', { review, cocktailId });
  },
};

export const getters = {
  ...make.getters(state),
};
