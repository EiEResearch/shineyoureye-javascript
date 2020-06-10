/* eslint-disable no-unused-vars */
import Vue from 'vue';
import Router from 'vue-router';
import routes from '@/app/routes';
import store from '@/app/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the skeleton animation.
    store.commit('setLoading', { loading: true, path: to.path });
  }
  next();
});

router.beforeResolve((to, from, next) => {
  // If this is an initial page load.
  if (to.name) {
    // Start the skeleton animation.
    store.commit('setLoading', { loading: true, path: to.path });
  }
  next();
});

router.afterEach((to, from) => {
  // Complete the animation of the skeleton.
  store.commit('setLoading', { loading: false, path: to.path });
});

export default router;
