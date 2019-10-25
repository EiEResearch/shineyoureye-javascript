<template>
  <div>
    <keep-alive>
      <nav-component />
    </keep-alive>
    <keep-alive>
      <header-component />
    </keep-alive>
    <router-view />
  </div>
</template>

<script>
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'Home',
    // all titles will be injected into this template
    titleTemplate: `%s :: ${process.env.VUE_APP_SITE_NAME}`,
  },
};
</script>
