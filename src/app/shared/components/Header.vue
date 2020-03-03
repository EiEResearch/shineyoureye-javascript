<template>
  <div class="site-header">
    <div class="container">
      <div class="site-header__search js-multipurpose-search">
        <label for="site-search">
          <strong>Find your representative</strong>
          <span class="js-multipurpose-search-label">Enter your Polling Unit (PU) number</span>
        </label>
        <p>
          <span class="input-group">
            <input name="pu-number"
                   id="site-search"
                   type="search"
                   class="form-control"
                   placeholder="e.g. 1:1:1"
            >
            <span class="input-group-btn">
              <button class="btn btn-primary" type="submit">Search</button>
            </span>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
};
</script>
