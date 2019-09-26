import AboutRoutes from '@/app/about/about-routes';
import HomeRoutes from '@/app/home/home-routes';

export default [
  ...HomeRoutes,
  ...AboutRoutes,
  { path: '*', component: () => import('@/app/shared/components/NotFound.vue') },
];
