export default [
  {
    path: '/place/is/state',
    name: 'states',
    meta: { position: 'governors', type: 'State' },
    component: () => import('@/app/places/Places.vue'),
  },
  {
    path: '/place/is/senatorial-district',
    name: 'senatorial-district',
    meta: { position: 'senate', type: 'Senatorial Constituency' },
    component: () => import('@/app/places/Places.vue'),
  },
  {
    path: '/place/is/federal-constituency',
    name: 'federal-constituency',
    meta: { position: 'representatives', type: 'Federal Constituency' },
    component: () => import('@/app/places/Places.vue'),
  },
  {
    path: '/place/is/state-constituency',
    name: 'state-constituency',
    meta: { position: 'honorables', type: 'State Constituency' },
    component: () => import('@/app/places/Places.vue'),
  },
];
