<template>
  <div id="comments">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto mt-5">
          <div class="embed-responsive embed-responsive-item">
            <div class="fb-comments"
                 :data-href="url"
                 data-width=""
                 data-numposts="5"
            />
          </div>
        </div>
      </div>
      <div id="fb-root" />
    </div>
  </div>
</template>

<script>
/* eslint-disable func-names */
export default {
  data() {
    return {
      url: process.env.VUe_APP_URL,
      environment: process.env.VUE_APP_ENV,
    };
  },
  mounted() {
    if (this.environment === 'production') {
      (function (d, s, id) {
        let js; const
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        // eslint-disable-next-line prefer-const
        js = d.createElement(s); js.id = id;
        js.async = true;
        js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v6.0&appId=647627356057438&autoLogAppEvents=1';
        js.crossorigin = 'anonymous';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    }
  },
};
</script>
