<template>
  <div>
    <header class="d-block masthead">
      <div class="overlay" />
      <PuSkeleton height="185px" />
    </header>
    <section>
      <div class="container">
        <div class="row mb-5">
          <div class="col-lg-8 col-md-10 mx-auto">
            <PuSkeleton height="26px" width="40%" />
            <PuSkeleton width="80%" />
            <PuSkeleton />
            <PuSkeleton width="70%" />
            <PuSkeleton width="80%" />
          </div>
        </div>

        <div class="row mb-5">
          <div class="col-lg-8 col-md-10 mx-auto">
            <PuSkeleton height="26px" width="40%" />
            <PuSkeleton width="80%" />
            <PuSkeleton width="70%" />
            <PuSkeleton />
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-lg-8 col-md-10 mx-auto">
            <PuSkeleton height="26px" width="40%" />
            <PuSkeleton width="80%" />
            <PuSkeleton />
            <PuSkeleton width="70%" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'PageLoaderComponent',
};
</script>
