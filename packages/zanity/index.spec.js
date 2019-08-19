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
        ],
        (f) => statAsync(path.resolve(__dirname, f))
      )
    ));
});
