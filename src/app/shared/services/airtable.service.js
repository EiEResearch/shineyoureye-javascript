/* eslint-disable import/prefer-default-export */
const Airtable = require('airtable');

const Base = new Airtable({
  apiKey: process.env.VUE_APP_AIRTABLE_KEY,
});

const FeedBackBase = Base.base(process.env.VUE_APP_AIRTABLE_FEEDBACK_SHEETID);

export const createSiteFeedBack = (fields = {}) => FeedBackBase(process.env.VUE_APP_AIRTABLE_SITEFEEDBACK_SHEET)
  .create(fields)
  .then(res => Promise.resolve(res))
  .catch(error => Promise.reject(error));

export const createSiteContact = (fields = {}) => FeedBackBase(process.env.VUE_APP_AIRTABLE_SITECONTACT_SHEET)
  .create(fields)
  .then(res => Promise.resolve(res))
  .catch(error => Promise.reject(error));
