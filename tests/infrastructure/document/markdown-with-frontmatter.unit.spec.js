
import * as File from 'fs';
import * as Path from 'path';
import * as tmp from 'tmp';

import MarkdownWithFrontmatter from '@/infrastructure/document/markdown-with-frontmatter';

const newTempfile = (contents, filename) => {
  const options = { template: `${filename}-XXXXXX`, postfix: '.md' };
  const tempFile = tmp.tmpNameSync(options);

  if (tempFile) {
    File.writeFileSync(tempFile, contents);
  }

  return tempFile;
};

const basicDocument = filename => new MarkdownWithFrontmatter(filename, 'irrelevant');

afterAll(() => tmp.setGracefulCleanup());

describe('Document.MarkdownWithFrontmatter', () => {
  const contents = `---
title: A Title
slug: a-slug
published: true
eventdate: '2000-01-01 15:00 +0000'
---
# Hello World`;
  const document = new MarkdownWithFrontmatter(newTempfile(contents, '1000-10-01-file-name'),
    '/events/');

  test('should have a title', () => {
    expect(document.title).toEqual('A Title');
  });

  test('should have a url', () => {
    const expectedSlug = Path.basename(document.filename, '.*').replace(/^1000-10-01-/, '');
    expect(document.url).toEqual(expect.stringContaining(expectedSlug));
  });

  test('should have a published field', () => {
    expect(document.published).toBe(true);
  });

  test('should have a body', () => {
    expect(document.body).toEqual('<h1>Hello World</h1>');
  });

  test('should have a date', () => {
    expect.assertions(3);
    expect(document.date.year).toEqual(1000);
    expect(document.date.month).toEqual(10);
    expect(document.date.day).toEqual(1);
  });

  test('should not be featured', () => {
    expect(document.featured).toEqual(false);
  });

  test('should have an event date', () => {
    expect.assertions(3);
    expect(document.eventDate.year).toEqual(2000);
    expect(document.eventDate.month).toEqual(1);
    expect(document.eventDate.day).toEqual(1);
  });
});

describe('when there is no slug field', () => {
  test('should build the slug from the filename', () => {
    const document = basicDocument(newTempfile('', '2000-20-02-file-name'));
    expect(document.slug).toEqual(expect.stringContaining('file-name'));
  });

  test('should build the slug if no date in filename', () => {
    const document = basicDocument(newTempfile('', '1234-5678'));
    expect(document.slug).toEqual(expect.stringContaining('1234-5678'));
  });
});

describe('when there is no date in the filename', () => {
  test('should return null', () => {
    const document = basicDocument('file-name');
    expect(document.date).toBeNull();
  });
});

describe('when there is no event date field', () => {
  test('should return null', () => {
    const document = basicDocument(newTempfile('', '2000-20-02-file-name'));
    expect(document.eventDate).toBeNull();
  });
});

describe('when other formats in event date field', () => {
  test('should parse a slashed date', () => {
    const document = basicDocument(newTempfile(`---
eventdate: '24/1/2017'
---`, '2000-20-02-file-name'));
    expect.assertions(3);
    expect(document.eventDate.year).toEqual(2017);
    expect(document.eventDate.month).toEqual(1);
    expect(document.eventDate.day).toEqual(24);
  });

  test('should parse a date with spaces and named month', () => {
    const document = basicDocument(newTempfile(`---
eventdate: '24 March 2017'
---`, '2000-20-02-file-name'));
    expect.assertions(3);
    expect(document.eventDate.year).toEqual(2017);
    expect(document.eventDate.month).toEqual(3);
    expect(document.eventDate.day).toEqual(24);
  });

  test('should parse a plain ISO-8601 date', () => {
    const document = basicDocument(newTempfile(`---
eventdate: '2017-01-24'
---`, '2000-20-02-file-name'));
    expect.assertions(3);
    expect(document.eventDate.year).toEqual(2017);
    expect(document.eventDate.month).toEqual(1);
    expect(document.eventDate.day).toEqual(24);
  });
});
