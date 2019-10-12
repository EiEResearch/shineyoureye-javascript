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

  get document() {
    this.doc = {
      title: '',
      slug: '',
      published: '',
      featured: '',
      eventDate: '',
      date: '',
      url: '',
      excerpt: '',
      author: '',
      body: '',
      type: '',
    };

    return this.doc;
  }
}
