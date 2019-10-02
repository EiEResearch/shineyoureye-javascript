import FrontmatterParser from 'api/infrastructure/document/frontmatter-parser';

const parser = contents => new FrontmatterParser(contents);

const contentFull = `---
published: false
slug: local-government-elections
eventdate: '2017-07-15'
title: 'Local Government Elections'
featured: true
layout: page
---
# Hello World
`;

const contentEmpty = `---
foo: true
bar: local-government-elections
echo: '2017-07-15'
red: Local Government Elections
layout: page
---
# Hello World
`;

afterEach(() => {
  // Clear all instances and calls to constructor and all methods:
  delete parser();
});

describe('Document::FrontmatterParser', () => {
  describe('when file has frontmatter', () => {
    test('should finds the title', () => {
      expect(parser(contentFull).title).toBe('Local Government Elections');
    });

    test('should return an empty string if there is no title', () => {
      expect(parser(contentEmpty).title).toBe('');
    });

    test('should find the slug', () => {
      expect(parser(contentFull).slug).toBe('local-government-elections');
    });

    test('should know if it is published', () => {
      expect(parser(contentFull).published).toBe(false);
    });

    test('should publishe by default if there is no published field', () => {
      expect(parser(contentEmpty).published).toBe(true);
    });

    test('should know if it is featured', () => {
      expect(parser(contentFull).featured).toBe(true);
    });

    test('should know it is not featured by default', () => {
      expect(parser(contentEmpty).featured).toBe(false);
    });

    test('should have an event date', () => {
      expect(parser(contentFull).eventDate).toBe('2017-07-15');
    });

    test('if there is no event date, should return an empty string', () => {
      expect(parser(contentEmpty).eventDate).toBe('');
    });
  });

  describe('When frontmatter is empty', () => {
    test('should return an empty string', () => {
      const content = `---
          ---`;
      expect(parser(content).title).toBe('');
    });

    test('should return an empty meta object', () => {
      const content = `---
          ---`;
      expect(parser(content).fetch('foo')).toBe('');
    });
  });

  describe('When frontmatter only has contents', () => {
    test('should return an empty string for title', () => {
      const content = '# Hello World';
      expect(parser(content).title).toBe('');
    });
  });

  describe('When frontmatter file is empty', () => {
    test('should not break', () => {
      const content = '';
      expect(parser(content).title).toBe('');
    });
  });
});
