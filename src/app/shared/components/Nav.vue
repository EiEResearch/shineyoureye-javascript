<template>
  <b-navbar toggleable="lg" variant="default">
    <b-navbar-brand href="#">@SYE</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse" />
    <!-- Right aligned nav items -->
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="/">Home</b-nav-item>

        <b-nav-item href="/info/democracy-resources">Democracy Resources</b-nav-item>

        <b-nav-item-dropdown text="Elections">
          <b-dropdown-item href="/info/elections">Elections</b-dropdown-item>
          <b-dropdown-item href="/info/inec-nationwide-continuous-voter-registration-exercise">Voting Information</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown text="Government Officials">
          <b-dropdown-item href="/info/government-officials">Government Officials</b-dropdown-item>
          <b-dropdown-item href="#">Governors</b-dropdown-item>
          <b-dropdown-item href="#">Senators</b-dropdown-item>
          <b-dropdown-item href="#">Federal Representatives</b-dropdown-item>
          <b-dropdown-item href="#">State Representatives</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown text="Places">
          <b-dropdown-item href="/info/places-overview">Places</b-dropdown-item>
          <b-dropdown-item href="#">States</b-dropdown-item>
          <b-dropdown-item href="#">Senatorial Districts</b-dropdown-item>
          <b-dropdown-item href="#">Federal Constituenncies</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item href="/events">Events</b-nav-item>

        <b-nav-item href="/blog">Blog</b-nav-item>

        <b-nav-item href="/info/about">About</b-nav-item>

        <b-nav-item href="#">Contact</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'NavComponent',
  data() {
    return {
      flow: 'no-flow',
    };
  },
};
</script>
