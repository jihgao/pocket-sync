# pocket-sync

A command-line tool for synchronizing your pocket items to your local database

## Install

`npm install -g https://github.com/jihgao/pocket-sync.git`

## Usage

- Synchronize: `pocketsync sync -k <consumer key> -t <access token>`

- Reset data, consumer and access access token:  `pocketsync reset`

- Export the cached data to other file: `pocketsync export > <your_json_file_path.json>`

- Archive the cached data: `pocketsync archive`


## Options

* -k The consumer key of your pocket app

* -t The access token of your pocket app

## Notes

You just need provide consumer key and access token at the first time you run the command
