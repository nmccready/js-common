// OMFG, babel and a monorepo is a nightmare
// https://github.com/facebook/jest/issues/6933#issuecomment-419904621
// https://babeljs.io/docs/en/v7-migration
// https://github.com/babel/babel/issues/8900#issuecomment-431240426
// https://github.com/babel/babel/issues/8309#issuecomment-449515834
// eslint-disable-next-line
import * as internals from './babel.config.internals';

const babelConfig = ({
  babelrcRoots = ['.', './packages/*'],
  ignore = [/node_modules/],
  sourceType = internals.sourceType,
  env = internals.env,
  plugins = internals.plugins,
  doCache = true,
} = {}) => (api) => {
  api.cache(doCache);
  return {
    babelrcRoots,
    ignore,
    sourceType,
    env,
    plugins,
  };
};

export default babelConfig;
