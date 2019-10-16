import gulp from 'gulp';
import { compact, map, get } from 'lodash';
import path from 'path';

const debug = require('../../debug').spawn('lerna:buildTasks');

export const getBuildOptions = ({ root, pack, doBabel, doTs, doTypes }) => {
  const dbg = debug.spawn('getBuildOptions');
  const pkgPath = path.join(root, 'packages', pack, 'package.json');
  dbg(() => pkgPath);
  const pkg = require(pkgPath);
  dbg(() => 'succes');
  const pkgOpts = get(pkg, ['gulp', 'opts'], {});
  return { doBabel, doTs, doTypes, ...pkgOpts };
};

const createBuildTasks = ({ root, packages, typescript, babel, types }) => {
  const buildTasks = ({ doBabel = true, doTs = true, doTypes = true } = {}) => {
    let series = [];
    const parallel = [];

    for (let i = 0; i < packages.length; i++) {
      const pack = packages[i];
      const { exts, src, skip, ...opts } = getBuildOptions({
        root,
        pack,
        doBabel,
        doTs,
        doTypes,
      });
      const taskNames = compact(map(opts, (v, k) => (v ? k : false))).join(':');
      const taskName = `build:${pack}:${taskNames}`;

      const _parallel = [];
      const _series = [];

      if (skip) {
        continue;
      }

      if (doTs) {
        // typescript should be first to .d.ts files
        // babel outputs real js
        _series.push(typescript(pack, { exts }));
      }

      if (doBabel) {
        _series.push(babel(pack, { exts }));
      }

      if (doTypes) {
        _parallel.push(types(pack, { src }));
      }

      gulp.task(taskName, gulp.parallel(gulp.series(..._series), ..._parallel));
      if (opts.doSeries) {
        if (opts.seriesPosition === 'head') {
          series = [taskName].concat(series);
        } else if (opts.dependsOn) {
          const index = series.findIndex((s) => s.includes(opts.dependsOn));
          series.splice(index, 0, taskName);
        } else series.push(taskName);
        continue;
      }
      parallel.push(taskName);
    }
    return { series, parallel };
  };
  return gulpBuildTask.bind(undefined, buildTasks);
};

export const gulpBuildTask = (buildTasks, taskName, opts = {}) => {
  const tasks = buildTasks({ ...opts });

  debug(() => tasks);
  gulp.task(
    taskName,
    ...flattenTasks(gulp.series, [
      ...tasks.series,
      ...flattenTasks(gulp.parallel, tasks.parallel),
    ])
  );
};

// work-around undertaker complaining about an empty set of tasks
export const flattenTasks = (takerFn, tasks) => {
  if (!tasks.length) return tasks;
  return [takerFn(...tasks)];
};

export default createBuildTasks;
