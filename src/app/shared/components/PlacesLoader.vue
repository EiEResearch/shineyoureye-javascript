<template>
  <div>
    <header class="d-block masthead">
      <div class="overlay" />
      <PuSkeleton height="165px" />
    </header>
    <section>
      <div class="container">
        <div class="row mb-2">
          <div class="col-lg-8 col-md-10 mx-auto">
            <div class="content">
              <PuSkeleton height="40px" width="20%" class="pr-3" />
              <PuSkeleton height="40px" width="25%" class="pr-3" />
              <PuSkeleton height="40px" width="30%" class="pr-3" />
              <PuSkeleton height="40px" width="15%" />

              <hr>
            </div>
            <div class=" col-md-12">
              <div v-for="(item, key) in [1,2,3,4,5]" :key="key">
                <div class="media shadow-sm p-3 mb-3 bg-white rounded">
                  <PuSkeleton height="70px" width="70px" class="mr-3" />
                  <div class="media-body">
                    <PuSkeleton width="46%" />
                    <PuSkeleton width="55%" />
                    <PuSkeleton width="47%" />
                    <PuSkeleton width="65%" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'PlacesLoaderComponent',
};
</script>
