<template>
  <div id="page-container">
    <keep-alive>
      <nav-component />
    </keep-alive>
    <keep-alive>
      <header-component />
    </keep-alive>
    <position-loader-component class="mb-4" v-if="$store.state.loading && (
      $store.state.route.toLowerCase() === 'position')"
    />
    <places-loader-component class="mb-4" v-else-if="$store.state.loading && (
      $store.state.route.toLowerCase() === 'places')"
    />
    <place-loader-component class="mb-4" v-else-if="$store.state.loading && (
      $store.state.route.toLowerCase() === 'place')"
    />
    <page-loader-component class="mb-4" v-else-if="$store.state.loading" />
    <router-view v-else class="mb-4" />
    <keep-alive>
      <footer-component />
    </keep-alive>
    <page-analytics-component />
  </div>
</template>

<script>
export default {
  name: 'App',
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'Home',
    // all titles will be injected into this template
    titleTemplate: `%s :: ${process.env.VUE_APP_SITE_NAME}`,
  },
};
</script>
