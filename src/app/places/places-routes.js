export default [
  { path: '/place/is/state', redirect: { name: 'states' } },
  { path: '/place/is/senatorial-district', redirect: { name: 'senatorial-district' } },
  { path: '/place/is/federal-constituency', redirect: { name: 'federal-constituency' } },
  { path: '/place/is/state-constituency', redirect: { name: 'state-constituency' } },

  {
    path: '/places/state',
    name: 'states',
    meta: { position: 'governors', type: 'State' },
    component: () => import('@/app/places/Places.vue'),
  },
  {
    path: '/places/senatorial-district',
    name: 'senatorial-district',
    meta: { position: 'senate', type: 'Senatorial Constituency' },
    component: () => import('@/app/places/Places.vue'),
  },
  {
    path: '/places/federal-constituency',
    name: 'federal-constituency',
    meta: { position: 'representatives', type: 'Federal Constituency' },
    component: () => import('@/app/places/Places.vue'),
  },
  {
    path: '/places/state-constituency',
    name: 'state-constituency',
    meta: { position: 'honorables', type: 'State Constituency' },
    component: () => import('@/app/places/Places.vue'),
  },
  {
    path: '/place/:slug',
    name: 'place-slug',
    component: () => import('@/app/places/Place.vue'),
  },
  {
    path: '/place/:legislature/:slug',
    name: 'place-legislature-slug',
    component: () => import('@/app/places/Place.vue'),
  },
];
