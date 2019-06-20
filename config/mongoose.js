const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

const uniqueValidator = require('mongoose-unique-validator');
const messageValidator = require('./../plugins/messageValidator');
const queryableAndPopulable = require('./../plugins/queryableAndPopulable');
const modelSchema = require('./../plugins/modelSchema');

const debug = require('debug')('mib-api:config:mongoose');

module.exports.connect = (config) => new Promise((resolve, reject) => {
    if (config) {
        let promise;

        if (config.use_env_variable) {
            promise = mongoose.connect(process.env[config.use_env_variable], config.options);
        }
        else {
            promise = mongoose.connect(config.uri, config.options);
        }

        promise.then(() => {
            mongoose.gfs = Grid(mongoose.connection.db, mongoose.mongo);

            mongoose.plugin(uniqueValidator);
            mongoose.plugin(messageValidator);
            mongoose.plugin(queryableAndPopulable);
            mongoose.plugin(modelSchema);

            resolve(mongoose);
        })
        .catch(error => {
            reject(error);
        });
    }
    else {
        reject(new Error('Connection not found!'));
    }
});