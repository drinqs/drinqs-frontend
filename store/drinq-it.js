import { make } from 'vuex-pathify';
import NextCocktailQuery from '@/graphql/queries/Cocktail/NextCocktail.gql';
import UpdateReviewMutation from '@/graphql/mutations/Review/UpdateReview.gql';

export const state = () => ({
  cocktail: null,
  oldCocktail: null,
  loading: false,
});

export const mutations = {
  ...make.mutations(state),
  SET_REVIEW({ cocktail }, { review, cocktailId }) {
    if (cocktail?.id !== cocktailId) return;
    // eslint-disable-next-line no-param-reassign
    cocktail.review = review;
  },
};

export const actions = {
  ...make.actions(state),

  async fetchNextCocktail({ commit, getters }) {
    const client = this.app.apolloProvider.defaultClient;

    const { data: result } = await client.query({ query: NextCocktailQuery, fetchPolicy: 'no-cache' });
    if (result.nextCocktail?.id === getters.oldCocktail?.id) {
      const { data: secondResult } = await client.query({ query: NextCocktailQuery, fetchPolicy: 'no-cache' });
      commit('SET_COCKTAIL', secondResult.nextCocktail);
    } else {
      commit('SET_COCKTAIL', result.nextCocktail);
    }

    commit('SET_LOADING', false);
  },

  async review({ commit, dispatch, getters }, { review = 'liked' }) {
    commit('SET_LOADING', true);
    const { cocktail } = getters;
    commit('SET_COCKTAIL', null);
    commit('SET_OLD_COCKTAIL', cocktail);
    const client = this.app.apolloProvider.defaultClient;

    const liked = review === 'liked';
    await client.mutate({
      mutation: UpdateReviewMutation,
      variables: {
        cocktailId: cocktail.id,
        bookmarked: cocktail.review?.bookmarked,
        liked,
      },
    });

    dispatch('fetchNextCocktail');
  },

  setReview({ commit }, { review, cocktailId }) {
    commit('SET_REVIEW', { review, cocktailId });
  },

  reset({ commit }) {
    commit('SET_COCKTAIL', null);
  },
};

export const getters = {
  ...make.getters(state),
};
