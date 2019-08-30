import gulp from 'gulp';
import replace from 'gulp-replace';
import rename from 'gulp-rename';
import del from 'del';
import getBuildTasks from './lerna';

const create = ({
  root,
  defaultTask = 'build',
  lernaConfig,
  tsConfig,
  replaceFind = /(import|export)(.*)from '@znemz\/(.*)\/src\/(.*)';/g,
  replaceStr = "$1$2from '@znemz/$3/lib/$4';",
  tsFilter = ['ts', 'tsx', 'd.ts'],
}) => {
  if (!root) {
    throw new Error('root path {root} must be defined.');
  }
  const gulpBuiltTask = getBuildTasks({
    root,
    lernaConfig,
    replaceFind,
    replaceStr,
    tsFilter,
    tsConfig,
  });

  gulpBuiltTask('build');
  gulpBuiltTask('build:ts', { doTs: true, doBabel: false, doTypes: false });

  gulp.task('docs:clean', () => del(['docs/**/*.md', 'docs/packages']));

  gulp.task('docs:assets', () =>
    gulp
      .src(['docs/images/**/*', 'docs/*.ico'], { base: './docs' })
      .pipe(gulp.dest('public'))
      // deal w/ routing bugs and satisfy assets there as well
      .pipe(gulp.dest('public/docs'))
  );

  const docsSource = [
    '**/*.md',
    '**/*.mdx',
    '!**/docs/**',
    '!**/node_modules/**',
    '!node_modules',
  ];

  gulp.task(
    'docs',
    gulp.series('docs:clean', () =>
      gulp
        .src(docsSource)
        .pipe(replace(/\/index.md/g, '')) // fix links
        .pipe(
          rename((filePath) => {
            if (filePath.basename === 'README') {
              filePath.basename = 'index';
              if (filePath.dirname === '.') {
                // we're at root README
                filePath.basename = 'docs';
              }
            }
          })
        )
        .pipe(gulp.dest('docs'))
    )
  );

  gulp.task(
    'docs:watch',
    gulp.series('docs', () => {
      gulp.watch(docsSource, gulp.series('docs'));
    })
  );

  gulp.task('default', gulp.series('clean', gulp.parallel(defaultTask)));

  /*
This is used fo CI only to make sure typescript builds and there are no errors.
This is to make up for the fact that babel-typescript is much more forgiving.
*/
  gulp.task('typescript', gulp.series('clean', 'build:ts', 'clean'));
  gulp.task('tsc', gulp.series('build:ts'));
};

export default create;
