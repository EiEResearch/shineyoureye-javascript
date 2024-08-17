import Vue from 'vue';
import { NavPlugin, NavbarPlugin, ImagePlugin } from 'bootstrap-vue';
import VueMeta from 'vue-meta';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';
import Skeleton from 'vue-loading-skeleton';

import Logger from '@/plugins/logger.plugin';
import '@/styles/_bootstrap.scss';
import errorImage from '@/plugins/errorImage';


if (process.env.NODE_ENV === 'production') {
  Raven
    .config(`https://${process.env.VUE_APP_SENTRY_KEY}@sentry.io/${process.env.VUE_APP_SENTRY_PROJECT}`)
    .addPlugin(RavenVue, Vue)
    .install();
}

Vue.directive('error-image', errorImage);
Vue.use(Skeleton);
Vue.use(NavPlugin);
Vue.use(NavbarPlugin);
Vue.use(ImagePlugin);
Vue.use(Logger);
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true,
});
