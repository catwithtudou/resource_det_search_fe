import {  createStore } from "vuex";
import mutations from "@store/mutations.js";
import actions from "@store/actions.js";
import home from "@store/modules/home.js";

export default createStore({
  state: {},
  mutations: mutations,
  actions: actions,
  modules: {
    home,
  }
});
