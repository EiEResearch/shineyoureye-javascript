const path = require('path');

module.exports = {
  root: path.resolve(path.join(__dirname)),
  bin: path.resolve(path.join(__dirname, 'bin')),
  coverage: path.resolve(path.join(__dirname, 'coverage')),
  prose: path.resolve(path.join(__dirname, 'prose')),
  public: path.resolve(path.join(__dirname, 'public')),
  src: path.resolve(path.join(__dirname, 'src')),
  tests: path.resolve(path.join(__dirname, 'tests')),
};
