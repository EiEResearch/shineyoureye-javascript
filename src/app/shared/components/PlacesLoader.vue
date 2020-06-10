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
            <div class="row mt-2">
              <div class="col-md-12">
                <div class="no-border shadow-sm rounded">
                  <div class="row no-gutters" v-for="(item, key) in [1,2,3]" :key="key">
                    <div class="col-md-3">
                      <h3 class="p-3 mb-3">
                        <PuSkeleton height="26px" width="60%" />
                      </h3>
                    </div>
                    <div class="col-md-9">
                      <div class="card-body no-border">
                        <div class="mb-12 shadow-sm p-2 mb-2 bg-white rounded" v-for="(skeleton, index) in [1,2]" :key="index">
                          <div class="media">
                            <PuSkeleton height="70px" width="70px" class="mr-3" />
                            <div class="media-body">
                              <PuSkeleton width="51%" />
                              <PuSkeleton width="61%" />
                              <PuSkeleton width="41%" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr>
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
