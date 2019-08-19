import program from 'commander';
import cpy from 'cpy';

const { version: defaultVersion } = require('../package.json');

const debug = require('../debug').spawn('cliGen');

export interface Args {
  dest?: string;
  src?: string;
}

export interface CliGenOpts extends Args {
  version?: string;
}

export const cliGen = ({ src, version = defaultVersion, dest = '.' }: CliGenOpts = {}) => {
  debug(() => process.argv);

  program.version(version);

  program
    .option('-d, --dest <d>', 'dest path')
    .option('-s, --src <s>', 'source glob')
    .parse(process.argv);

  const { src: _src, dest: _dest } = (program as unknown) as Args;

  src = _src || src;
  dest = _dest || dest;

  debug(() => ({ src, dest }));

  return cpy([src], dest)
    .then((ret) => {
      debug(() => ret);
      process.exit(0);
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
};

export default cliGen;
