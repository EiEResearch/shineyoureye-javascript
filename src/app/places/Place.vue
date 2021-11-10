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
              <h2 class="meta">{{ subHeading }}</h2>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <div class="content shadow p-3 mb-2 bg-white rounded">
            <div id="map-canvas" class="mb-3" />
            <div class="your-governor mb-4" v-if="people.governor && people.governor.length">
              <h5 class="pb-3 mb-2 border-bottom">Your Governor</h5>
              <div class="row">
                <div class="col-sm-4">
                  <p class="text-wrap small">
                    Your Governor, whom you popularly elected, serve as the chief executive officer of {{ people.governor[0].area.place.name }} State.
                    As a state manager, your governor is responsible for implementing state laws and overseeing the operation of the state executive branch
                  </p>
                </div>
                <div class="col-sm-8">
                  <div class="mb-2" v-for="(person, index) in people.governor" :key="'governor_' + index">
                    <div class="media">
                      <b-img-lazy v-bind="mainProps" :src="person.images.thumbnail.url"
                                  class="align-self-start mr-3"
                                  thumbnail fluid
                      />
                      <div class="media-body text-truncate">
                        <a :href="person.url">{{ person.name }}</a>
                        <span class="d-block text-wrap" v-if="person.area && person.area.place">
                          {{ (person.party) ? person.party + ' - ': '' }}
                          <a :href="person.area.url">{{ person.area.place.name }}</a>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="your-local-government mb-4" v-if="people.localgovernment && people.localgovernment.length">
              <h5 class="pb-3 mb-2 border-bottom">Your Local Government Council Chairman</h5>
              <div class="row">
                <div class="col-sm-4">
                  <p class="text-wrap small">
                    Your local government council chairman is responsible for delivering a broad range
                    of services in relation to roads; traffic; economic and community development; environment, recreation and amenity services
                    and maintaining the register of electors.
                  </p>
                </div>
                <div class="col-sm-8">
                  <div class="mb-2" v-for="(person, index) in people.localgovernment" :key="'localgovernment_' + index">
                    <div class="media">
                      <b-img-lazy v-bind="mainProps" :src="person.images.thumbnail.url"
                                  class="align-self-start mr-3"
                                  thumbnail fluid
                      />
                      <div class="media-body text-truncate">
                        <a :href="person.url">{{ person.name }}</a>
                        <span class="d-block text-wrap" v-if="person.area && person.area.place">
                          {{ (person.party) ? person.party + ' - ': '' }}
                          {{ (person.address.district.value) ? `${person.address.district.value}` : '' }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="your-honorables mb-4" v-if="people.honorables && people.honorables.length">
              <h5 class="pb-3 mb-2 border-bottom">Your State Assembly Members</h5>
              <div class="row">
                <div class="col-sm-4">
                  <p class="text-wrap small">
                    Your {{ people.honorables.length }} State Assembly Member(s) represents you in the {{ people.governor[0].area.place.name }} State Assembly.
                    Areas covered include budget, culture, sport and tourism, health, planning, transport, and roads.
                  </p>
                </div>
                <div class="col-sm-8">
                  <div class="mb-2" v-for="(person, index) in people.honorables" :key="'honorable_' + index">
                    <div class="media">
                      <b-img-lazy v-bind="mainProps" :src="person.images.thumbnail.url"
                                  class="align-self-start mr-3"
                                  thumbnail fluid
                      />
                      <div class="media-body text-truncate">
                        <a :href="person.url">{{ person.name }}</a>
                        <span class="d-block text-wrap" v-if="person.area && person.area.place">
                          {{ (person.party) ? person.party + ' - ': '' }}
                          {{ (person.address.district.value) ? `${person.address.district.value}` : '' }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="your-senators mb-4" v-if="people.senate && people.senate.length">
              <h5 class="pb-3 mb-2 border-bottom">Your Senators</h5>
              <div class="row">
                <div class="col-sm-4">
                  <p class="text-wrap small">
                    Your {{ people.senate.length }} Senator(s) represents {{ place.name }} in the Senate (Upper House).
                    The Senate scrutinise proposed laws and the budget of the country, and provide oversight of its other decision-making bodies.
                  </p>
                </div>
                <div class="col-sm-8">
                  <div class="mb-2" v-for="(person, index) in people.senate" :key="'senator_' + index">
                    <div class="media">
                      <b-img-lazy v-bind="mainProps" :src="person.images.thumbnail.url"
                                  class="align-self-start mr-3"
                                  thumbnail fluid
                      />
                      <div class="media-body text-truncate">
                        <a :href="person.url">{{ person.name }}</a>
                        <span class="d-block text-wrap" v-if="person.area && person.area.place">
                          {{ (person.party) ? person.party + ' - ': '' }}
                          <a :href="person.area.url">{{ person.area.place.name }}</a>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="your-representatives mb-4" v-if="people.representatives && people.representatives.length">
              <h5 class="pb-3 mb-2 border-bottom">Your Federal House of Reps. Members</h5>
              <div class="row">
                <div class="col-sm-4">
                  <p class="text-wrap small">
                    Your {{ people.representatives.length }} Representative(s) represents {{ place.name }} in the Federal House of Representatives (Lower House).
                    The House of Representatives is responsible for making laws in the country and for overall scrutiny of all aspects of government.
                  </p>
                </div>
                <div class="col-sm-8">
                  <div class="mb-2" v-for="(person, index) in people.representatives" :key="'representative_' + index">
                    <div class="media">
                      <b-img-lazy v-bind="mainProps" :src="person.images.thumbnail.url"
                                  class="align-self-start mr-3"
                                  thumbnail fluid
                      />
                      <div class="media-body text-truncate">
                        <a :href="person.url">{{ person.name }}</a>
                        <span class="d-block text-wrap" v-if="person.area && person.area.place">
                          {{ (person.party) ? person.party + ' - ': '' }}
                          <a :href="person.area.url">{{ person.area.place.name }}</a>
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
    <page-feedback-component />
    <page-sharing-component />
  </div>
</template>

<script>
import PlacesService from '@/app/shared/services/places.service';

export default {
  name: 'Place',
  data() {
    return {
      title: 'Your representative',
      subHeading: 'Your elected representatives at different levels of government.',
      place: {},
      people: {},
      mainProps: {
        blank: true, width: 58, height: 70, blankColor: '#bbb', class: 'm1',
      },
      map: {
        id: 'map-canvas',
        tile: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
        initialZoom: 6,
        options: {
          minZoom: 0,
          maxZoom: 16,
          attribution: `Map data © <a href="https://carto.com/attribution">CARTO</a>, 
          © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'`,
        },
        style: {
          color: '#6AC898',
          fillColor: '#BBF6D7',
          fillOpacity: 0.5,
          radius: 500,
          weight: 2,
        },
      },
      geojson: {},
      cordinate: [],
    };
  },
  metaInfo() {
    return {
      title: this.title,
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
      let geojson;
      let geometry;
      let result;

      if (to.params.legislature && to.params.slug) {
        const { data } = await new PlacesService().findPlacesPeopleByLegislature({
          legislature: to.params.legislature,
          slug: to.params.slug,
        });

        result = { ...data.data };
      } else if (!to.params.legislature && to.params.slug) {
        const { data } = await new PlacesService().findPlacesPeopleBySlug(to.params.slug);

        result = { ...data.data };
      }

      if (result.place) {
        [geojson, geometry] = await Promise.all([
          new PlacesService().getGeometryGeoJson(result.place.id),
          new PlacesService().getGeometry(result.place.id),
        ]);
      }

      next((vue) => {
        const vm = vue;
        vm.place = Object.freeze(result.place);
        vm.title = `${result.place.name || vm.title}`;
        vm.people = Object.freeze(vm.groupBy(result.people));
        vm.cordinate = Object.freeze([geometry.data.data.centre_lat, geometry.data.data.centre_lon]);
        vm.geojson = Object.freeze({ ...geojson.data.data });
        vm.initMap();
        next();
      });
    } catch (error) {
      next({ name: 'error', params: [to.path], replace: true });
    }
  },
  methods: {
    initMarkers(map, geoJSONFeature) {
      const geoJSONLayer = L.geoJSON(geoJSONFeature, { style: this.map.style }).addTo(map);
      map.fitBounds(geoJSONLayer.getBounds());
    },
    initMap() {
      const map = L.map(this.map.id).setView(this.cordinate, this.map.initialZoom);
      L.tileLayer(this.map.tile, this.map.options).addTo(map);
      this.initMarkers(map, this.geojson);
    },
    groupBy(obj) {
      const res = Object.assign({}, obj);
      const keys = Object.keys(res);

      keys.forEach((item) => {
        res[item] = Object.values(res[item]).sort((a, b) => {
          const x = a.official_name.toLowerCase();
          const y = b.official_name.toLowerCase();
          /* eslint-disable no-nested-ternary */
          return x < y ? -1 : x > y ? 1 : 0;
        });
      });

      return res;
    },
  },
};
</script>
