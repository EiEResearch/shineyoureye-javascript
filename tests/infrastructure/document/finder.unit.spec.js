import * as Glob from 'glob';
import * as File from 'fs';
import * as Path from 'path';
import * as tmp from 'tmp';
import Finder from '@/infrastructure/document/finder';
import MarkdownWithFrontmatter from '@/infrastructure/document/markdown-with-frontmatter';

jest.mock('glob');

const filename = 'file-name';
const finder = new Finder(`${filename}.md`, '/path/');

const newTempfile = (contents, file) => {
  const options = { template: `${file}-XXXXXX`, postfix: '.md' };
  const tempFile = tmp.tmpNameSync(options);

  if (tempFile) {
    File.writeFileSync(tempFile, contents);
  }

  return tempFile;
};

describe('Document.Finder', () => {
  test('should find a single document', () => {
    Glob.sync.mockReturnValue([filename]);
    expect(finder.findSingle).toBeInstanceOf(MarkdownWithFrontmatter);
  });

  test('should create a document with the right url', () => {
    const contents = `---
slug: a-slug
---`;
    Glob.sync.mockReturnValue([newTempfile(contents, filename)]);
    const expectedSlug = Path.basename(filename, '.*');
    expect(finder.findSingle.url).toEqual(expect.stringContaining(`/path/${expectedSlug}`));
  });

  test('should create a document with the right title', () => {
    const contents = `---
published: true
slug: sye-week-in-review-august-30
title: 'SYE Week in Review, August 30'
---`;
    Glob.sync.mockReturnValue([newTempfile(contents, filename)]);
    expect(finder.findSingle.title).toEqual('SYE Week in Review, August 30');
  });

  test('should find several documents', () => {
    Glob.sync.mockReturnValue([filename, 'another-file']);
    expect(finder.findAll.length).toEqual(2);
  });

  test('should sort the found filenames alphabetically', () => {
    Glob.sync.mockReturnValue(['zed', 'be']);
    expect(finder.findAll[0].basename).toEqual('be');
  });
});

describe('when it fails to find a document', () => {
  describe('when multiple documents with same name and different dates', () => {
    test('should raise an exception if method is called directly', () => {
      Glob.sync.mockReturnValue(['2016-01-01-file-name', '2012-01-01-file-name']);
      expect.assertions(2);
      expect(() => finder.findSingle).toThrow();
      expect(() => finder.findSingle).toThrowError('file-name.md');
    });

    test('should check before calling the method', () => {
      Glob.sync.mockReturnValue(['2016-01-01-file-name', '2012-01-01-file-name']);
      expect(finder.multiple).toEqual(true);
    });
  });
});

describe('when there are no documents with a slug', () => {
  test('should raise an exception if method is called directly', () => {
    Glob.sync.mockReturnValue([]);
    expect(() => finder.findSingle).toThrow();
    expect(() => finder.findSingle).toThrowError('file-name.md');
  });

  test('should check before calling the method', () => {
    Glob.sync.mockReturnValue([]);
    expect(finder.none).toEqual(true);
  });
});

describe('when searching for a summary', () => {
  test('should find a summary', () => {
    const contents = `---
---
summary`;
    Glob.sync.mockReturnValue([newTempfile(contents)]);
    expect(finder.findOrEmpty.body).toEqual('<p>summary</p>');
  });
});

describe('when no summary is found', () => {
  test('should return a duck type', () => {
    Glob.sync.mockReturnValue([]);
    expect(finder.findOrEmpty.body).toEqual('');
  });
});

describe('when searching featured documents', () => {
  const contents = `---
featured: true
---
# Foo`;
  const files = [newTempfile(contents, 'foo'), newTempfile(contents, 'bar')];

  test('should get all', () => {
    Glob.sync.mockReturnValue(files);
    expect(finder.findFeatured.length).toEqual(2);
  });

  test('should get all as documents', () => {
    Glob.sync.mockReturnValue(files);
    expect(finder.findFeatured[0].body).toEqual('<h1>Foo</h1>');
  });
});
