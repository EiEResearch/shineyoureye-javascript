<template>
  <div class="about">
    <!-- Page Header -->
    <header class="masthead">
      <div class="overlay" />
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <div class="site-heading">
              <h1>Clean Blog</h1>
              <span class="subheading">A Blog Theme by Start Bootstrap</span>
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
              <a href="post.html">
                <h2 class="post-title">
                  Man must explore, and this is exploration at its greatest
                </h2>
                <h3 class="post-subtitle">
                  Problems look mighty small from 150 miles up
                </h3>
              </a>
              <p class="post-meta">
                Posted by
                <a href="#">Start Bootstrap</a>
                on September 24, 2019 {{ item }}
              </p>
            </div>
            <hr>
          </div>
          <!-- Pager -->
          <div class="clearfix">
            <a class="btn btn-primary float-left" href="/startbootstrap-clean-blog-jekyll/posts/">←
              Newer<span class="d-none d-md-inline"> Posts</span></a>

            <a class="btn btn-primary float-right" href="#">Older Posts &rarr;</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'About',
  data() {
    return {
      name: 'boy',
      posts: [],
    };
  },
  created() {
    this.featuredPosts();
  },
  methods: {
    async featuredPosts() {
      this.posts = await [1, 2, 3];
    },
  },
};
</script>
