const debug = require('debug')('mib-api:api:index');
const consign = require('consign');

module.exports = (config) => new Promise((resolve, reject) => {
    const api = {};

    require('./../config/mongoose')
    .connect(config)
    .then(mongoose => {
        api.mongoose = mongoose;

        consign({cwd: __dirname})
        .include('utils')
        .then('models')
        .then('controllers')
        .then('routes')
        .into(api);

        resolve(api);
    })
    .catch(error => {
        reject(error);
    });
});
