import AboutRoutes from '@/app/about/about-routes';
import HomeRoutes from '@/app/home/home-routes';
import DocumentRoutes from '@/app/document/document-routes';
import PeopleRoutes from '@/app/people/people-routes';
import PlacesRoutes from '@/app/places/places-routes';

export default [
  ...HomeRoutes,
  ...AboutRoutes,
  ...DocumentRoutes,
  ...PeopleRoutes,
  ...PlacesRoutes,
  { path: '/feedback', redirect: { name: 'contact' } },
  { path: '*', component: () => import('@/app/shared/components/NotFound.vue') },
];
