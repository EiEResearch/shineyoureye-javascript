<template>
  <div>
    <!-- Page Header -->
    <header class="masthead">
      <div class="overlay" />
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto d-flex">
            <div class="post-heading">
              <h1>{{ positionData.organization }}</h1>
              <!-- <h2 class="subheading">Problems look mighty small from 150 miles up</h2> -->
              <span class="meta" v-if="!['honorables'].includes(name)">{{ positionData.legislative_period }},
                Tenure:  {{ positionData.start_date }} -to- {{ positionData.end_date }}</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <section>
      <div class="container">
        <div class="row mb-4">
          <div class="col-lg-8 col-md-10 mx-auto">
            <h2> Parties </h2>
            <hr>
            <div v-for="(person) in groupByParty" :key="person.organization + '_peopleByParty'" class=" col-md-12">
              <div>
                <ul style="list-style-type:none;">
                  <li v-for="(party, index) in person.persons" :key="index" class="mb-2">
                    <div v-if="party[0] && party[0].length">
                      <img src="/images/icons/people-fill.svg" alt=""
                           width="20"
                           height="20"
                      >
                      <span class="pl-2">{{ party[0] }},</span>
                      <span class="pull-right"> {{ party[1].length }} seat(s)</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <h2>People</h2>
            <div class="row d-none">
              <div class="col-md-12">
                Find a person by name or party
                <div class="input-group mb-3">
                  <input type="text" class="form-control"
                         v-model="search"
                         placeholder="e.g. Olusegun Dada OR Peoples Democratic Party"
                  >
                  <div class="input-group-append">
                    <button class="btn btn-outline-secondary">Search</button>
                  </div>
                </div>
              </div>
            </div>
            <hr>

            <div class="row mt-2">
              <div class="col-md-12">
                <div v-for="(item) in groupByUpdatedState" :key="item.organization + '_peopleByUpdatedState'">
                  <div class="no-border shadow-sm rounded">
                    <div class="row no-gutters expandableItem" v-for="(state, index) in item.persons" :key="index">
                      <div class="col-md-3">
                        <h3 class="p-3 mb-3" data-accordion-element-trigger>{{ state[0] }}</h3>
                      </div>
                      <div class="col-md-9" data-accordion-element-content>
                        <div class="card-body no-border">
                          <div class="shadow-sm p-2 mb-2 bg-white rounded" v-for="(person) in state[1]" :key="person.id">
                            <div class="media">
                              <b-img-lazy v-bind="mainProps" :src="person.images.thumbnail.url"
                                          class="align-self-start mr-3"
                                          thumbnail fluid
                              />
                              <div class="media-body text-break">
                                <a :href="person.url">{{ person.official_name }}</a>
                                <span class="d-block">{{ person.party }}</span>
                                <span class="d-block" v-if="person.area && person.area.place">
                                  <a :href="person.area.url">
                                    {{ (person.address.district.value) ? `${person.address.district.value}` : '' }}
                                    {{ (person.address.district.value) ? `- ${person.area.place.name}` : person.area.place.name }}
                                  </a>
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
              <div class="col-md-12">
                <h3 class="mt-4">Other Members</h3>
                <p class="mb-4">We only have names of the state representatives in the states listed below, we do not have the contact details.</p>
                <div v-for="(item) in groupByOtherState" :key="item.organization + '_peopleByOtherState'">
                  <div class="no-border shadow-sm rounded">
                    <div class="row no-gutters expandableItem" v-for="(state, index) in item.persons" :key="index">
                      <div class="col-md-3">
                        <h3 class="p-3 mb-3" data-accordion-element-trigger>{{ state[0] }}</h3>
                      </div>
                      <div class="col-md-9" data-accordion-element-content>
                        <div class="card-body no-border">
                          <div class="shadow-sm p-2 mb-2 bg-white rounded" v-for="(person) in state[1]" :key="person.id">
                            <div class="media">
                              <b-img-lazy v-bind="mainProps" :src="person.images.thumbnail.url"
                                          class="align-self-start mr-3"
                                          thumbnail fluid
                              />
                              <div class="media-body text-break">
                                <a :href="person.url">{{ person.official_name }}</a>
                                <span class="d-block">{{ person.party }}</span>
                                <span class="d-block" v-if="person.area && person.area.place">
                                  <a :href="person.area.url">
                                    {{ (person.address.district.value) ? `${person.address.district.value}` : '' }}
                                    {{ (person.address.district.value) ? `- ${person.area.place.name}` : person.area.place.name }}
                                  </a>
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
      </div>
    </section>
    <page-feedback-component />
    <page-sharing-component />
  </div>
