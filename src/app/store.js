import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    route: '',
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = (payload && payload.loading) ? payload.loading : false;
      state.route = (payload && payload.path) ? payload.path.split('/')[1] : '';
    },
  },
  actions: {

  },
});
