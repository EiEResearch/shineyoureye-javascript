export default [
  {
    path: '/blog',
    name: 'blog',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/app/blog/Blog.vue'),
  },
];
