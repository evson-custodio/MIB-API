module.exports = (api) => {
    const mongoose = api.mongoose;
    const Schema = mongoose.Schema;

    const schema = new Schema({}, { strict: false });
    
    return mongoose.model('File', schema, 'fs.files');
}