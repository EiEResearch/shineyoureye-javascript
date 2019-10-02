import { basename, extname } from 'path';
import { readFileSync } from 'fs';
import chrono from 'chrono-node';
import { DateTime } from 'luxon';
import MarkdownParser from 'api/infrastructure/document/markdown-parser';
import FrontmatterParser from 'api/infrastructure/document/frontmatter-parser';

export default class MarkdownWithFrontmatter {
  constructor(filename, baseurl) {
    this.filename = filename;
    this.baseurl = baseurl;
  }

  get date() {
    const matchData = this.basename.match(this.DATE_PATTERN);
    if (matchData) {
      const parsedDate = chrono.parseDate(matchData[0]);
      return DateTime.fromJSDate(parsedDate);
    }
    return null;
  }

  get title() {
    return this.frontmatter.title;
  }

  get url() {
    return this.baseurl + this.slug;
  }

  get published() {
    return this.frontmatter.published;
  }

  get featured() {
    return this.frontmatter.featured;
  }

  get author() {
    return this.frontmatter.author;
  }

  get eventDate() {
    if (!this.frontmatter.eventDate) {
      return null;
    }

    const parsedDate = chrono.parseDate(this.frontmatter.eventDate);
    return DateTime.fromJSDate(parsedDate);
  }

  get body() {
    return this.markdown.asHtml;
  }

  get slug() {
    return this.rawname;
  }

  // private methods and properties
  // reserved for internal manipulation

  DATE_PATTERN = /^(?<date>\d{4}-\d{2}-\d{2})/;

  get basename() {
    return basename(this.filename);
  }

  get extname() {
    return extname(this.filename);
  }

  get rawname() {
    let rawname = null;
    if (this.basename.match(this.DATE_PATTERN)) {
      rawname = this.basename.replace(`${this.basename.match(this.DATE_PATTERN)[0]}-`, '')
        .replace(this.extname, '');
    } else {
      rawname = this.basename.replace(this.extname, '');
    }
    return rawname;
  }

  get filecontents() {
    const filecontents = readFileSync(this.filename, 'utf8');
    return filecontents;
  }

  get frontmatter() {
    const frontmatter = new FrontmatterParser(this.filecontents);
    return frontmatter;
  }

  get markdown() {
    const markdown = new MarkdownParser(this.filecontents);
    return markdown;
  }
}
