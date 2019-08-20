const path = require('path');
const config = require('../../jest.config');
const pack = require('./package');

module.exports = {
  ...config,
  displayName: pack.name,
  name: pack.name,
  rootDir: '.',
  testMatch: [path.join(__dirname, '/**/*.spec.js', '/**/*.test.js')],
};
