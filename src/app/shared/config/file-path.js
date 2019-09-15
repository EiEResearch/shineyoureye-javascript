export default class FilePathHelper {
  constructor() {
    this.contentDir = 'settings.content_dir';
    this.dateGlob = '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]';
  }

  eventsDir() {
    return `${this.contentDir}/events`;
  }

  infoDir() {
    return `${this.contentDir}/info`;
  }

  postsDir() {
    return `${this.contentDir}/posts`;
  }

  summariesDir() {
    return `${this.contentDir}/summaries`;
  }

  eventsPattern() {
    return `${this.eventsDir()}/${this.dateGlob}-*.md`;
  }

  eventPattern(slug) {
    return `${this.eventsDir()}/${this.dateGlob}-${slug}.md`;
  }

  infoPattern(slug) {
    return `${this.infoDir()}/${slug}.md`;
  }

  postsPattern() {
    return `${this.postsDir()}/${this.dateGlob}-*.md`;
  }

  postPattern(slug) {
    return `${this.postsDir()}/${this.dateGlob}-${slug}.md`;
  }

  summariesPattern() {
    return `${this.summariesDir()}/*.md`;
  }

  summaryPattern(id) {
    return `${this.summariesDir()}/${id}.md`;
  }
}
