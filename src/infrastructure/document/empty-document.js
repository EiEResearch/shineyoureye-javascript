export default class EmptyDocument {
  constructor() {
    this._featured = false;
    this._body = '';
  }

  get featured() {
    return this._featured;
  }

  get body() {
    return this._body;
  }
}
