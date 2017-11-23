#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const os = require('os');
const baseDirectory = path.join(os.homedir(), '.pocketsync');
const configFile = path.join(baseDirectory, 'config.json');
const dbFile = path.join(baseDirectory, 'db.json');

if( !fs.existsSync(baseDirectory) || !fs.statSync(baseDirectory).isDirectory() ){
  console.log('Data not found!');
}
if(!fs.existsSync(dbFile) ){
  console.log('Data not found!');
}else{
  cachedItems = require(dbFile);
}

console.log(JSON.stringify(cachedItems));
process.exit(0);
