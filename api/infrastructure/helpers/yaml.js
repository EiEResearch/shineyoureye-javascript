import parseMD from 'parse-md';

export default class YAML {
  static load(src) {
    return parseMD(src);
  }

  static content(src) {
    return YAML.load(src).content || '';
  }

  static meta(src) {
    return YAML.load(src).metadata || {};
  }
}
