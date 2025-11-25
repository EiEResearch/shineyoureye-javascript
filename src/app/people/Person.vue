<template>
  <div>
    <div id="single-blog">
      <!-- Page Header -->
      <header class="masthead">
        <div class="overlay" />
        <div class="container">
          <div class="row">
            <div class="col-lg-8 col-md-10 mx-auto d-flex">
              <div class="post-heading">
                <h1>{{ (personData.profile.title) ? personData.profile.title + ' ' : '' }}{{ personData.profile.name }}</h1>
                <!-- <h2 class="subheading">Problems look mighty small from 150 miles up</h2> -->
                <span class="meta" v-if="personData.position"> {{ getFormattedHeaderMeta() }} </span>
                <!-- <span class="meta">{{ personData.position }}</span> -->
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- <pre> {{ personData }} </pre> -->
      <section v-if="profile.name && personData.position">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 col-md-10 mx-auto">
              <div class="d-flex flex-wrap align-content-start p-3" style="background-color: #ece8e5;">
                <div class="col-xs-3 order-0">
                  <b-img-lazy v-bind="profileImage" v-error-image
                              :src="profile.images.original.url"
                              :alt="person.name"
                              class="align-self-start mr-4"
                              rounded fluid
                  />
                </div>
                <div class="col-sm col-md col-lg px-md-2 pr-md-4 order-1">
                  <!-- <h3 class="py-4">{{ (profile.title) ? profile.title+ ' ' : '' }}{{ profile.official_name }}</h3> -->
                  <div>
                    <p class="lead">
                      {{ profile.official_name }} is a Nigerian politician at the <b>{{ personData.organization }}</b> level.
                      <span v-html="getFormattedProfileSnippet(profile)" />
                    </p>
                    <p class="lead" v-if="profile.identifiers.official_position.value">
                      {{ profile.official_name }} is the <b>{{ (profile.identifiers.official_position.value) }}</b>.
                    </p>
                  </div>
                </div>
              </div>
              <div class="clearfix hidden-xs mt-4">
                <h4 class="mb-3">Personal Data</h4>
                <div class="px-2">
                  <div class="row mb-2" v-if="profile.birth_date">
                    <div class="col-md-3"><strong>Date of birth</strong></div>
                    <div class="col-md-9">{{ profile.birth_date }}</div>
                  </div>
                  <div class="row mb-2" v-if="profile.state">
                    <div class="col-md-3"><strong>State</strong></div>
                    <div class="col-md-9">{{ profile.state }}</div>
                  </div>
                  <div class="row mb-2" v-if="profile.party">
                    <div class="col-md-3"><strong>Party</strong></div>
                    <div class="col-md-9">{{ profile.party }}</div>
                  </div>
                  <div class="row mb-2" v-if="profile.title">
                    <div class="col-md-3"><strong>Title</strong></div>
                    <div class="col-md-9">{{ profile.title }}</div>
                  </div>
                  <div class="row mb-2" v-if="profile.gender">
                    <div class="col-md-3"><strong>Gender</strong></div>
                    <div class="col-md-9">{{ profile.gender }}</div>
                  </div>
                  <div class="row mb-2" v-if="profile.address.postal_address.value">
                    <div class="col-md-3"><strong>Postal Address</strong></div>
                    <div class="col-md-9">{{ profile.address.postal_address.value }}</div>
                  </div>
                  <div class="row mb-2" v-if="profile.contact.email.value">
                    <div class="col-md-3"><strong>E-Mail</strong></div>
                    <div class="col-md-9">{{ profile.contact.email.value }}</div>
                  </div>
                  <div class="row mb-2" v-if="profile.contact.phone.value">
                    <div class="col-md-3"><strong>Phone</strong></div>
                    <div class="col-md-9">{{ profile.contact.phone.value }}</div>
                  </div>
                  <div class="row mb-2" v-if="profile.contact.facebook.value">
                    <div class="col-md-3"><strong>Facebook</strong></div>
                    <div class="col-md-9 text-truncate"><a :href="profile.contact.facebook.note" target="_blank">{{ profile.contact.facebook.value }}</a></div>
                  </div>
                  <div class="row mb-2" v-if="profile.contact.twitter.value">
                    <div class="col-md-3"><strong>Twitter</strong></div>
                    <div class="col-md-9 text-truncate"><a :href="profile.contact.twitter.note" target="_blank">{{ profile.contact.twitter.value }}</a></div>
                  </div>
                  <div class="row mb-2" v-if="profile.contact.instagram.value">
                    <div class="col-md-3"><strong>Instagram</strong></div>
                    <div class="col-md-9 text-truncate"><a :href="profile.contact.instagram.note" target="_blank">{{ profile.contact.instagram.value }}</a></div>
                  </div>
                  <div class="row mb-2" v-if="profile.links.website.url">
                    <div class="col-md-3"><strong>Webpage</strong></div>
                    <div class="col-md-9"><a :href="'mailto:' + profile.contact.email.value" target="_blank">{{ profile.contact.email.value }}</a></div>
                  </div>
                  <div class="row mb-2" v-if="profile.links.wikipedia.url">
                    <div class="col-md-3"><strong>Wikipedia</strong></div>
                    <div class="col-md-9 text-truncate"><a :href="profile.links.wikipedia.url" target="_blank">{{ profile.links.wikipedia.url }}</a></div>
                  </div>
                </div>
              </div>
              <div class="clearfix  mt-4" v-if="profile.summary_doc.url && profile.summary_doc.body">
                <h4 class="mb-3">
                  Education, Career and Political Office
                  <!-- <a :href="'http://prose.io/#theyworkforyou/shineyoureye-prose/edit/gh-pages/summaries/'+ profile.summary_doc.url +'.md'" class="as-close small float-right">
                    Edit
                  </a> -->
                </h4>
                <div class="table-responsive px-2" v-html="profile.summary_doc.body" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <page-feedback-component />
    <page-sharing-component />
  </div>
