import path from 'path';
import fs from 'fs';
import { all, map, promisify } from 'bluebird';

const statAsync = promisify(fs.stat);

describe('zanity', () => {
  it('works', () =>
    all(
      map(
        [
          'tsconfig.json',
          '.editorconfig',
          'babel.config.js',
          'debug.js',
          'gulpfile.js',
          '.prettierrc.js',
          '.eslintignore',
          '.eslintrc.js',
          ['react', '.eslintignore'],
          ['react', '.eslintrc.js'],
          'tsconfig.react.mono.json',
          'tsconfig.react.json',
          'jest.config.js',
        ],
        (f) => statAsync(path.resolve(__dirname, ...(!Array.isArray(f) ? [f] : f)))
      )
    ));
});
