<template>
  <div>
    <header class="d-block masthead">
      <div class="overlay" />
      <PuSkeleton height="185px" />
    </header>
    <section>
      <div class="container">
        <div class="row mb-4">
          <div class="col-lg-8 col-md-10 mx-auto">
            <PuSkeleton height="26px" width="25%" />
            <hr>
            <div class="row">
              <div class="col-md-1">&nbsp;</div>
              <div class="col-md-11">
                <PuSkeleton width="51%" />
                <PuSkeleton width="51%" />
                <PuSkeleton width="51%" />
                <PuSkeleton width="51%" />
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <PuSkeleton height="26px" width="25%" />
            <div class="row mb-3 d-none">
              <div class="col-md-12">
                <PuSkeleton width="51%" />
                <PuSkeleton height="40px" width="88%" class="pr-2" />
                <PuSkeleton height="40px" width="10%" />
              </div>
            </div>
            <hr>
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
  name: 'PositionLoaderComponent',
};
</script>
