const restrictedGlobals = require('confusing-browser-globals');
const config = require('@znemz/js-common-eslint-config');

module.exports = {
  extends: [
    require.resolve('@znemz/js-common-eslint-config'),
    'airbnb',
    'plugin:prettier/recommended', // needs to be reimported, gets obliterated somehow
    'prettier/react',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    ...config.rules, // some reason this is not being passed down via extend
    'react/jsx-no-bind': 0,
    'react/no-children-prop': 0,
    // https://github.com/facebook/create-react-app/blob/master/packages/eslint-config-react-app/index.js#L123
    'no-restricted-globals': ['error'].concat(restrictedGlobals, 'requestAnimationFrame'),
    'react/jsx-filename-extension': 0,
    'react/sort-comp': 0,
    'react/prop-types': 0, // TODO
    'react/destructuring-assignment': 0,
    'react/no-access-state-in-setstate': 0,
    'react/no-array-index-key': 0, // TODO
    'react/forbid-prop-types': 0,
    'react/forbid-foreign-prop-types': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
  },
  overrides: [
    {
      plugins: ['jest'],
      env: {
        jest: true,
        node: true,
      },
      files: ['__jest__/*.js', '**/*.test.js', '**/*.spec.js'],
      settings: {
        'import/resolver': {
          /*
          NOTE: this forces the requirement of a jest.config.js at every package
          this is will be this way unless findRoot changes allows
          it to not be just based of a spec
          https://github.com/JoinColony/eslint-import-resolver-jest/blob/master/src/index.js#L72
           */
          jest: {
            jestConfigFile: 'jest.config.js',
          },
        },
      },
    },
  ],
};
