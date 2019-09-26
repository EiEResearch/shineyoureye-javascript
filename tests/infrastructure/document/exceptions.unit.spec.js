import NoFilesFoundError from '@/infrastructure/document/exceptions';


describe('Document.NoFilesFoundError', () => {
  test('should output "No files found"', () => {
    const noFilesFoundError = (file) => {
      if (!file) {
        throw new NoFilesFoundError();
      }
    };
    expect(() => noFilesFoundError()).toThrow('No files found');
  });
});
