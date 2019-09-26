/* eslint-disable no-unused-expressions */
import * as Glob from 'glob';
import MarkdownWithFrontmatter from '@/infrastructure/document/markdown-with-frontmatter';
import NoFilesFoundError from '@/infrastructure/document/exceptions';
import EmptyDocument from '@/infrastructure/document/empty-document';

export default class Finder {
  constructor(pattern, baseurl) {
    this.pattern = pattern;
    this.baseurl = baseurl;
  }

  get findSingle() {
    this.raiseErrorIfMultipleFilesFound();
    this.raiseErrorIfNoFilesFound();
    return this.findAll[0];
  }

  get findOrEmpty() {
    return (this.none) ? Finder.createEmptyDocument : this.findAll[0];
  }

  get findAll() {
    return this.filenames.map(filename => this.createDocument(filename));
  }

  get findFeatured() {
    return this.findAll.filter(filename => filename.featured);
  }

  get multiple() {
    return this.filenames.length > 1;
  }

  get none() {
    return this.filenames.length === 0;
  }

  // private
  // reserved for internal manipulation

  raiseErrorIfMultipleFilesFound() {
    if (this.multiple) {
      throw new NoFilesFoundError(`Multiple posts matched ${this.pattern}`);
    }
  }

  raiseErrorIfNoFilesFound() {
    const message = `No documents matched ${this.pattern}`;
    if (this.none) {
      throw new NoFilesFoundError(message);
    }
  }

  get filenames() {
    const filenames = Glob.sync(this.pattern);
    return filenames.sort();
  }

  createDocument(filename) {
    return new MarkdownWithFrontmatter(filename, this.baseurl);
  }

  static get createEmptyDocument() {
    return new EmptyDocument();
  }
}
