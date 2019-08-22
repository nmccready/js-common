// @ts-ignore
import { PluginItem, TransformOptions } from 'babel__core'; // eslint-disable-line

export type SourceType = 'script' | 'module' | 'unambiguous' | null;

export const presets: PluginItem[] = [
  '@babel/preset-env',
  '@babel/preset-react',
  [
    '@babel/preset-typescript',
    {
      isTSX: true,
      allExtensions: true,
    },
  ],
];

export const sourceType: SourceType = 'unambiguous';

export interface EnvPlugins {
  development: PluginItem[];
  production: PluginItem[];
  test: PluginItem[];
}

export const envPlugins: EnvPlugins = {
  development: ['@babel/plugin-proposal-class-properties', '@babel/transform-runtime'],
  production: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-react-constant-elements',
    '@babel/transform-runtime',
  ],
  test: ['@babel/plugin-proposal-class-properties', '@babel/transform-runtime'],
};

export type Env = { [index: string]: TransformOptions | null | undefined } | null;

export interface OurEnv extends Env {
  development: TransformOptions;
  production: TransformOptions;
  test: TransformOptions;
}

export const env: OurEnv = {
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
