export default class NoFilesFoundError extends Error {
  constructor(msg = 'No files found') {
    super(msg);
  }
}
