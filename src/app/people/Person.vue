<template>
  <div>
    <not-found-component v-if="!isMatched" />
    <div v-else>
      <!-- Page Header -->
      <header class="masthead">
        <div class="overlay" />
        <div class="container">
          <div class="row">
            <div class="col-lg-8 col-md-10 mx-auto d-flex">
              <div class="post-heading">
                <h1>{{ personData.profile.name }}</h1>
                <!-- <h2 class="subheading">Problems look mighty small from 150 miles up</h2> -->
                <span class="meta">{{ personData.position }} at {{ personData.legislative_period }}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <pre> {{ personData }} </pre>
    </div>
  </div>
</template>

<script>
import PeopleService from '@/app/shared/services/people.service';

export default {
  name: 'Person',
  data() {
    return {
      person: [],
      isMatched: false,
      mainProps: {
        blank: true, width: 70, height: 70, blankColor: '#bbb', class: 'm1',
      },
    };
  },
  computed: {
    personData() {
      return {
        organization: (this.person[0] || {}).organization || 'Politicans',
        position: (this.person[0] || {}).position || 'Politican',
        legislative_period: (this.person[0] || {}).legislative_period || 'Nigeria',
        start_date: (this.person[0] || {}).start_date || process.env.VUE_APP_LEGISLATURE_START_DATE,
        end_date: (this.person[0] || {}).end_date || process.env.VUE_APP_LEGISLATURE_END_DATE,
        profile: (this.person[0].persons[0]) || {},
      };
    },
  },
  beforeRouteUpdate(to, from, next) {
    try {
      this.$options.beforeRouteEnter(to, from, next);
    } catch (error) {
      next((Vue) => {
        const vm = Vue;
        vm.$logger(error);
      });
    }
  },
  beforeRouteEnter: async (to, from, next) => {
    try {
      const { data } = await new PeopleService(to.meta.position).findPoliticianBySlug(to.params.slug).then(res => res.data);

      next((vue) => {
        const vm = vue;

        if (data.people && data.people.length) {
          vm.isMatched = true;
          vm.person = data.people;
        }
        next();
      });
    } catch (error) {
      next({ name: 'error', params: [to.path], replace: true });
    }
  },
};
</script>
