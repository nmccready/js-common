import { pick, omit } from 'lodash';

export const Config = (config) => ({
  'our-config': JSON.stringify(omit(config, config.omit)),
});
// security reasons we only take bare min from package.json
// using this allows backend and frontend to use package.json
// the same way / path to package.json
export const packageJson = (pkg, picks = ['name', 'version']) => ({
  './package.json': JSON.stringify(pick(pkg, picks)),
});
