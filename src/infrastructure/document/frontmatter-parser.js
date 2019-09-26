import YAML from '@/infrastructure/helpers/yaml';

export default class FrontmatterParser {
  constructor(filecontents) {
    this.filecontents = filecontents;
  }

  get title() {
    return this.fetch('title');
  }

  get slug() {
    return this.fetch('slug');
  }

  get published() {
    return this.fetch('published', true);
  }

  get featured() {
    return this.fetch('featured', false);
  }

  get eventDate() {
    return this.fetch('eventdate');
  }

  // private methods and properties
  // reserved for internal manipulation

  get parse() {
    return YAML.meta(this.filecontents);
  }

  fetch(key, value = '') {
    const obj = this.parse;
    return Object.prototype.hasOwnProperty.call(obj, key) ? obj[key] : value;
  }
}
