import * as env from '../../../env';

export default class FilePathsHelper {
  constructor() {
    this.contentDir = env.prose;
    this.dateGlob = '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]';
  }

  get eventsDir() {
    return `${this.contentDir}/events`;
  }

  get infoDir() {
    return `${this.contentDir}/info`;
  }

  get postsDir() {
    return `${this.contentDir}/posts`;
  }

  get summariesDir() {
    return `${this.contentDir}/summaries`;
  }

  get eventsPattern() {
    return `${this.eventsDir}/${this.dateGlob}-*.md`;
  }

  eventPattern(slug) {
    return `${this.eventsDir}/${this.dateGlob}-${slug}.md`;
  }

  infoPattern(slug) {
    return `${this.infoDir}/${slug}.md`;
  }

  get postsPattern() {
    return `${this.postsDir}/${this.dateGlob}-*.md`;
  }

  postPattern(slug) {
    return `${this.postsDir}/${this.dateGlob}-${slug}.md`;
  }

  get summariesPattern() {
    return `${this.summariesDir}/*.md`;
  }

  summaryPattern(id) {
    return `${this.summariesDir}/${id}.md`;
  }
}
