const debug = require('debug')('mib-api:index');

const server = require('./server');
const cluster = require('./cluster');

cluster.configureCluster(server.createServer, 7777);