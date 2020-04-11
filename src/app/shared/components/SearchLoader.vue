<template>
  <div>
    <section>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto my-5">
            <div>
              <div class="gsc-result-info-container">
                <PuSkeleton width="27%" />
                <hr>
              </div>
              <div class="gsc-result">
                <div class="gsc-webResult gsc-result" v-for="(item, key) in [1,2,3]" :key="key">
                  <div class="gs-webResult gs-result">
                    <div class="gsc-thumbnail-inside bg-white rounded">
                      <div class="gs-title">
                        <PuSkeleton width="40%" />
                      </div>
                      <div class="gsc-url-top my-1">
                        <div class="gs-bidi-start-align gs-visibleUrl gs-visibleUrl-long" dir="ltr" style="word-break:break-all;">
                          <PuSkeleton width="40%" />
                        </div>
                      </div>
                      <div class="media">
                        <PuSkeleton height="70px" width="70px" class="mr-2" />
                        <div class="media-body text-wrap">
                          <PuSkeleton width="51%" />
                          <PuSkeleton width="51%" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="gcsc-more-maybe-branding-root mt-4">
                  <div class="gcsc-find-more-on-google">
                    <PuSkeleton width="40%" />
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
  name: 'SearchLoaderComponent',
};
</script>
