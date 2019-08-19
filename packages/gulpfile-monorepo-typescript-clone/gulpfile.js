import createTasks from '@znemz/js-common-gulp-monorepo-typescript';
import path from 'path';

// TODO: add a replace filter to remove these comments from the root copied clone
// resolutions come from mono repo root cloners
// eslint-disable-next-line import/no-unresolved
const tsConfig = require('./tsconfig.json');
// eslint-disable-next-line import/no-unresolved
const lernaConfig = require('./lerna.json');

createTasks({ root: path.resolve(__dirname), lernaConfig, tsConfig });
