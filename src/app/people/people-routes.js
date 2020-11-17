export default [
  { path: '/position/executive-governor', redirect: { name: 'governors' } },
  { path: '/position/senator', redirect: { name: 'senators' } },
  { path: '/position/federal-representative', redirect: { name: 'representatives' } },
  { path: '/position/state-representative', redirect: { name: 'honorables' } },
  {
    path: '/position/executive-governors',
    name: 'governors',
    meta: { position: 'governors' },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/app/people/People.vue'),
  },
  {
    path: '/position/senators',
    name: 'senators',
    meta: { position: 'senate' },
    component: () => import('@/app/people/People.vue'),
  },
  {
    path: '/position/federal-representatives',
    name: 'representatives',
    meta: { position: 'representatives' },
    component: () => import('@/app/people/People.vue'),
  },
  {
    path: '/position/local-government',
    name: 'localgovernment',
    meta: { position: 'localgovernment' },
    component: () => import('@/app/people/People.vue'),
  },
  {
    path: '/position/state-representatives',
    name: 'honorables',
    meta: { position: 'honorables' },
    component: () => import('@/app/people/StateRepresentatives.vue'),
  },
  {
    path: '/position/state-representatives/:state',
    name: 'state-assembly',
    meta: { position: 'honorables' },
    component: () => import('@/app/people/StateRepresentatives.vue'),
  },
  {
    path: '/person/:slug',
    name: 'single-politician',
    meta: { position: 'all' },
    component: () => import('@/app/people/Person.vue'),
  },
];
