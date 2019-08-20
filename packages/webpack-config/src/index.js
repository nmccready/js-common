import * as externals from './externals';

import * as plugins from './plugins';

export { default as module } from './module';

export { externals, plugins };

export const resolve = {
  extensions: ['*', '.js', '.json', '.ts', '.tsx', '.pcss', '.css'],
};

export const node = {
  fs: 'empty',
};
