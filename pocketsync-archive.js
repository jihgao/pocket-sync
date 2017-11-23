#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const os = require('os');
const baseDirectory = path.join(os.homedir(), '.pocketsync');
const configFile = path.join(baseDirectory, 'config.json');
const dbFile = path.join(baseDirectory, 'db.json');
const archiveFile = path.join(baseDirectory, 'db' + (+Date.now())  + '.json');
if( !fs.existsSync(baseDirectory) || !fs.statSync(baseDirectory).isDirectory() ){
  console.log('Data not found!');
}
if(fs.existsSync(dbFile)){
  cachedItems = require(dbFile);
  fs.writeFileSync(archiveFile, JSON.stringify(cachedItems, null, 4));
  console.log('Archived to ', archiveFile);
}
