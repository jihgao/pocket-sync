#!/usr/bin/env node
const program = require('commander');
program
  .version('0.0.1')
  .description('Fake package manager')
  .command('reset', 'reset the access token and code')
  .command('export', 'export the synchronized data')
  .command('archive', 'archive the data')
  .command('sync', 'synchronize', {isDefault: true})
  .parse(process.argv);
