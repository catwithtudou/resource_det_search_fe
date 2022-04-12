import { createLogger, createStore } from "vuex";
import mutations from "@store/mutations.js";
import actions from "@store/actions.js";
import home from "@store/modules/home.js";

const debug = process.env.NODE_ENV !== "production";

export default createStore({
  state: {},
  mutations: mutations,
  actions: actions,
  modules: {
    home,
  },
  plugins: debug ? [createLogger()] : [],
});
