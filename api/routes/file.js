const express = require('express');

module.exports = (api) => {
    const FileController = api.controllers.file;
    const router = express.Router();

    router.param('_id', FileController._id);

    router.route('/')
    .post(FileController.create)
    .get(FileController.list);

    router.route('/:_id')
    .get(FileController.read)
    .delete(FileController.delete);

    return router;
}