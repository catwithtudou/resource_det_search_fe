import localforage from "localforage";

const state = {
  token: "",
  name: "",
  avatar:"",
};

// getters
const getters = {
  getUserInfo() {
    return {
      token: state.token,
      name: state.name,
      avatar: state.avatar,
    };
  },
  isUserLogin() {
    return state.token !== "" && !state.name !== "";
  },
};

const mutations = {
  // 登录
  userLogin(state, userInfo) {
    state.token = userInfo.token;
    state.name = userInfo.name;
  },
};

// actions
const actions = {
  async userLogin({ commit }, userInfo) {
    commit("userLogin", userInfo);
    let user = await localforage.setItem("userInfo", userInfo);
    return user;
  },
  async localUserInfo({ commit }) {
    let user = await localforage.getItem("userInfo");
    if (user) {
      commit("userLogin", user);
      return true;
    }
    return false;
  },
};

// mutations

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
