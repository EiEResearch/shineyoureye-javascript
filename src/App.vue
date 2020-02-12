<template>
  <div>
    <keep-alive>
      <nav-component />
    </keep-alive>
    <keep-alive>
      <header-component />
    </keep-alive>
    <position-loader-component v-if="$store.state.loading && (
      $store.state.route.toLowerCase() === 'position')"
    />
    <places-loader-component v-else-if="$store.state.loading && (
      $store.state.route.toLowerCase() === 'places')"
    />
    <page-loader-component v-else-if="$store.state.loading" />
    <router-view v-else />
    <keep-alive>
      <footer-component />
    </keep-alive>
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
