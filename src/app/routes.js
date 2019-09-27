import AboutRoutes from '@/app/about/about-routes';
import HomeRoutes from '@/app/home/home-routes';
import BlogRoutes from '@/app/blog/blog-routes';

export default [
  ...HomeRoutes,
  ...AboutRoutes,
  ...BlogRoutes,
  { path: '*', component: () => import('@/app/shared/components/NotFound.vue') },
];
