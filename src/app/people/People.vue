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
              <span class="meta">Parliament: {{ positionData.legislative_period }},
                Tenure:  {{ positionData.start_date }} -to- {{ positionData.end_date }}</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <h2> Parties </h2>

          <div v-for="(person) in groupByParty" :key="person.organization + '_peopleByParty'" class=" col-md-12">
            <div>
              <ul>
                <li v-for="(party, index) in person.persons" :key="index">
                  {{ index && index.length ? index : 'Nonpartisanism' }}
                  <span class="pull-right">{{ party.length }} seat(s)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <h2>People</h2>
          Find a person by name, party, or state
          <div class="input-group mb-3">
            <input type="text" class="form-control"
                   v-model="search"
                   placeholder="e.g. Olusegun Dada, Peoples Democratic Party, OR Lagos"
            >
            <div class="input-group-append">
              <button class="btn btn-outline-secondary">Search</button>
            </div>
          </div>
          <div v-for="(item) in groupByState" :key="item.organization + '_peopleByState'" class=" col-md-12">
            <div class="card">
              <div class="row no-gutters" v-for="(state, index) in item.persons" :key="index">
                <div class="col-md-4">
                  <h3 class="p-3 mb-3">{{ index }}</h3>
                </div>
                <div class="col-md-8">
                  <div class="card-body no-border">
                    <div class="card mb-12 shadow-sm p-2 mb-2 bg-white rounded" v-for="(person) in state" :key="person.id">
                      <div class="media">
                        <b-img-lazy v-bind="mainProps" :src="person.images.thumbnail.url"
                                    class="align-self-start mr-3"
                                    thumbnail fluid
                        />
                        <div class="media-body">
                          <a :href="person.url" class="stretched-link">{{ person.official_name }}</a>
                          <span class="d-block">{{ person.party }}</span>
                          <span class="d-block" v-if="person.area && person.area.place">
                            {{ (person.address.district.value) ? `${person.address.district.value}` : '' }}
                            {{ (person.address.district.value) ? `(${person.area.place.name})` : person.area.place.name }}</span>
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
</template>

<script>
import PeopleService from '@/app/shared/services/people.service';

export default {
  data() {
    return {
      people: [],
      search: '',
      mainProps: {
        blank: true, width: 70, height: 70, blankColor: '#bbb', class: 'm1',
      },
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
  },
  beforeRouteUpdate(to, from, next) {
    this.$options.beforeRouteEnter(to, from, next);
  },
  beforeRouteEnter: async (to, from, next) => {
    try {
      const { data } = await new PeopleService(to.meta.position).findAll().then(res => res.data);

      next((vue) => {
        const vm = vue;
        vm.people = data.people;
        next();
      });
    } catch (error) {
      next((Vue) => {
        const vm = Vue;
        vm.$logger(error);
      });
    }
  },
  methods: {
    groupBy(arr, key) {
      const res = [];

      arr.map((val) => {
        const result = {};
        result.organization = val.organization;
        result.legislative_period = val.legislative_period;
        result.start_date = val.start_date;
        result.end_date = val.end_date;
        result.persons = {};

        let unorderedPersons = {};

        val.persons.filter(a => (a.official_name || '').toLowerCase().includes(this.search.toLowerCase())
        || (a.name || '').toLowerCase().includes(this.search.toLowerCase())
        || (a.state || '').toLowerCase().includes(this.search.toLowerCase())
        || (a.party || '').toLowerCase().includes(this.search.toLowerCase()))
          .forEach((item) => {
            if (!unorderedPersons[item[key]]) {
              unorderedPersons[item[key]] = [];
            }
            unorderedPersons[item[key]].push(item);
          });


        Object.keys(unorderedPersons).sort().forEach((k) => {
          unorderedPersons[k] = Object.values(unorderedPersons[k]).sort((a, b) => {
            const x = a.official_name.toLowerCase();
            const y = b.official_name.toLowerCase();
            /* eslint-disable no-nested-ternary */
            return x < y ? -1 : x > y ? 1 : 0;
          });
          result.persons[k] = unorderedPersons[k];
        });

        unorderedPersons = null;
        res.push(result);
        return res;
      });

      return res;
    },
  },
};
</script>
