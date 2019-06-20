const express = require('express');

const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const logger = require('morgan');
const cors = require('cors');
const handlerError = require('errorhandler');

module.exports.init = (api, port) => {
    const Generic = api.utils.generic;

    const app = express();

    app.set('port', port);

    app.use(logger('dev'));
    app.use(methodOverride());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(cors());

    Generic.rest(app, api);

    if (app.get('env') == 'development') {
        app.use(handlerError());
    }

    return app;
}