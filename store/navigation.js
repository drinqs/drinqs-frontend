import { make } from 'vuex-pathify';

export const state = () => ({
  isBackNavigation: false,
  redirectPath: null,
});

export const mutations = {
  ...make.mutations(state),
};

export const actions = {
  ...make.actions(state),
  onBackNavigation({ commit }) {
    commit('SET_IS_BACK_NAVIGATION', true);
  },
  consumeRedirectPath({ commit }) {
    commit('SET_REDIRECT_PATH', null);
  },
};

export const getters = {
  ...make.getters(state),
};
