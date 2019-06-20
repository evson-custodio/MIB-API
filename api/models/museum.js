module.exports = (api) => {
    const mongoose = api.mongoose;
    const Schema = mongoose.Schema;

    const schema = new Schema({
        name: {
            type: 'String',
            trim: true,
            required: true
        },
        description: {
            type: 'String',
            trim: true
        },
        profilePicture: {
            type: 'ObjectId',
            ref: 'File'
        },
        artifacts: [
            {
                type: 'ObjectId',
                ref: 'Artifact'
            }
        ]
    });

    return mongoose.model('Museum', schema);
}