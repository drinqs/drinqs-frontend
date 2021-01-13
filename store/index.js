import pathify, { make } from 'vuex-pathify';

export const plugins = [
  pathify.plugin,
];

// root state
export const state = () => ({});

export const mutations = {
  ...make.mutations(state),
};

export const actions = {
  ...make.actions(state),
  nuxtServerInit({ _commit }) {
    // server init callback
  },
};

export const getters = {
  ...make.getters(state),
};
