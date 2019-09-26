import FilePathsHelper from '@/infrastructure/helpers/file-path';

const filePath = new FilePathsHelper();
const content = filePath.contentDir;
const t = 'test';
const dateGlob = '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]';

describe('FilePath:Config Basics', () => {
  test('should return a valid events directory match', () => {
    expect(filePath.eventsDir).toBe(`${content}/events`);
  });

  test('should return a valid info directory match', () => {
    expect(filePath.infoDir).toBe(`${content}/info`);
  });

  test('should return a valid posts directory match', () => {
    expect(filePath.postsDir).toBe(`${content}/posts`);
  });

  test('should return a valid summaries directory match', () => {
    expect(filePath.summariesDir).toBe(`${content}/summaries`);
  });

  describe('FilePath: File Patterns', () => {
    test('should return a valid pattern for an info directory', () => {
      expect(filePath.infoPattern(t)).toBe(`${content}/info/${t}.md`);
    });

    test('should return a valid pattern for a summaries directory', () => {
      expect(filePath.summaryPattern(t)).toBe(`${content}/summaries/${t}.md`);
    });

    test('should ', () => {
      expect(filePath.summariesPattern).toBe(`${content}/summaries/*.md`);
    });

    test('should return wildcard pattern for events and posts', () => {
      expect.assertions(2);
      expect(filePath.eventsPattern).toBe(`${content}/events/${dateGlob}-*.md`);
      expect(filePath.postsPattern).toBe(`${content}/posts/${dateGlob}-*.md`);
    });

    test('should return a valid pattern for a single event or post', () => {
      expect.assertions(2);
      expect(filePath.eventPattern(t)).toBe(`${content}/events/${dateGlob}-${t}.md`);
      expect(filePath.postPattern(t)).toBe(`${content}/posts/${dateGlob}-${t}.md`);
    });
  });
});
