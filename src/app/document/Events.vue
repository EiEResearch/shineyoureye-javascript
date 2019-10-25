<template>
  <div>
    <article>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <h3 class="pb-4 mb-4 font-italic border-bottom" v-if="events.active && events.active.length">
              Upcoming Events
            </h3>
            <div class="row mb-2">
              <div class="col-md-6" v-for="(item, index) in events.active" :key="index">
                <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                  <div class="col p-4 d-flex flex-column position-static">
                    <p class="d-inline-block mb-2 text-primary">{{ item.eventDate }}</p>
                    <h3 class="mb-0">{{ item.title }}</h3>
                    <!-- <div class="mb-1 text-muted"> {{ item.date }}</div> -->
                    <p class="card-text mb-auto">{{ item.excerpt }}</p>
                    <a :href="item.url" class="stretched-link">Go to Event</a>
                  </div>
                </div>
              </div>
            </div>            <h3 class="pb-4 mb-4 font-italic border-bottom" v-if="events.inActive && events.inActive.length">
              Older Events
            </h3>
            <div class="row mb-2">
              <div class="col-md-6" v-for="(item, index) in events.inActive" :key="index">
                <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                  <div class="col p-4 d-flex flex-column position-static">
                    <p class="d-inline-block mb-2 text-primary">{{ item.eventDate }}</p>
                    <h3 class="mb-0">{{ item.title }}</h3>
                    <!-- <div class="mb-1 text-muted"> {{ item.date }}</div> -->
                    <p class="card-text mb-auto">{{ item.excerpt }}</p>
                    <a :href="item.url" class="stretched-link">Go to Event</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import DocumentFactory from '@/app/shared/factory/document.factory';

export default {
  name: 'Events',
  data() {
    return {
      title: '@SYE Events',
      url: '/events?page=',
      events: {
        active: [],
        inActive: [],
      },
      pagination: {},
    };
  },
  created() {
  },
  beforeRouteEnter: async (to, from, next) => {
    try {
      const { data } = await new DocumentFactory('events').all({ page: to.query.page, limit: to.query.limit, sort: to.query.sort }).then(res => res.data);
      next((vue) => {
        const vm = vue;
        vm.events.active = data.posts.filter(item => item.isActive === true);
        vm.events.inActive = data.posts.filter(item => item.isActive === false);
        vm.pagination = data.pagination;
      });
    } catch (error) {
      next((Vue) => {
        const vm = Vue;
        vm.$logger(error);
      });
    }
  },
  metaInfo() {
    return {
      title: this.title,
    };
  },
  methods: {
  },
};
</script>
