<template>
  <div>
    <!-- Page Header -->
    <header class="masthead">
      <div class="overlay" />
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <div class="site-heading">
              <h1>{{ title }}</h1>
              <!-- <span class="subheading">{{ subHeading }}</span> -->
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <div v-for="(item,index) in posts" :key="index">
            <div class="post-preview">
              <a :href="item.url">
                <h2 class="post-title">
                  {{ item.title }}
                </h2>
                <h3 class="post-subtitle">
                  {{ item.excerpt }}
                </h3>
              </a>
              <p class="post-meta">
                Posted by
                {{ item.author }}
                on {{ item.date }}
              </p>
            </div>
            <hr>
          </div>
          <!-- Pager -->
          <div class="clearfix">
            <a class="btn btn-primary float-left" :href="`${url}${pagination.previousPage}`" v-if="pagination.previousPage > 0">
              &larr; Newer<span class="d-none d-md-inline"> Posts</span></a>

            <a class="btn btn-primary float-right" :href="`${url}${pagination.nextPage}`" v-if="pagination.nextPage > 0">
              Older<span class="d-none d-md-inline"> Posts</span> &rarr;</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DocumentFactory from '@/app/shared/factory/document.factory';

export default {
  name: 'Blog',
  data() {
    return {
      title: '@SYE Blog',
      url: '/blog?page=',
      posts: [],
      pagination: {},
    };
  },
  created() {
  },
  beforeRouteUpdate(to, from, next) {
    this.$options.beforeRouteEnter(to, from, next);
  },
  beforeRouteEnter: async (to, from, next) => {
    try {
      const { data } = await new DocumentFactory('posts').all({ page: to.query.page, limit: to.query.limit, sort: to.query.sort }).then(res => res.data);
      next((vue) => {
        const vm = vue;
        vm.posts = Object.freeze(data.posts);
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
