import FilePathsHelper from 'api/infrastructure/helpers/file-path';
import Finder from 'api/infrastructure/document/finder';

export default class DocumentController {
  constructor(baseurl) {
    this.baseurl = baseurl;
  }

  get filePath() {
    this.path = new FilePathsHelper();
    return this.path;
  }

  finder(pattern) {
    return new Finder(pattern, this.baseurl);
  }

  // eslint-disable-next-line class-methods-use-this
  toJSON() {
    return {
      title: '',
      slug: '',
      published: '',
      featured: '',
      event_date: '',
      date: '',
      url: '',
      excerpt: '',
      author: '',
      body: '',
      type: '',
    };
  }
}
