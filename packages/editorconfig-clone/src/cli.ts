#!/usr/bin/env node
import { cliGen } from '@znemz/js-common-cpy-cli';
import path from 'path';

cliGen({ src: path.resolve(__dirname, '.editorconfig') });
