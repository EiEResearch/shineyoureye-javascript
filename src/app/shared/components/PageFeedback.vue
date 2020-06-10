<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-md-10 mx-auto mt-5" ref="feeback">
        <div class="d-block" v-if="step === 1">
          <div class="d-inline-block mr-4">
            <h5>Is this page correct? </h5>
          </div>
          <div class="d-inline-block">
            <button @click="goNextStep(3)" type="submit" class="as-button my-sm-0 mr-3">Yes</button>
            <button @click="goNextStep(2)" type="submit" class="as-button my-sm-0">No</button>
          </div>
        </div>
        <div v-else-if="step === 2">
          <div class="title">
            <h5>
              How can we improve this page?
              <a @click="goNextStep(1)" class="as-close float-right">
                <mark>Close</mark>
              </a>
            </h5>
          </div>
          <div class="text-box">
            <textarea name="" class="as-textarea"
                      cols="30"
                      rows="5"
                      v-model="message"
                      @keyup.enter="postFeedback"
            />
          </div>
          <div class="submit">
            <button @click="postFeedback" class="btn btn-success" v-if="!onSubmit">Submit</button>
            <button v-else class="btn btn-success"
                    type="button" disabled
            >
              <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" />
              Submitting...
            </button>
          </div>
        </div>
        <div v-else-if="step === 3"><h5>Thanks for your feedback!</h5></div>
      </div>
    </div>
  </div>
</template>
<script>
import { createSiteFeedBack } from '@/app/shared/services/airtable.service';

export default {
  data() {
    return {
      step: 1,
      onSubmit: false,
      message: '',
    };
  },
  methods: {
    goNextStep(step) {
      if (!step) return;
      this.onSubmit = false;
      this.message = '';
      this.step = step;
    },
    async postFeedback($event) {
      try {
        $event.stopPropagation();
        this.onSubmit = true;

        const { id } = await createSiteFeedBack({
          message: this.message,
          vendor: window.navigator.vendor,
          user_agent: window.navigator.userAgent,
          page_href: window.location.href,
          is_processed: 0,
        });

        if (id) {
          this.goNextStep(3);
        }
      } catch (error) {
        this.$logger(error);
      }
    },
  },
};
</script>
