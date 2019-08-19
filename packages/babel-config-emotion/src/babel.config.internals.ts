// @ts-ignore
import { PluginItem } from 'babel__core'; // eslint-disable-line

import * as babel from '@znemz/js-common-babel-config/lib/babel.config.internals';

export const presets: PluginItem[] = [...babel.presets, '@emotion/babel-preset-css-prop'];

export const { sourceType } = babel;

export const envPlugins: babel.EnvPlugins = {
  development: [...babel.envPlugins.development, 'emotion'],
  production: [...babel.envPlugins.production, 'emotion'],
  test: [...babel.envPlugins.test, 'emotion'],
};

export const env: babel.OurEnv = {
  development: {
    presets,
    plugins: envPlugins.development,
  },
  production: {
    presets,
    plugins: envPlugins.production,
  },
  test: {
    presets,
    plugins: envPlugins.test,
  },
};

export const plugins: PluginItem[] = [];
