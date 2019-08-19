import makeConfig from '@znemz/js-common-babel-config';
import { sourceType, env, plugins } from './babel.config.internals';

const babelConfig = makeConfig.bind(undefined, {
  sourceType,
  env,
  plugins,
});

export default babelConfig;
