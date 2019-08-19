#!/usr/bin/env node
const path = require('path');
const { cliGen } = require('@znemz/js-common-cpy-cli');

cliGen({ src: path.resolve(__dirname, '..', '.prettierrc.js') });
