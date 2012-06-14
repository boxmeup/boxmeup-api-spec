boxmeup-api-test
================

Service test cases for Boxmeup's public REST API.

## Installation

The test harness utilizes frisby.js which works with jasmine-node.

* Fork and clone the repo
* Install jasmine-node globally: ```npm install -g jasmine-node```
* Install based on package manager: ```npm install```

## Setup

The test is distributed with a sample config.js file.  Copy the distributed file and enter
your host value and credentials.

```cp config.js-dist config.js```

## Running

The ```main``` directive in ```package.json``` indicates how to run:

```shell
$ jasmine-node ./spec/ --verbose
```