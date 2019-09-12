# babel-config

Babel configuration exposed in one stop to stop copying and pasting settings.

## How to use

Create a `babel.config.js` in the root of your lerna or monorepo project.

```babel.config.js
import babelConfig from '@znemz/js-common-babel-config';

export default babelConfig();
```

or commonjs

```babel.config.js
const { default : babelConfig } = require('@znemz/js-common-babel-config');

module.exports =  babelConfig();
```
