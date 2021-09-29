<template>
  <footer class="bd-footer text-black-50">
    <div class="container-fluid px-3 pt-4">
      <ul class="bd-footer-links">
        <li><a :href="`mailto:${emailAddress}`">{{ emailAddress }}</a></li>
        <li><a :href="`https://twitter.com/${twitterUser}`">@{{ twitterUser }}</a></li>
      </ul>
      <ul class="bd-footer-links">
        <li><a href="/search">Find Your Representative</a></li>
        <li><a href="/blog">Blog</a></li>
        <li><a href="/info/about">About</a></li>
        <li><a href="/info/democracy-resources">Democratic Resources</a></li>
        <li><a href="/info/elections">Elections</a></li>
        <li><a href="/events">Events</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
      <p>
        Copyright ©{{ new Date().getFullYear() }}. Shine your Eye is an initiative of <a href="https://eie.ng/">Enough is Enough Nigeria (EiENigeria)</a>.
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      twitterUser: process.env.VUE_APP_TWITTER_USER,
      emailAddress: process.env.VUE_APP_CONTACT_EMAIL,
    };
  },
};
</script>
