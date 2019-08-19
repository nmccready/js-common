import gulp from 'gulp';
import replace from 'gulp-replace';
import del from 'del';
import { flattenDeep, get } from 'lodash';
import babel from 'gulp-babel';
import program from 'commander';
import fs from 'fs';
import ts from 'gulp-typescript';
import mapPaths from './mapPaths';

const digest = ({ lernaConfig, replaceFind, replaceStr, tsFilter, tsConfig }) => {
  const { compilerOptions: tsconfig } = tsConfig;

  program
    .version(lernaConfig.version)
    .option('-p, --package <p>', 'package to use gulp against')
    .parse(process.argv);

  let packages = fs.readdirSync('packages');

  if (program.package) {
    packages = [program.package];
  }

  /*
Goal is to produce webpack consumable js in which portions of the library
can be consumed without everything.

Rollup is nice, but it usually puts the whole lib together without making the
sections of lib optional.
*/
  const dists = {};

  packages.forEach((p) => {
    dists[p] = `packages/${p}/lib`;
  });

  gulp.task('clean', () => del(Object.values(dists)));

  const build = (
    pack,
    { transform = () => babel(), exts = ['js', 'ts', 'tsx'] } = {}
  ) => () => {
    const src = mapPaths(
      flattenDeep(
        exts.map((ext) => [
          `src/**/*.${ext}`,
          `!src/**/*.spec*.${ext}`,
          `!src/**/*.story*.${ext}`,
        ])
      ),
      pack
    );
    const dest = dists[pack];

    return gulp
      .src(src)
      .pipe(replace(replaceFind, replaceStr))
      .pipe(transform())
      .pipe(gulp.dest(dest));
  };

  // allows types to also piggy back extra `src`
  const types = (pack, { src: _src = [] } = {}) => () => {
    const src = mapPaths(['src/**/*.d.ts'].concat(_src), pack);
    const dest = dists[pack];

    return gulp
      .src(src)
      .pipe(replace(replaceFind, replaceStr))
      .pipe(gulp.dest(dest));
  };

  const typescript = (pack, opts) =>
    build(pack, {
      transform: () =>
        ts({
          ...tsconfig,
        }),
      exts: get(opts, ['ext'], tsFilter),
    });

  return { babel: build, types, packages, typescript };
};

export default digest;
