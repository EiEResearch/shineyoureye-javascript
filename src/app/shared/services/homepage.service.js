import FilePathsHelper from '@/infrastructure/helpers/file-path';
import Finder from '@/infrastructure/document/finder';

export default class HomepageService {
  static featuredPosts(count = 2) {
    const postsFinder = HomepageService.finder(HomepageService.filePath.postsPattern, '/blog/');
    return postsFinder.findAll.reverse().slice(0, count);
  }

  static featuredEvents(count = 2) {
    const eventsFinder = HomepageService.finder(HomepageService.filePath.eventsPattern, '/events/');
    return eventsFinder.findAll.reverse().slice(0, count);
  }

  // private

  static get filePath() {
    return new FilePathsHelper();
  }

  static finder(pattern, baseurl) {
    return new Finder(pattern, baseurl);
  }
}