</template>

<script>
import PeopleService from '@/app/shared/services/people.service';

export default {
  name: 'StateRepresentatives',
  data() {
    return {
      people: [],
      name: 'Politicans',
      search: '',
      mainProps: {
        blank: true, width: 70, height: 70, blankColor: '#bbb', class: 'm1',
      },
      honorablesState: ['Anambra', 'Ekiti', 'Enugu', 'Kano', 'Kogi', 'Kwara', 'Lagos', 'Ondo', 'Ogun',
        'Oyo', 'Osun', 'Imo', 'Edo', 'Benue', 'Jigawa', 'Kaduna', 'Zamfara', 'Bayelsa',
        'Ebonyi', 'Abia', 'Adamawa', 'Akwa Ibom', 'Sokoto', 'Bauchi'],
    };
  },
  computed: {
    positionData() {
      return {
        organization: (this.people[0] || {}).organization || 'Politicans',
        legislative_period: (this.people[0] || {}).legislative_period || 'Nigeria',
        start_date: (this.people[0] || {}).start_date || process.env.VUE_APP_LEGISLATURE_START_DATE,
        end_date: (this.people[0] || {}).end_date || process.env.VUE_APP_LEGISLATURE_END_DATE,
      };
    },

    groupByState() {
      return this.groupBy(this.people, 'state');
    },
    groupByParty() {
      return this.groupBy(this.people, 'party');
    },
    groupByUpdatedState() {
      return this.groupBy(this.people, 'state', 'complete');
    },
    groupByOtherState() {
      return this.groupBy(this.people, 'state', 'other');
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
      const { data } = await new PeopleService(to.meta.position).findAll().then(res => res.data);

      next((vue) => {
        const vm = vue;
        vm.people = Object.freeze(data.people);
        vm.name = to.name;
        next();
      });
    } catch (error) {
      next({ name: 'error', params: [to.path], replace: true });
    }
  },
  methods: {
    groupBy(arr, key, flag) {
      const res = [];
      const n = this.name;

      arr.map((val) => {
        const result = {};
        result.organization = val.organization;
        result.legislative_period = val.legislative_period;
        result.start_date = val.start_date;
        result.end_date = val.end_date;
        result.persons = new Map();

        let unorderedPersons = {};

        val.persons.filter(a => (a.official_name || '').toLowerCase().includes(this.search.toLowerCase())
        || (a.name || '').toLowerCase().includes(this.search.toLowerCase())
        || (a.party || '').toLowerCase().includes(this.search.toLowerCase()))
          .forEach((item) => {
            if (!unorderedPersons[item[key]]) {
              unorderedPersons[item[key]] = [];
            }
            unorderedPersons[item[key]].push(item);
          });

        let unorderedPersonsKeys = [];
        if (n === 'honorables' && flag === 'complete' && key === 'state') {
          const states = Object.assign([], this.honorablesState);
          unorderedPersonsKeys = Object.keys(unorderedPersons).filter(x => states.indexOf(x) >= 0).sort();
        } else if (n === 'honorables' && flag === 'other' && key === 'state') {
          const states = Object.assign([], this.honorablesState);
          unorderedPersonsKeys = Object.keys(unorderedPersons).filter(x => states.indexOf(x) < 0).sort();
        } else {
          unorderedPersonsKeys = Object.keys(unorderedPersons).sort();
        }

        unorderedPersonsKeys.forEach((k) => {
          unorderedPersons[k] = Object.values(unorderedPersons[k]).sort((a, b) => {
            const x = a.official_name.toLowerCase();
            const y = b.official_name.toLowerCase();
            /* eslint-disable no-nested-ternary */
            return x < y ? -1 : x > y ? 1 : 0;
          });
          if (!result.persons.has(k)) {
            result.persons.set(k, unorderedPersons[k]);
          } else { result.persons.get(k).push(unorderedPersons[k]); }
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
  metaInfo() {
    return {
      title: this.name.charAt(0).toUpperCase() + this.name.slice(1),
    };
  },
};
</script>
