<template>
  <div id="analytics" />
</template>

/* <script>
/* eslint-disable */
export default {
    data(){
        return {
            environment: process.env.VUE_APP_ENV
        }
    },
  mounted() {
    if(this.environment === "production") {
    (function (i, s, o, g, r, a, m) {
      i.GoogleAnalyticsObject = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments);
      }, i[r].l = 1 * new Date(); a = s.createElement(o),
      m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m);
    }(window, document, 'script', 'https://www.googletagmanager.com/gtag/js', 'ga'));
    ga('create', 'G-Y05YMPDSTZ', 'auto');
    ga('send', 'pageview');
    }
  },
};
</script>
*/

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-Y05YMPDSTZ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-Y05YMPDSTZ');
</script>
