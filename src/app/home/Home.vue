<template>
  <div>
    <page-loader-component class="mb-4" v-if="isLoading" />
    <div class="home" v-else>
      <section>
        <div class="page-section homepage__hero">
          <div class="container">
            <div class="row my-3">
              <div class="col-md-5 homepage__hero__secondary">
                <img class="mx-auto d-block" src="/static/images/mz-nigeria-logo-symbol.png">
              </div>
              <div class="col-md d-flex flex-column">
                <h1 class="align-items-center">
                  <strong>Shine Your Eye</strong>
                  is a platform that helps citizens find the elected officials that represent them at all tiers of government and connect with them.
                </h1>
                <a class="align-items-left py-md-3"
                   href="/info/about"
                >Click here for more information about ShineYourEye
                  <img src="/images/icons/arrow-right.svg" alt=""
                       width="30"
                       height="20" title="See all Blog Posts"
                  >
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="container-fluid homepage__reps">
          <div class="row">
            <div class="container">
              <div class="row my-5">
                <div class="d-flex flex-wrap justify-content-center">
                  <div class="content-row">
                    <div>
                      <div>
                        <div class="heading-side-lines">
                          <h2 class="heading">
                            Your Elected Representatives
                          </h2>
                        </div>
                        <div class="carousel-wrapper clearfix">
                          <div class="row">
                            <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12" v-for="(item,key) in people" :key="key">
                              <div class="text-center homepage__reps__rep">
                                <img :src="item.persons[randomIntFromInterval(0,9)].images.original.url"
                                     class="img-fluid mx-auto d-block img-portrait thumbnail"
                                     :alt="item.persons[randomIntFromInterval(0,9)].official_name"
                                     data-carousel-image=""
                                >
                                <div class="mx-auto d-block">
                                  <h3>
                                    <a :href="item.persons[randomIntFromInterval(0,9)].url">
                                      {{ item.persons[randomIntFromInterval(0,9)].official_name }}
                                    </a>
                                  </h3>
                                  <p v-if="item.persons[randomIntFromInterval(0,9)].area && item.persons[randomIntFromInterval(0,9)].area.place">
                                    <img src="/images/icons/people.svg" alt=""
                                         width="30"
                                         height="20" title="See all Blog Posts"
                                    >
                                    {{ item.persons[randomIntFromInterval(0,9)].party }},
                                    {{ (item.persons[randomIntFromInterval(0,9)].address.district.value)
                                      ? `${item.persons[randomIntFromInterval(0,9)].address.district.value}`
                                      : '' }}
                                    {{ (item.persons[randomIntFromInterval(0,9)].address.district.value)
                                      ? `- ${item.persons[randomIntFromInterval(0,9)].area.place.name} LGA`
                                      : item.persons[randomIntFromInterval(0,9)].area.place.name }}
                                  </p>

                                  <img src="/images/icons/arrow-right.svg" alt=""
                                       width="30"
                                       height="20" title="See all Blog Posts"
                                  >
                                  <a :href="`/position/${getSlug(item.position)}`">
                                    {{ item.position }}s
                                  </a>
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
      <section>
        <div>
          <div class="container">
            <div class="row mb-3 mt-3">
              <div class="col-md-6 mb-3" v-if="posts && posts.length">
                <div class="mb-5 mt-3">
                  <h2 class="text-left">
                    <img src="/images/icons/newspaper.svg" alt=""
                         width="35"
                         height="29" title="Latest Posts"
                    >&nbsp;Latest Posts
                  </h2>
                </div>
                <div class="row">
                  <div class="col-md">
                    <div v-for="(item,index) in posts.slice(0,6)" :key="index">
                      <div class="post-preview">
                        <a :href="item.url">
                          <h3 class="post-title-alt">
                            {{ item.title }}
                          </h3>
                          <h4 class="post-subtitle">
                            {{ item.excerpt }}
                          </h4>
                        </a>
                        <p class="post-meta">
                          Posted by
                          {{ item.author }}
                          on {{ item.date }}
                        </p>
                      </div>
                      <hr>
                    </div>
                  </div>
                </div>
                <div class="mt-2">
                  <a href="/blog"><img src="/images/icons/arrow-right.svg" alt=""
                                       width="30"
                                       height="20" title="See all Blog Posts"
                  >See all Blog Posts</a>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div>
                  <figure class="figure homepage__block">
                    <div class="embed-responsive embed-responsive-4by3">
                      <iframe src="https://www.youtube.com/embed/NDSIJfYWgko" frameborder="0" allowfullscreen />
                    </div>
                    <figcaption class="h4 pt-4 text-underline">
                      <img src="/images/icons/camera-video.svg" alt=""
                           width="35"
                           height="29" title="How ShineYourEye Works"
                      >&nbsp; How ShineYourEye Works
                    </figcaption>
                  </figure>
                </div>
                <div>
                  <figure class="d-block">
                    <div class="d-flex align-items-center">
                      <blockquote class="twitter-tweet homepage__block">
                        <a class="twitter-timeline"
                           :href="`https://twitter.com/${twitterUser}`"
                           data-tweet-limit="1"
                        >Tweets by @{{ twitterUser }}</a>
                      </blockquote>
                    </div>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import DocumentFactory from '@/app/shared/factory/document.factory';
import PeopleService from '@/app/shared/services/people.service';

export default {
  name: 'Home',
  data() {
    return {
      name: 'Landing Page Is Still Under Construction',
      posts: [],
      people: [],
      twitterUser: process.env.VUE_APP_TWITTER_USER,
      random: 0,
      isLoading: true,
    };
  },
  methods: {
    randomIntFromInterval(min, max) { // min and max included
      if (this.random === 0) {
        this.random = Math.floor(Math.random() * (max - min + 1) + min);
      }

      return this.random;
    },
    getSlug(text) {
      // eslint-disable-next-line default-case
      switch ((text || '').toLowerCase()) {
        case 'governor':
          return 'executive-governors';
        case 'senator':
          return 'senators';
        case 'federal representative':
          return 'federal-representatives';
        case 'state representative':
          return 'state-representatives';
        case 'local government':
          return 'local-government';
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
      const [blog, reps] = await Promise.all([
        new DocumentFactory('posts').all().then(res => res.data),
        new PeopleService().findPeopleWithValidImage({ size: 20 }).then(res => res.data),
      ]);

      next((vue) => {
        const vm = vue;
        vm.posts = Object.freeze(blog.data.posts);
        vm.people = reps.data.people;
        vm.isLoading = false;
        next();
      });
    } catch (error) {
      next({ name: 'error', params: [to.path], replace: true });
    }
  },
  mounted() {
    // eslint-disable-next-line func-names
    (function (d, s, id) {
      let js; const
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      // eslint-disable-next-line prefer-const
      js = d.createElement(s); js.id = id;
      js.async = true;
      js.src = '//platform.twitter.com/widgets.js';
      js.crossorigin = 'anonymous';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'twitter-widget'));
  },
};
</script>
