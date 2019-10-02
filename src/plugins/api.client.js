import axios from 'axios';

const httpClient = (baseUrl = null) => {
  const options = {
    baseURL: baseUrl,
  };

  const client = axios.create(options);

  // Add a request interceptor
  client.interceptors.request.use(
    requestConfig => requestConfig,
    (requestError) => {
      Raven.captureException(requestError);

      return Promise.reject(requestError);
    },
  );

  // Add a response interceptor
  client.interceptors.response.use(
    response => response,
    (error) => {
      if (error.response.status >= 500) {
        Raven.captureException(error);
      }

      return Promise.reject(error);
    },
  );

  return client;
};

export default httpClient;
