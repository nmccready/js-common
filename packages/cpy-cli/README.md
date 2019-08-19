# cpy-cli

Cli generator to access [sindresorhus/cpy](https://github.com/sindresorhus/cpy) for various projects to clone boilerplate files.

## How to use

Main intent is to use this pragmatically via the js api, otherwise just use the simpler cpy cli instead.

JS API Example:

```js
#!/usr/bin/env node
import path from 'path';
import { cliGen } from '@znemz/js-common-cpy-cli';

cliGen({ src: path.resolve(__dirname, '..', 'tsconfig.json') });
```

However if you're so inclined to use the js-common-cpy-cli.

Example Cli:

```sh
❯ node_modules/.bin/js-common-cpy-cli --help
Usage: js-common-cpy-cli [options]

Options:
  -V, --version   output the version number
  -d, --dest <d>  dest path
  -s, --src <s>   source glob
  -h, --help      output usage information
```

```sh
js-common-cpy-cli -s src/**.*.js -d ./dist
```
