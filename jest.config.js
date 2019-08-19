const debug = require('./debug').spawn('jest');

const toNotIgnore = {
  modules: [].join('|'),
};

const toExport = {
  projects: ['<rootDir>/packages/*/jest.config.js'],
  transformIgnorePatterns: [
    'node_modules',
    '/<rootDir>/packages/lib',
    '/<rootDir>/(?!packages)/.*/',
  ],
  setupFilesAfterEnv: ['<rootDir>/node_modules/@znemz/react-extras-jest/lib/setup.js'],
  verbose: true,
};

if (toNotIgnore.modules.length) {
  toExport.transformIgnorePatterns.push(`/node_modules/(?!(${toNotIgnore.modules}))`);
}

debug(() => toExport.transformIgnorePatterns);

module.exports = toExport;
