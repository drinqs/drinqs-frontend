/* eslint-disable no-param-reassign */
import { make } from 'vuex-pathify';
import BookmarksQuery from '@/graphql/queries/User/Bookmarks.gql';
import LikedCocktailsQuery from '@/graphql/queries/User/LikedCocktails.gql';
import DislikedCocktailsQuery from '@/graphql/queries/User/DislikedCocktails.gql';

const TABS = [
  {
    key: 'bookmarks',
    name: 'Bookmarks',
  },
  {
    key: 'likedCocktails',
    name: 'Likes',
  },
  {
    key: 'dislikedCocktails',
    name: 'Dislikes',
  },
];
const DEFAULT_TAB = { ...TABS[0] };

const QUERIES = {
  bookmarks: BookmarksQuery,
  likedCocktails: LikedCocktailsQuery,
  dislikedCocktails: DislikedCocktailsQuery,
};

export const state = () => ({
  tabs: [...TABS],
  currentTab: { ...DEFAULT_TAB },
  cocktails: {
    bookmarks: [],
    likedCocktails: [],
    dislikedCocktails: [],
  },
  meta: {
    bookmarks: {
      loading: false,
      hasNextPage: true,
      after: null,
    },
    likedCocktails: {
      loading: false,
      hasNextPage: true,
      after: null,
    },
    dislikedCocktails: {
      loading: false,
      hasNextPage: true,
      after: null,
    },
  },
});

export const mutations = {
  ...make.mutations(['currentTab', 'cocktails', 'meta']),
  ADD_COCKTAILS({ cocktails, currentTab }, furtherCocktails) {
    cocktails[currentTab.key].push(...furtherCocktails);
  },
  SET_HAS_NEXT_PAGE({ meta, currentTab }, hasNextPage) {
    meta[currentTab.key].hasNextPage = hasNextPage;
  },
  SET_LOADING({ meta, currentTab }, loading) {
    meta[currentTab.key].loading = loading;
  },
  SET_AFTER({ meta, currentTab }, endCursor) {
    meta[currentTab.key].after = endCursor;
  },

  SET_BOOKMARKS({ cocktails }, bookmarks) {
    cocktails.bookmarks = bookmarks;
  },
  SET_LIKED_COCKTAILS({ cocktails }, likedCocktails) {
    cocktails.likedCocktails = likedCocktails;
  },
  SET_DISLIKED_COCKTAILS({ cocktails }, dislikedCocktails) {
    cocktails.dislikedCocktails = dislikedCocktails;
  },

  SET_BOOKMARKS_META({ meta }, bookmarksMeta) {
    meta.bookmarks = bookmarksMeta;
  },
  SET_LIKED_COCKTAILS_META({ meta }, likedCocktailsMeta) {
    meta.likedCocktails = likedCocktailsMeta;
  },
  SET_DISLIKED_COCKTAILS_META({ meta }, dislikedCocktailsMeta) {
    meta.dislikedCocktails = dislikedCocktailsMeta;
  },

  REMOVE_BOOKMARK({ cocktails }, bookmarkIndex) {
    cocktails.bookmarks.splice(bookmarkIndex, 1);
  },
  REMOVE_LIKED_COCKTAIL({ cocktails }, likeIndex) {
    cocktails.likedCocktails.splice(likeIndex, 1);
  },
  REMOVE_DISLIKED_COCKTAIL({ cocktails }, dislikeIndex) {
    cocktails.dislikedCocktails.splice(dislikeIndex, 1);
  },
};

export const actions = {
  ...make.actions(['currentTab', 'cocktails', 'meta']),

  async fetch({ commit, getters }) {
    const { currentMeta: { hasNextPage, loading, after }, currentTab } = getters;
    if (!hasNextPage || loading) return;

    const client = this.app.apolloProvider.defaultClient;
    commit('SET_LOADING', true);

    const query = QUERIES[currentTab.key];
    const payload = {
      query,
      variables: {
        first: 20,
        after,
      },
    };
    if (getters.cocktails[currentTab.key].length === 0) payload.fetchPolicy = 'no-cache';
    const { data } = await client.query(payload);

    commit('SET_HAS_NEXT_PAGE', Object.values(data)[0].pageInfo.hasNextPage);
    commit('SET_AFTER', Object.values(data)[0].pageInfo.endCursor);
    commit('ADD_COCKTAILS', Object.values(data)[0].cocktails);
    commit('SET_LOADING', false);
  },

  switchTab({ commit, dispatch }, tab) {
    const newTab = TABS.find((t) => t.key === tab.key);

    commit('SET_CURRENT_TAB', newTab);
    dispatch('fetch');
  },

  reset({ commit }) {
    commit('SET_CURRENT_TAB', { ...DEFAULT_TAB });
    commit('SET_COCKTAILS', {
      bookmarks: [],
      likedCocktails: [],
      dislikedCocktails: [],
    });
    commit('SET_META', {
      bookmarks: {
        loading: false,
        hasNextPage: true,
        after: null,
      },
      likedCocktails: {
        loading: false,
        hasNextPage: true,
        after: null,
      },
      dislikedCocktails: {
        loading: false,
        hasNextPage: true,
        after: null,
      },
    });
  },

  resetTab({ commit }, { key: tab }) {
    if (tab === 'bookmarks') {
      commit('SET_BOOKMARKS', []);
      commit('SET_BOOKMARKS_META', {
        loading: false,
        hasNextPage: true,
        after: null,
      });
    } else if (tab === 'likedCocktails') {
      commit('SET_LIKED_COCKTAILS', []);
      commit('SET_LIKED_COCKTAILS_META', {
        loading: false,
        hasNextPage: true,
        after: null,
      });
    } else if (tab === 'dislikedCocktails') {
      commit('SET_DISLIKED_COCKTAILS', []);
      commit('SET_DISLIKED_COCKTAILS_META', {
        loading: false,
        hasNextPage: true,
        after: null,
      });
    }
  },

  onAction({ commit, dispatch, getters }, { index: cocktailIndex, action }) {
    const { currentTab: { key: currentTab } } = getters;
    if (['dislike', 'unset-review'].includes(action) && currentTab === 'likedCocktails') {
      commit('REMOVE_LIKED_COCKTAIL', cocktailIndex);
    } else if (['like', 'unset-review'].includes(action) && currentTab === 'dislikedCocktails') {
      commit('REMOVE_DISLIKED_COCKTAIL', cocktailIndex);
    } else if (action === 'remove-bookmark' && currentTab === 'bookmarks') {
      commit('REMOVE_BOOKMARK', cocktailIndex);
    }

    TABS.filter((tab) => tab.key !== getters.currentTab.key).forEach((tab) => {
      dispatch('resetTab', tab);
    });
  },
};

export const getters = {
  ...make.getters(state),

  currentMeta({ currentTab, meta }) {
    return meta[currentTab.key];
  },
};
