# gulp-monorepo-typescript

Gulp tasks which will build all packages in a lerna project via babel, typescript or both.

## How to use

Create a `gulpfile.js` in the root of your lerna or monorepo project.

Note if you're using esm modules like below, then launch gulp via `"gulp": "node -r esm ./node_modules/.bin/gulp",` until node supports es modules by default.

```gulpfile.js
import createTasks from '@znemz/js-common-gulp-monorepo-typescript';
import path from 'path';

const tsConfig = require('./tsconfig.json');
const lernaConfig = require('./lerna.json');

createTasks({ root: path.resolve(__dirname), lernaConfig, tsConfig });
```
