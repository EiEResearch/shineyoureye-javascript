export default [
  {
    path: '/blog',
    name: 'blog',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/app/document/Blog.vue'),
  },
  {
    path: '/blog/:slug',
    name: 'single-blog',
    component: () => import('@/app/document/SingleBlog.vue'),
  },
  {
    path: '/events',
    name: 'events',
    component: () => import('@/app/document/Events.vue'),
  },
  {
    path: '/events/:slug',
    name: 'single-event',
    component: () => import('@/app/document/SingleEvent.vue'),
  },
  { path: '/info/events', redirect: { name: 'events' } },
  {
    path: '/info/:slug',
    name: 'single-info',
    component: () => import('@/app/document/SingleInfo.vue'),
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/app/document/Contact.vue'),
  },
  {
    path: '/ootc',
    name: 'ootc',
    component: () => import('@/app/document/OOTC.vue'),
  },
];
