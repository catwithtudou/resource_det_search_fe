const state = {
  homeStr: "Home"
};

// getters
const getters = {
  reverseHome(state) {
    return state.homeStr.split("").reverse().join("");
  },
};

// actions
const actions = {};

// mutations
const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
