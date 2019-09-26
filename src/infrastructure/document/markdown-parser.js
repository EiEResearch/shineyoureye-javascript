import Pagedown from 'pagedown';
import YAML from '@/infrastructure/helpers/yaml';


export default class MarkdownParser {
  constructor(filecontents) {
    this.filecontents = filecontents;
  }

  get raw() {
    return YAML.content(this.filecontents);
  }

  get asHtml() {
    const raw = this.sanitizeLinks(this.raw);
    return MarkdownParser.parser.makeHtml(raw);
  }

  // private methods and properties
  // reserved for internal manipulation

  PROSE_BASE_URL_REGEXP = /(?<=\({{site\.baseurl}}).+?(?=\))/;

  PROSE_MATCH_BASE_URL_REGEXP = /\(({{site\.baseurl}}.*?)\)/;

  sanitizeLinks(content) {
    let raw = (content) || '';

    if (raw.match(this.PROSE_BASE_URL_REGEXP)) {
      const encodedUri = encodeURI(raw.match(this.PROSE_BASE_URL_REGEXP)[0]);
      raw = raw.replace(raw.match(this.PROSE_MATCH_BASE_URL_REGEXP)[0], `(${encodedUri})`);
    }

    return raw;
  }

  static get parser() {
    return new Pagedown.Converter();
  }
}
