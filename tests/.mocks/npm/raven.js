const Raven = {};
const install = jest.fn();
const config = jest.fn();

Raven.install = install;
Raven.config = config;

// mocking chained function calls
install.mockImplementation((...args) => {
  return Raven;
});
config.mockImplementation((...args) => {
  return Raven;
});

export default Raven;