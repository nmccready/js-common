#!/usr/bin/env node
import path from 'path';
import { cliGen } from '@znemz/js-common-cpy-cli';

cliGen({ src: path.resolve(__dirname, '..', 'tsconfig.json') });
