import AboutRoutes from '@/app/about/about-routes';
import HomeRoutes from '@/app/home/home-routes';
import DocumentRoutes from '@/app/document/document-routes';

export default [
  ...HomeRoutes,
  ...AboutRoutes,
  ...DocumentRoutes,
  { path: '/feedback', redirect: { name: 'contact' } },
  { path: '*', component: () => import('@/app/shared/components/NotFound.vue') },
];
