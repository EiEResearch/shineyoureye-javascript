import Vue from 'vue';
import Router from 'vue-router';
import AboutRoutes from '@/app/about/about-router';
import HomeRoutes from '@/app/home/home-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...HomeRoutes,
    ...AboutRoutes,
  ],
});
