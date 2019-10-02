import MarkdownParser from 'api/infrastructure/document/markdown-parser';

const parser = contents => new MarkdownParser(contents);

describe('Document.MarkdownParser', () => {
  describe('#raw', () => {
    test('should detect an empty file', () => {
      const contents = '';
      expect(parser(contents).raw).toBe('');
    });

    test('should return nothing if there is frontmatter but no markdown', () => {
      const contents = `---
published: false
slug: local-government-elections
eventdate: '2017-07-15'
title: Local Government Elections
featured: true
layout: page
---`;
      expect(parser(contents).raw).toBe('');
    });

    test('should return only markdown if there is no frontmatter', () => {
      const contents = '# A markdown header';
      expect(parser(contents).raw).toBe('# A markdown header');
    });

    test('should return only markdown if it has a frontmatter', () => {
      const contents = `---
foo: bar
---
# A markdown header`;
      expect(parser(contents).raw).toBe('# A markdown header');
    });
  });

  describe('#asHtml', () => {
    test('should return html from markdown', () => {
      const contents = `---
foo: bar
---
# A markdown header`;
      expect(parser(contents).asHtml).toBe('<h1>A markdown header</h1>');
    });

    test('should return empty html from markdown', () => {
      const contents = undefined;
      expect(parser(contents).sanitizeLinks(contents)).toBe('');
    });

    test('should strip out any Prose/Jekyll {{site.baseurl}} markup', () => {
      const expected = '<p><img src="/media/prose-images/infographic.png" alt="infographic.png" title="" /></p>';
      const contents = `---
---
![infographic.png]({{site.baseurl}}/media/prose-images/infographic.png)`;

      expect(parser(contents).asHtml).toBe(expected);
    });

    test('should strip out any {{site.baseurl}} markup in html body', () => {
      const expected = '<p><img alt="SYE weekly review Mar 1 (1).jpg" src="/media/prose-images/SYE weekly review Mar 1 (1).jpg" width="100%" /></p>';
      const contents = `---
---
<p><img alt="SYE weekly review Mar 1 (1).jpg" src="{{site.baseurl}}/media/prose-images/SYE weekly review Mar 1 (1).jpg" width="100%" /></p>`;

      expect(parser(contents).asHtml).toBe(expected);
    });
  });
});
