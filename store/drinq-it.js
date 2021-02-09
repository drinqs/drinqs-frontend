import { make } from 'vuex-pathify';
import NextCocktailQuery from '@/graphql/queries/Cocktail/NextCocktail.gql';
import UpdateReviewMutation from '@/graphql/mutations/Review/UpdateReview.gql';

export const state = () => ({
  cocktail: null,
  loading: false,
});

export const mutations = {
  ...make.mutations(state),
};

export const actions = {
  ...make.actions(state),

  async fetchNextCocktail({ commit }) {
    const client = this.app.apolloProvider.defaultClient;

    const { data } = await client.query({ query: NextCocktailQuery, fetchPolicy: 'no-cache' });
    commit('SET_COCKTAIL', data.nextCocktail);
    commit('SET_LOADING', false);
  },

  async review({ commit, dispatch, getters }, { review = 'liked' }) {
    commit('SET_LOADING', true);
    const { cocktail } = getters;
    commit('SET_COCKTAIL', null);
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

  reset({ commit }) {
    commit('SET_COCKTAIL', null);
  },
};

export const getters = {
  ...make.getters(state),
};
