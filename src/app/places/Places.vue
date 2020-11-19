<template>
  <div>
    <!-- Page Header -->
    <header class="masthead">
      <div class="overlay" />
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto d-flex">
            <div class="post-heading">
              <h1>{{ title }}</h1>
              <!-- <h2 class="subheading">{{ post.excerpt }}</h2> -->
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <div class="content">
            <b-nav pills>
              <b-nav-item :active="addActiveClass('states')" href="/places/state">States</b-nav-item>
              <b-nav-item :active="addActiveClass('senatorial-district')" href="/places/senatorial-district">Senatorial District</b-nav-item>
              <b-nav-item :active="addActiveClass('federal-constituency')" href="/places/federal-constituency">Federal Constituencies</b-nav-item>
              <b-nav-item :active="addActiveClass('local-government')" href="/places/local-government">Local Government</b-nav-item>
              <b-nav-item :active="addActiveClass('state-constituency')" href="/places/state-constituency">State Constituencies</b-nav-item>
            </b-nav>
            <hr>
          </div>
          <div class="col-md-12">
            <div v-for="(item) in groupByState" :key="item.organization + '_peopleByState'">
              <div class="no-border shadow-sm rounded">
                <div class="row no-gutters expandableItem" v-for="(state, index) in item.places" :key="index">
                  <div class="col-md-3">
                    <h3 class="p-3 mb-3" data-accordion-element-trigger>{{ state[0] }}</h3>
                  </div>
                  <div class="col-md-9" data-accordion-element-content>
                    <div class="card-body no-border">
                      <div class="shadow-sm p-2 mb-2 bg-white rounded" v-for="(place) in state[1]" :key="place.id">
                        <div class="media">
                          <b-img-lazy v-bind="mainProps" :src="place.area.image.url"
                                      class="align-self-start mr-3"
                                      thumbnail fluid
                          />
                          <div class="media-body text-wrap">
                            <h5 class="d-block"><a :href="place.area.url">{{ (place.address.district.value) ? `${place.address.district.value}` : place.area.place.name }}</a></h5>
                            <span class="d-block" v-if="place.area.place.type_name.toLowerCase() !== place.area.state_place.type_name.toLowerCase()">
                              Parent place: {{ (place.address.district.value) ? place.area.parent_place.name : place.area.state_place.name }}
                            </span>
                            <span class="d-block">{{ areaType }}</span>
                            <span class="d-block" v-if="place.area.place.type_name.toLowerCase() !== place.area.state_place.type_name.toLowerCase()">
                              {{ item.organization }} {{ new Date(item.start_date).getFullYear() }}-{{ new Date(item.end_date).getFullYear() }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <page-feedback-component />
    <page-sharing-component />
  </div>
</template>
<script>
import PeopleService from '@/app/shared/services/people.service';

export default {
  name: 'Places',
  data() {
    return {
      pathMeta: '',
      areaType: '',
      title: 'Places',
      people: [],
      mainProps: {
        blank: true, width: 70, height: 70, blankColor: '#bbb', class: 'm1',
      },
    };
  },
  metaInfo() {
    return {
      title: this.areaType || this.title,
    };
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
      const { data } = await new PeopleService(to.meta.position).findAll().then(res => res.data);

      next((vue) => {
        const vm = vue;
        vm.pathMeta = (to.name || '').toLowerCase();
        vm.areaType = (to.meta.type || '');
        vm.people = Object.freeze(data.people);
        next();
      });
    } catch (error) {
      next({ name: 'error', params: [to.path], replace: true });
    }
  },
  computed: {
    groupByState() {
      return this.groupBy(this.people, 'state');
    },
  },
  methods: {
    addActiveClass(path) {
      return String(path || '').toLowerCase() === String(this.pathMeta || '').toLowerCase();
    },
    groupBy(arr, key) {
      const res = [];

      arr.map((val) => {
        const result = {};
        result.organization = val.organization;
        result.legislative_period = val.legislative_period;
        result.start_date = val.start_date;
        result.end_date = val.end_date;
        result.places = new Map();

        let unorderedPersons = {};

        val.persons.forEach((item) => {
          if (!unorderedPersons[item[key]]) {
            unorderedPersons[item[key]] = [];
          }
          unorderedPersons[item[key]].push({
            address: item.address,
            area: item.area,
          });
        });


        Object.keys(unorderedPersons).sort().forEach((k) => {
          unorderedPersons[k] = Object.values(unorderedPersons[k]).sort((a, b) => {
            const x = a.address.district.value.toLowerCase() || a.area.place.name.toLowerCase();
            const y = b.address.district.value.toLowerCase() || b.area.place.name.toLowerCase();
            /* eslint-disable no-nested-ternary */
            return x < y ? -1 : x > y ? 1 : 0;
          });
          if (!result.places.has(k)) {
            result.places.set(k, unorderedPersons[k]);
          } else { result.places.get(k).push(unorderedPersons[k]); }
        });

        unorderedPersons = null;
        res.push(Object.freeze(result));
        return res;
      });

      return res;
    },
  },
  mounted() {
    this.$nextTick()
      .then(() => {
        // eslint-disable-next-line no-new
        new GianniAccordion({
          elements: '.expandableItem',
          openAtLandingIndex: 0,
        });
      });
  },
};
</script>
