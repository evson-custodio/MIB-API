const debug = require('debug')('adotapet:api:controllers:file');

function notifyCluster() {
    process.send({ id: process.env.id, cmd: 'notifyRequest' });
}

module.exports = (api) => {
    const gfs = api.mongoose.gfs;
    const FileSchema = api.models.file;

    return {
        _id: (req, res, next, _id) => {
            req._id = _id;
            next();
        },
        create: (req, res) => {
            notifyCluster();
            let ws = gfs.createWriteStream({
                filename: req.headers.filename
            });
            req.pipe(ws);
            ws.on('error', error => {
                debug(error);
                res.status(400).json(error);
            });
            ws.on('close', file => {
                debug('File ' + file.filename + ' criado!');
                res.status(201).json(file);
            });
        },
        read: (req, res) => {
            notifyCluster();
            FileSchema.findOne({_id: req._id})
            .exec()
            .then(file => {
                if (file) {
                    gfs.createReadStream({_id: req._id}).pipe(res)
                    .on('finish', () => {
                        debug('File ' + file._id + ' enviado pelo id!');
                    });
                }
                else {
                    res.status(404).json({
                        message: 'File não encontrado!'
                    });
                }
            })
            .catch(error => {
                res.status(400).json(error);
            });
        },
        delete: (req, res) => {
            notifyCluster();
            FileSchema.findOne({_id: req._id})
            .exec()
            .then(file => {
                if (file) {
                    gfs.remove({_id: req._id}, error => {
                        if (error) {
                            res.status(400).json(error);
                        }
                        else {
                            debug('File ' + file._id + ' deletado pelo id!');
                            res.status(200).json(file);
                        }
                    });
                }
                else {
                    res.status(404).json({
                        message: 'File não encontrado!'
                    });
                }
            })
            .catch(error => {
                res.status(404).json(error);
            });
        },
        list: (req, res) => {
            notifyCluster();
            FileSchema.find(req.query)
            .exec()
            .then(files => {
                res.status(200).json(files);
            })
            .catch(error => {
                res.status(400).json(error);
            });
        }
    }
}