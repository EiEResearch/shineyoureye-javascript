<template>
  <div class="site-header">
    <div class="container">
      <div class="site-header__search js-multipurpose-search">
        <label for="site-search">
          <strong>Find your representative</strong>
          <span class="js-multipurpose-search-label">Enter a name, location, or Polling Unit (PU) number</span>
        </label>
        <!-- <p>
          <span class="input-group">
            <input name="pu-number"
                   id="site-search"
                   type="search"
                   class="form-control"
                   placeholder="e.g. 1:1:1"
                   v-model="searchInput"
            >
            <span class="input-group-btn">
              <button class="btn btn-primary" type="submit" @click="searchSite">Search</button>
            </span>
          </span>
        </p> -->
        <div>
          <form class="input-group form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search"
                   aria-label="Search" name="pu-number"
                   id="site-search" placeholder="e.g. 1:1:1"
                   v-model="searchInput"
                   @keyup.enter="searchSite"
            >
            <span class="input-group-btn">
              <button class="input-group-btn btn btn-outline-primary my-sm-0" type="submit" @click="searchSite">Search</button>
            </span>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {
      searchInput: '',
    };
  },
  methods: {
    looksLikePuNumber(str) {
      return /^[0-9.:/-]+$/.test(str);
    },
    searchSite(event) {
      try {
        if (event && this.searchInput.length) {
          event.preventDefault();
          const q = (this.searchInput).trim();
          const a = { q };
          const params = Object.keys(a).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(a[k])}`).join('&');
          window.location.href = `/search/?${params}`;
        }
        event.preventDefault();
      } catch (error) {
        $logger(error);
      }
    },
  },
};
</script>
