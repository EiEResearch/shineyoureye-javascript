import DocumentController from 'api/controller/document.controller';

const document = new DocumentController();

describe('Document.Controller', () => {
  test('should return true', () => {
    expect(1).toBe(1);
  });
  test('should return document object when stringified', () => {
    const doc = document.toJSON();

    expect.assertions(11);
    expect(doc).toHaveProperty('title');
    expect(doc).toHaveProperty('slug');
    expect(doc).toHaveProperty('published');
    expect(doc).toHaveProperty('featured');
    expect(doc).toHaveProperty('event_date');
    expect(doc).toHaveProperty('date');
    expect(doc).toHaveProperty('url');
    expect(doc).toHaveProperty('excerpt');
    expect(doc).toHaveProperty('body');
    expect(doc).toHaveProperty('author');
    expect(doc).toHaveProperty('type');
  });

  test('should return 11 as the correct length of document object', () => {
    const doc = document.toJSON();
    expect(Object.keys(doc).length).toEqual(11);
  });
});
