import EmptyDocument from 'api/infrastructure/document/empty-document';


describe('Document.EmptyDocument', () => {
  const document = new EmptyDocument();

  test('should set featured to false', () => {
    expect(document.featured).toBe(false);
  });

  test('should return an empty body', () => {
    expect(document.body).toBe('');
  });
});
