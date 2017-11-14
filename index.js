#!/usr/bin/env node
const request = require('request');
const _ = require('lodash');
const fs = require('fs');
const ora = require('ora');
const program = require('commander');
const log = console.log;
const path = require('path');
const os = require('os');
const baseDirectory = path.join(os.homedir(), '.pocketsync');
const configFile = path.join(baseDirectory, 'config.json');
const dbFile = path.join(baseDirectory, 'db.json');

let cachedItems;
let config;
let optionError = false;

if( !fs.existsSync(baseDirectory) || !fs.statSync(baseDirectory).isDirectory() ){
  fs.mkdirSync(baseDirectory);
}
if(!fs.existsSync(dbFile) ){
  cachedItems = [];
}else{
  cachedItems = require(dbFile);
}

let cachedCount = cachedItems.length;
if(!fs.existsSync(configFile) ){
  config = {
    page_size: 120,
    last_page: 1
  };
}else{
  config = require(configFile);
}

if( !config.consumer_key || !config.access_token){
    program
   .version('0.0.1')
   .option('-k, --key <consumer_key>', 'The consumer key of your pocket app')
   .option('-t, --token <access_token>', 'The access token of your pocket app')
   .option('-o, --output <output_path>', 'The output file you want save the data')
   .parse(process.argv);

   if( program.key ){
      config.consumer_key = program.key;
   }else{
      optionError = true;
      log('\x1B[31m', 'Please provide consumer key', '\x1B[39m');
   }

   if( program.token ) {
      config.access_token = program.token;
   }else{
      optionError = true;
      log('\x1B[31m', 'Please provide access token', '\x1B[39m');
   }

   if( optionError ){
      process.exit(1);
   }else{
      fs.writeFileSync(configFile, JSON.stringify(config, null, 4));
   }
}

const spinner = ora('Start sync').start();

getItems(config.last_page);

function getItems(){
  let offset = (config.last_page - 1) * config.page_size + 1;
  request.post({
    url: 'https://getpocket.com/v3/get',
    form: {
      "consumer_key": config.consumer_key,
      "access_token": config.access_token,
      "state":"all",
      "detailType":"simple",
      "count": config.page_size,
      "sort":"oldest",
      "offset": offset,
      "since": config.since || 0
    }
  }, function(error, response, body){
    let result;
    if( error ) {
      log('\x1B[31m', error, config.page_size, offset, '\x1B[39m');
      throw error;
    }
    try {
        result = JSON.parse(body, null, 4);
    } catch (e) {
        result = null;
    }

    if( result ){
      items = _.values(result.list);
      if( items.length ){
          [].push.apply(cachedItems, items);
          config.last_page++
          saveOptions();
          spinner.text = 'synced ' + (cachedItems.length - cachedCount);
          getItems(config.last_page);
      }else{
          if( result.since ){
            config.since = result.since;
          }
          config.last_page = 1;
          saveOptions();
          spinner.stop();
          if( program.output ){
            fs.writeFileSync(path.join(__dirname, program.output), JSON.stringify(cachedItems, null, 4));
          }
          log("done! ");
      }
    }
  });
}

function saveOptions(){
  fs.writeFileSync(dbFile, JSON.stringify(cachedItems, null, 4));
  fs.writeFileSync(configFile, JSON.stringify(config, null, 4));
}
