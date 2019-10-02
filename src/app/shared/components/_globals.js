// Globally register all base components for convenience, because they
// will be used very frequently. Components are registered using the
// PascalCased version of their file name.

import Vue from 'vue';
import HeaderComponent from './Header.vue';

Vue.component('HeaderComponent', HeaderComponent);
Vue.component('NavComponent', () => import('./Nav.vue'));
Vue.component('NotFoundComponent', () => import('./NotFound.vue'));
