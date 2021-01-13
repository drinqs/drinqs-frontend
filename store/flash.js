import { make } from 'vuex-pathify';

export const state = () => ({
  flashMessage: null,
});

export const mutations = {
  ...make.mutations(state),
};

export const actions = {
  ...make.actions(state),
  consumeFlashMessage({ commit }) {
    commit('SET_FLASH_MESSAGE', null);
  },
};

export const getters = {
  ...make.getters(state),
};
