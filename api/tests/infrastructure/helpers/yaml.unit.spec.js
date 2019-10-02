import YAML from 'api/infrastructure/helpers/yaml';

const contents = `---
published: false
slug: local-government-elections
eventdate: '2017-07-15'
title: Local Government Elections
featured: true
layout: page
---
# Hello World
`;

describe('Helpers.YAML', () => {
  test('should return metadata module object', () => {
    const meta = {
      content: '',
      metadata: { },
    };

    expect(YAML.load('')).toEqual(expect.objectContaining(meta));
  });

  test('should return valid metadata object', () => {
    expect(YAML.meta(contents)).toEqual(expect.objectContaining({
      published: false,
      slug: 'local-government-elections',
      eventdate: '2017-07-15',
      title: 'Local Government Elections',
      featured: true,
      layout: 'page',
    }));
  });

  test('should return valid content string', () => {
    expect(YAML.content(contents)).toEqual('# Hello World\n');
  });
});


describe('When frontmatter only has contents', () => {
  test('should return an empty object for metadata', () => {
    const content = `---
---
# Hello World`;
    expect(YAML.meta(content)).toEqual(expect.objectContaining({}));
  });

  test('should return string for content', () => {
    const content = `---
---
# Hello World`;
    expect(YAML.content(content)).toEqual('# Hello World');
  });

  test('should return empty string for content', () => {
    expect.assertions(2);

    const content = `---
---`;
    expect(YAML.content(content)).toEqual('');
    expect(YAML.meta(content)).toStrictEqual({});
  });
});
