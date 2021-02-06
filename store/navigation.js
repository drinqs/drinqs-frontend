import { make } from 'vuex-pathify';

export const state = () => ({
  isBackNavigation: false,
});

export const mutations = {
  ...make.mutations(state),
};

export const actions = {
  ...make.actions(state),
  onBackNavigation({ commit }) {
    commit('SET_IS_BACK_NAVIGATION', true);
  },
};

export const getters = {
  ...make.getters(state),
};
