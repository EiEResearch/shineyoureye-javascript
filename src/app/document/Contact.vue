<template>
  <div>
    <!-- Page Header -->
    <header class="masthead">
      <div class="overlay" />
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto d-flex">
            <div class="post-heading">
              <h1>Contact Us</h1>
              <h2 class="meta">Need help with anything? Holler at our team</h2>
            </div>
          </div>
        </div>
      </div>
    </header>

    <section>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <div class="gsc-webResult gsc-result" v-if="errors.length">
              <div class="gsc-resultsRoot gsc-tabData gsc-tabdActive">
                <div class="gsc-results gsc-webResult">
                  <div class="gsc-expansionArea">
                    <div>
                      <div class="gs-webResult gs-result gs-no-results-result">
                        <div class="gs-snippet">
                          <b>Please correct the following error(s):</b>
                          <ul>
                            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                          </ul>
                        </div>
                      </div>
                    </div><div class="gsc-adBlockNoHeight" style="height: 0px;" />
                  </div>
                </div>
              </div>
            </div>
            <p class="form-group">
              <label for="name">Your name</label>
              <input id="name" type="text"
                     name="name"
                     placeholder="Eg. Jon Doe"
                     class="form-control"
                     v-model="field.name"
              >
            </p>
            <p class="form-group">
              <label for="email">Your email</label>
              <span class="small">&nbsp;(optional - but lets us get back to you...)</span>
              <input id="email" type="email"
                     name="email"
                     v-model="field.email"
                     placeholder="Eg. jon@example.com" class="form-control"
              >
            </p>
            <p class="form-group">
              <label for="message">Your feedback</label>
              <textarea id="message" name="message"
                        rows="10"
                        cols="50" autocomplete
                        v-model="field.message"
                        spellcheck class="form-control"
              />
            </p>
            <button @click="checkForm" type="submit"
                    class="btn btn-primary"
                    v-if="!onSubmit"
            >
              Send feedback
            </button>
            <button v-else class="btn btn-primary"
                    type="button" disabled
            >
              <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" />
              Submitting...
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { createSiteContact } from '@/app/shared/services/airtable.service';

export default {
  metaInfo() {
    return {
      title: 'Contact',
    };
  },
  data() {
    return {
      onSubmit: false,
      errors: [],
      field: {
        name: '',
        email: '',
        message: '',
      },
    };
  },
  methods: {
    async postContact($event) {
      try {
        $event.stopPropagation();
        this.onSubmit = true;

        const { id } = await createSiteContact({
          name: this.field.name,
          email: this.field.email,
          message: this.field.message,
          vendor: window.navigator.vendor,
          user_agent: window.navigator.userAgent,
          is_processed: 0,
        });

        if (id) {
          this.field.name = '';
          this.field.email = '';
          this.field.message = '';
          this.onSubmit = false;
        }
      } catch (error) {
        this.$logger(error);
      }
    },
    checkForm(e) {
      try {
        this.errors = [];

        if (!this.field.name) {
          this.errors.push('Name is required');
        }

        if (this.email && !this.validEmail(this.email)) {
          this.errors.push('Valid email required');
        }

        if (!this.field.message) {
          this.errors.push('Message cannot be empty');
        }

        if (!this.errors.length) {
          this.postContact(e);
          this.errors = [];
          return true;
        }

        e.preventDefault();
      } catch (error) {
        this.$logger(error);
      }
    },
    validEmail(email) {
      try {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      } catch (error) {
        this.$logger(error);
      }
    },
  },
};
</script>
