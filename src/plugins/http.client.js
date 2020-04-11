import axios from 'axios';
import Raven from 'raven-js';

Raven
  .config(`https://${process.env.VUE_APP_SENTRY_KEY}@sentry.io/${process.env.VUE_APP_SENTRY_PROJECT}`)
  .install();

const httpClient = (baseUrl = null) => {
  const options = {
    baseURL: baseUrl,
  };

  const client = axios.create(options);

  // Add a request interceptor
  client.interceptors.request.use(
    requestConfig => requestConfig,
    (requestError) => {
      if (process.env.NODE_ENV === 'production') {
        Raven.captureException(requestError);
      }
      return Promise.reject(requestError);
    },
  );

  // Add a response interceptor
  client.interceptors.response.use(
    response => response,
    (error) => {
      if (error.response && error.response.status >= 500) {
        if (process.env.NODE_ENV === 'production') {
          Raven.captureException(error);
        }
      }

      return Promise.reject(error);
    },
  );

  return client;
};

export default httpClient;
