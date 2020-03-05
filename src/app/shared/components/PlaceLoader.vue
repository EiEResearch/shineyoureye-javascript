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
              <PuSkeleton height="250px" width="95%" class="mb-5" />
              <div class="mb-4" v-for="(item, key) in [1,2]" :key="key">
                <PuSkeleton width="46%" height="20px" class="mt-4" />
                <PuSkeleton width="95%" height="1px" />
                <div class="row">
                  <div class="col-sm-5">
                    <PuSkeleton width="99%" height="8px" />
                    <PuSkeleton width="91%" height="8px" />
                    <PuSkeleton width="92%" height="8px" />
                    <PuSkeleton width="99%" height="8px" />
                    <PuSkeleton width="91%" height="8px" />
                    <PuSkeleton width="62%" height="8px" />
                  </div>
                  <div class="col-sm-7">
                    <div class="mb-2" v-for="(skeleton, index) in [1,2]" :key="index">
                      <div class="media">
                        <PuSkeleton height="70px" width="70px" class="mr-3" />
                        <div class="media-body">
                          <PuSkeleton width="51%" height="14px" />
                          <PuSkeleton width="61%" height="14px" />
                          <PuSkeleton width="41%" height="14px" />
                        </div>
                      </div>
                    </div>
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
  name: 'PlaceLoaderComponent',
};
</script>
