const restrictedGlobals = require('confusing-browser-globals');

module.exports = {
  extends: [
    require.resolve('@znemz/js-common-eslint-config-react'),
    'prettier/react'
  ],
  plugins: ['emotion'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'import/no-extraneous-dependencies': context => [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
        packageDir: [context.getFilename(), __dirname]
      }
    ],
    'react/jsx-no-bind': 0,
    'react/no-children-prop': 0,
    // https://github.com/facebook/create-react-app/blob/master/packages/eslint-config-react-app/index.js#L123
    'no-restricted-globals': ['error'].concat(
      restrictedGlobals,
      'requestAnimationFrame'
    ),
    'react/jsx-filename-extension': 0,
    'react/sort-comp': 0,
    'react/prop-types': 0, // TODO
    'react/destructuring-assignment': 0,
    'react/no-access-state-in-setstate': 0,
    'react/no-array-index-key': 0, // TODO
    'react/forbid-prop-types': 0,
    'jsx-a11y/mouse-events-have-key-events': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'react/forbid-foreign-prop-types': 0
  },
  overrides: [
    {
      plugins: ['jest'],
      env: {
        jest: true,
        node: true
      },
      files: ['__jest__/*.js', '**/*.test.js', '**/*.spec.js'],
      settings: {
        'import/resolver': {
          jest: {
            jestConfigFile: './jest.config.js'
          }
        }
      }
    }
  ]
};
