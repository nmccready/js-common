import digest from './digest';
import createBuildTasks from './buildTasks';

const getBuildTasks = ({ root, lernaConfig, replaceFind, replaceStr, tsFilter, tsConfig }) => {
  const opts = { root, lernaConfig, replaceFind, replaceStr, tsFilter, tsConfig };
  const digested = digest(opts);

  const buildTasks = createBuildTasks({ ...opts, ...digested });

  return buildTasks;
};

export default getBuildTasks;
