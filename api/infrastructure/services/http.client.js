import axios from 'axios';
import logger from 'api/logger';

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
        logger(requestError);
      }
      return Promise.reject(requestError);
    },
  );

  // Add a response interceptor
  client.interceptors.response.use(
    response => response,
    (error) => {
      if (error.response.status >= 500) {
        if (process.env.NODE_ENV === 'production') {
          logger(error);
        }
      }

      return Promise.reject(error);
    },
  );

  return client;
};

export default httpClient;
