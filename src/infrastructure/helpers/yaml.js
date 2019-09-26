import metadataParse from 'markdown-yaml-metadata-parser';

export default class YAML {
  static load(src) {
    return metadataParse(src);
  }

  static content(src) {
    return YAML.load(src).content || '';
  }

  static meta(src) {
    return YAML.load(src).metadata;
  }
}
