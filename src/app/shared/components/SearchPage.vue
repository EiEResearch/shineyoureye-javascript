<template>
  <div id="search">
    <search-loader-component v-if="isLoading" />
    <div class="container" v-else>
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto my-5">
          <div>
            <div class="gsc-result-info-container" v-if="area.url">
              <span v-html="resultMeta" class="gsc-result-info" />
              <hr>
            </div>
            <div class="gsc-result" v-if="area.url || noResult">
              <div class="gsc-webResult gsc-result" v-if="area.url">
                <div class="gs-webResult gs-result">
                  <div class="gsc-thumbnail-inside bg-white rounded">
                    <div class="gs-title">
                      <a class="gs-title" :href="linkTemplate.replace(/%s/g, `${area.url}`)"> {{ titleTemplate.replace(/%s/g, area.place.name) }} </a>
                    </div>
                    <div class="gsc-url-top my-1">
                      <div class="gs-bidi-start-align gs-visibleUrl gs-visibleUrl-long" dir="ltr" style="word-break:break-all;">
                        {{ linkTemplate.replace(/%s/g, `${area.url}`) }}
                      </div>
                    </div>
                    <div class="media">
                      <a :href="linkTemplate.replace(/%s/g, `${area.url}`)">
                        <b-img-lazy v-bind="mainProps" :src="area.image.url"
                                    class="align-self-start mr-2"
                                    thumbnail fluid
                        />
                      </a>
                      <div class="media-body text-wrap">
                        <span class="gs-snippet">{{ area.place.name }}</span>
                        <span class="d-block gs-snippet">{{ area.place.type_name }}, {{ area.place.country_name }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="gsc-webResult gsc-result" v-if="noResult">
                <div class="gsc-resultsRoot gsc-tabData gsc-tabdActive">
                  <div class="gsc-results gsc-webResult">
                    <div class="gsc-expansionArea">
                      <div class="gsc-webResult gsc-result">
                        <div class="gs-webResult gs-result gs-no-results-result"><div class="gs-snippet">No Results</div></div>
                      </div><div class="gsc-adBlockNoHeight" style="height: 0px;" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="gcsc-more-maybe-branding-root mt-4">
                <div class="gcsc-find-more-on-google">
                  <span class="gcsc-find-more-on-google-text">Search for </span><span class="gcsc-find-more-on-google-query">{{ searchQuery }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="gcse-searchresults-only" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable func-names */
import PlacesService from '@/app/shared/services/places.service';

export default {
  metaInfo() {
    return {
      title: 'Search',
    };
  },
  data() {
    return {
      searchQuery: '',
      isLoading: true,
      noResult: false,
      area: {},
      titleTemplate: `%s :: ${process.env.VUE_APP_SITE_NAME}`,
      linkTemplate: `${process.env.VUE_APP_URL}%s`,
      resultMeta: '',
      mainProps: {
        blank: true, width: 60, height: 60, blankColor: '#bbb', class: 'm1',
      },
    };
  },
  methods: {
    looksLikePuNumber(str) {
      return /^[0-9.:/-]+$/.test(str);
    },
    parseParams(str) {
      return str.split('&').reduce((params, param) => {
        const paramSplit = param.split('=').map(value => decodeURIComponent(value.replace(/\+/g, ' ')));
        // eslint-disable-next-line prefer-destructuring
        params[paramSplit[0]] = paramSplit[1];
        return params;
      }, {});
    },
    getQueryStringValue(key) {
      if (window.location.search) {
        const params = this.parseParams(window.location.search.substr(1));
        if (Object.prototype.hasOwnProperty.call(params, key)) {
          return params[key];
        }
      }
      return '';
    },
  },
  mounted() {
    const vm = this;
    const q = this.getQueryStringValue('q');
    this.searchQuery = q;

    const startTime = performance.now();
    if (this.looksLikePuNumber(q)) {
      new PlacesService().findAreaByPollingUnit({ lookup: q })
        .then(res => res.data)
        .then((res) => {
          vm.isLoading = false;
          vm.area = Object.assign({}, res.data);

          const result = (res.success) ? 1 : 0;
          const endTime = performance.now();
          let timeDiff = endTime - startTime; // in ms
          timeDiff /= 1000; // strip the ms
          const seconds = timeDiff.toFixed(2); // get seconds
          vm.resultMeta = `About ${result} result (${seconds} seconds)`;
        })
        .catch((err) => {
          vm.isLoading = false;
          vm.noResult = true;
          console.error(err);
        });
    } else {
      (function () {
        const cx = '009849292720701569670:dnm2ccnvkai';
        const gcse = document.createElement('script');
        gcse.type = 'text/javascript';
        gcse.async = true;
        gcse.src = `//cse.google.com/cse.js?cx=${cx}`;
        const s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(gcse, s);
      }());
      vm.isLoading = false;
    }
  },
};
</script>
