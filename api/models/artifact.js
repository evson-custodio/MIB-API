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
        museum: {
            type: 'ObjectId',
            ref: 'Museum'
        },
        images: [
            {
                type: 'ObjectId',
                ref: 'File'
            }
        ],
        videos: [
            {
                type: 'ObjectId',
                ref: 'File'
            }
        ]
    });

    return mongoose.model('Artifact', schema);
}