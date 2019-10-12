import Showdown from 'showdown';
import YAML from 'api/infrastructure/helpers/yaml';


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

  HTML_BASE_URL_REGEXP = /(?:){{site\.baseurl}}(?:$|\W)/;

  PROSE_MATCH_BASE_URL_REGEXP = /\(({{site\.baseurl}}.*?)\)/;

  sanitizeLinks(content) {
    let raw = (content) || '';

    if (raw.match(this.PROSE_BASE_URL_REGEXP)) {
      const uri = raw.match(this.PROSE_BASE_URL_REGEXP)[0];

      const encodedUri = (decodeURI(encodeURI(uri)) === uri) ? encodeURI(decodeURI(uri)).replace('%25', '%') : encodeURI(uri);

      raw = raw.replace(raw.match(this.PROSE_MATCH_BASE_URL_REGEXP)[0], `(${encodedUri})`);
    } else if (raw.match(this.HTML_BASE_URL_REGEXP)) {
      raw = raw.replace(raw.match(this.HTML_BASE_URL_REGEXP)[0], '/');
    }

    return raw;
  }

  static get parser() {
    return new Showdown.Converter({
      omitExtraWLInCodeBlocks: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tables: true,
      smoothLivePreview: true,
      simpleLineBreaks: true,
      parseImgDimensions: true,
      noHeaderId: true,
    });
  }
}
