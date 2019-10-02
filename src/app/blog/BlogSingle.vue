<template>
  <div>
    <not-found-component v-if="!isMatched" />
    <div v-else id="single-blog">
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
                 class="mx-auto d-flex"
            >
              <div v-html="post.body" />
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import PostService from '@/app/shared/services/post.service';

export default {
  name: 'BlogSingle',
  data() {
    return {
      isMatched: false,
      post: {},
    };
  },
  beforeRouteEnter: async (to, from, next) => {
    try {
      const { data } = await PostService.single(to.params.slug).then(res => res.data);
      next((vue) => {
        const vm = vue;
        vm.post = data.post;
        vm.isMatched = true;
      });
    } catch (error) {
      next((Vue) => {
        const vm = Vue;
        vm.$logger(error);
      });
    }
  },
  method: {
  },
};
</script>
