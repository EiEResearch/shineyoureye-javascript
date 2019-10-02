import client from '@/app/shared/services/api.service';

export default {

  all(params = {}) {
    return client.get('/posts', { params });
  },

  single(slug) {
    return client.get(`/posts/${slug}`);
  },
};