</template>

<script>
import PeopleService from '@/app/shared/services/people.service';

export default {
  name: 'Person',
  data() {
    return {
      person: [],
      profile: {},
      title: '',
      mainProps: {
        blank: true, width: 20, height: 20, blankColor: '#bbb', class: 'm1',
      },
      profileImage: {
        blank: true, width: 250, height: 250, blankColor: '#bbb', class: 'm1',
      },
      attributes: {
        headerMeta: {
          'State Representative': 'Representative at State House of Assembly',
          'Federal Representative': 'Federal Representative of %legislative_period',
          Senator: 'Senator of %legislative_period',
          Governor: 'Governor at Executive',
        },
        profile: {
          'State Representative': '%name currently serves as the <b>State Representatives</b> representing %area constituency at the %legislative_period.',
          'Federal Representative': '%name currently serves as the <b>Federal Representative</b> representing %area constituency in the %legislative_period.',
          Senator: '%name currently serves as the <b>Senator</b> representing %area district in the %legislative_period.',
          Governor: '',
        },
      },
    };
  },
  metaInfo() {
    return {
      title: this.title,
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
        profile: (this.profile) || {},
      };
    },
  },
  methods: {
    getFormattedDistrict(profile) {
      try {
        return (profile && profile.address.district.value) ? profile.address.district.value : profile.area.place.name;
      } catch (error) {
        this.$logger(error);
      }
    },
    getFormattedProfileSnippet(profile) {
      try {
        const prf = this.attributes.profile[this.personData.position];

        if (!prf && !prf.trim().length) return '';
        return prf.replace(/%name/g, profile.official_name)
          .replace(/%legislative_period/g, `<b>${this.personData.legislative_period}</b>`)
          .replace(/%area/g, `<mark><a href="${profile.area.url}">${this.getFormattedDistrict(profile)}</a></mark>`);
      } catch (error) {
        this.$logger(error);
      }
    },
    getFormattedHeaderMeta() {
      try {
        const attr = this.attributes.headerMeta[this.personData.position];

        if (!attr) return '';
        return attr.replace(/%legislative_period/g, `${this.personData.legislative_period}`);
      } catch (error) {
        this.$logger(error);
      }
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
          vm.person = data.people;
          // eslint-disable-next-line prefer-destructuring
          vm.profile = data.people[0].persons[0] || {};
          vm.title = vm.profile.official_name || '';
        }
        next();
      });
    } catch (error) {
      next({ name: 'error', params: [to.path], replace: true });
    }
  },
};
</script>
