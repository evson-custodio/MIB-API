const debug = require('debug')('mib-api:server');

const http = require('http');
// const port = process.env.PORT || '7777';
const env = require('./config/env')[process.env.NODE_ENV || 'development'];
const os = require('os');

function createServer(port) {
    return new Promise((resolve, reject) => {
        require('./api')(env)
        .then(api => {
            let app = require('./config/express').init(api, port);
            let server = http.createServer(app);

            server.listen(app.get('port'), '0.0.0.0', () => {
                Object.keys(os.networkInterfaces())
                    .map(key => os.networkInterfaces()[key].filter(i => i.family == 'IPv4')[0].address)
                    .forEach(ip => debug(`Listenning: http://${ip}:${app.get('port')}`));
            });

            resolve(api);
        })
        .catch(error => {
            debug('Error: ' + error);
            reject(error);
        });
    });
}

function normalizePort(value) {
    let port = Number.parseInt(value, 10);
    
    if (Number.isNaN(port)) {
        return value;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

module.exports.createServer = createServer;
module.exports.normalizePort = normalizePort;
