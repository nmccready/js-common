const debug = require('../../debug').spawn('lerna:mapPaths');

const mapPaths = (paths = [], pack) =>
  paths.map((path) => {
    let ret;
    if (/!.*/.test(path)) {
      ret = `!packages/${pack}/${path.replace('!', '')}`;
    } else {
      ret = `packages/${pack}/${path}`;
    }
    debug(() => ret);
    return ret;
  });

export default mapPaths;
