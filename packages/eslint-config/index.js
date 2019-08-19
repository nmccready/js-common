const prettier = require('@znemz/js-common-prettierrc-clone/.prettierrc');

module.exports = {
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    es6: true,
    browser: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'max-len': ['error', { code: prettier.printWidth, ignoreUrls: true }], // KEEP THIS IN SYNC
    indent: 'off',
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'no-unused-vars': 2,
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-object-literal-type-assertion': 0,
    // * BEGIN TODO add to eslint rules
    'no-implicit-globals': 2,
    // * END TODO add to eslint rules
    'no-param-reassign': 0, // TODO ['error', { props: false }],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'comma-dangle': 0,
    'arrow-parens': ['error', 'always'],
    'no-use-before-define': 0,
    'no-plusplus': 0,
    'import/prefer-default-export': 0,
    'implicit-arrow-linebreak': 0,
    'class-methods-use-this': 0,
    'object-curly-newline': 0,
    'consistent-return': 0,
    'no-underscore-dangle': 0,
    'one-var': 0,
    'prefer-destructuring': ['error', { VariableDeclarator: { object: true } }],
    'import/no-named-as-default-member': 0,
    'import/no-named-as-default': 0,
    // https://github.com/benmosher/eslint-plugin-import/issues/458#issuecomment-468235671
    'import/no-dynamic-require': 0,
    'no-continue': 0,
    'no-multi-assign': 0,
    'global-require': 0,
  },
};
