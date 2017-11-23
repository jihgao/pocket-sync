#!/usr/bin/env node
const fs = require('fs');
const ora = require('ora');
const path = require('path');
const os = require('os');
const baseDirectory = path.join(os.homedir(), '.pocketsync');
const configFile = path.join(baseDirectory, 'config.json');
const dbFile = path.join(baseDirectory, 'db.json');

if( !fs.existsSync(baseDirectory) || !fs.statSync(baseDirectory).isDirectory() ){
  fs.mkdirSync(baseDirectory);
}
resetOptions();


function resetOptions(){
  fs.writeFileSync(dbFile, JSON.stringify([], null, 4));
  fs.writeFileSync(configFile, JSON.stringify({
    page_size: 120,
    last_page: 1
  }, null, 4));
}
