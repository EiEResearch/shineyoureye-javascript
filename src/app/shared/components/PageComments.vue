<template>
  <div id="comments">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto mt-5">
          <div class="embed-responsive embed-responsive-item">
            <div id="fb-root" />
            <div class="fb-comments" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    // eslint-disable-next-line func-names
    (function (d, s, id) {
      let js; const
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      // eslint-disable-next-line prefer-const
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8';
      js.async = true;
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  },
};
</script>
