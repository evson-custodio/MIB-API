const debug = require('debug')('mib-api:cluster');

const cluster = require('cluster');
const os = require('os');

function configureCluster(fn, port) {
    const cpus = os.cpus();

    if (cluster.isMaster) {
        debug(`Master ${process.pid} is running`);

        for (const i in cpus) {
            cluster.fork({ id: Number(i) + 1 });
        }

        cluster.on('listening', (worker, address) => {
            debug(`Worker[${worker.id}] ${worker.process.pid} is now connected to ${address.port}`);
        });

        cluster.on('exit', (worker, code, signal) => {
            debug(`Worker[${worker.id}] ${worker.process.pid} died (${signal || code}). Restarting...`);
            cluster.fork();
        });

        for (const id in cluster.workers) {
            cluster.workers[id].requests = 0;
            cluster.workers[id].on('message', (msg) => {
                if (msg.id && msg.cmd && msg.cmd === 'notifyRequest') {
                    let worker = cluster.workers[msg.id];
                    worker.requests++;
                    debug(`Worker[${worker.id}] ${worker.process.pid} total requests: ${worker.requests}`);
                }
            });
        }

    }
    else {
        debug(`Worker[${process.env.id}] ${process.pid} is started`);
        fn(port);
    }
}

module.exports.configureCluster = configureCluster;