import Vuex from "vuex";
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    list: null,
  },
  mutations: {
    list(state, authPayload) {
      this.state.list = authPayload;
    },
  },
  getters: {
    list: state => state.list,
  },
});