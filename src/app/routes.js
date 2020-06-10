import HomeRoutes from '@/app/home/home-routes';
import DocumentRoutes from '@/app/document/document-routes';
import PeopleRoutes from '@/app/people/people-routes';
import PlacesRoutes from '@/app/places/places-routes';

export default [
  ...HomeRoutes,
  ...DocumentRoutes,
  ...PeopleRoutes,
  ...PlacesRoutes,
  { path: '/search', name: 'search', component: () => import('@/app/shared/components/SearchPage.vue') },
  { path: '/feedback', redirect: { name: 'contact' } },
  { path: '*', name: 'error', component: () => import('@/app/shared/components/NotFound.vue') },
];
