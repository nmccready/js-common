import makeConfig from '@znemz/js-common-babel-config';
import { sourceType, env, plugins } from './babel.config.internals';

const babelConfig = makeConfig({
  sourceType,
  env,
  plugins
});

export default babelConfig;
