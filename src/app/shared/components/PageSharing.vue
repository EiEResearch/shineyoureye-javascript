<template>
  <div id="share">
    <div class="sharethis-inline-share-buttons" />
  </div>
</template>
<script>
export default {
  mounted() {
    // eslint-disable-next-line func-names
    (function (d, s, id) {
      let js;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      // eslint-disable-next-line prefer-const
      js = d.createElement(s);
      js.id = id;
      js.async = true;
      js.src = '//platform-api.sharethis.com/js/sharethis.js#property=5e81e2e9e30e3a0019ae2d11&product=sticky-share-buttons';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'sharethis-jssdk'));
  },
};
</script>
