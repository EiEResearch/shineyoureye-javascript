<template>
  <div>
    <div>
      <!-- Page Header -->
      <header class="masthead">
        <div class="overlay" />
        <div class="container">
          <div class="row">
            <div class="col-lg-8 col-md-10 mx-auto d-flex">
              <div class="post-heading">
                <h1>{{ post.title }}</h1>
                <!-- <h2 class="subheading">Problems look mighty small from 150 miles up</h2> -->
                <span class="meta">Posted by
                  {{ post.author }}
                  on {{ post.date }}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Post Content -->
      <article>
        <div class="container">
          <div class="row">
            <div :class="(post.type !== 'image') ? 'col-lg-8 col-md-10' : 'col-lg-11 col-md-12 image-post'"
                 class="mx-auto d-flex article-post justify-content-center"
            >
              <div id="single-blog" class="table-responsive" v-html="post.body" />
            </div>
            <div class="col-lg-8 col-md-10 mx-auto">
              <hr>
              <div class="clearfix">
                <a v-if="post.prev && post.prev.slug"
                   class="float-left"
                   :href="post.prev.url"
                >
                  <span class="float-left">
                    <span class="float-left">&larr; Previous<span class="d-none d-md-inline"> Post</span></span>
                    <br>
                    <span class="d-none d-xl-block">{{ post.prev.title }}</span>
                  </span>
                </a>

                <a v-if="post.next && post.next.slug"
                   class="float-right"
                   :href="post.next.url"
                >
                  <span class="float-right">
                    <span class="float-right">Next<span class="d-none d-md-inline"> Post</span> &rarr;</span>
                    <br>
                    <span class="d-none d-xl-block">{{ post.next.title }}</span>
                  </span> </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
    <page-comments-component />
    <page-sharing-component />
  </div>
</template>

<script>
import DocumentFactory from '@/app/shared/factory/document.factory';

export default {
  name: 'SingleBlog',
  data() {
    return {
      post: {},
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
      const { data } = await new DocumentFactory('posts').find(to.params.slug).then(res => res.data);
      next((vue) => {
        const vm = vue;
        if (data.post) {
          vm.post = data.post;
        }
      });
    } catch (error) {
      next({ name: 'error', params: [to.path], replace: true });
    }
  },
  metaInfo() {
    return {
      title: this.post.title,
      meta: [{
        name: 'description',
        content: this.post.excerpt || '',
      }],
    };
  },
  method: {
  },
};
</script>
