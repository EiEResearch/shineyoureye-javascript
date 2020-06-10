import PostService from '@/app/shared/services/post.service';
import InfoService from '@/app/shared/services/info.service';
import EventService from '@/app/shared/services/event.service';
import ApiService from '@/app/shared/services/api.service';

export default class DocumentFactory {
  constructor(type) {
    if (type && type.toLowerCase() === 'posts') {
      return new PostService('/posts', new ApiService());
    }
    if (type && type.toLowerCase() === 'info') {
      return new InfoService('/info', new ApiService());
    }
    if (type && type.toLowerCase() === 'events') {
      return new EventService('/events', new ApiService());
    }
  }
}
