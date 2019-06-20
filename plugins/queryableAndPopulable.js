module.exports = (schema, options) => {
    schema.queryable = [];
    schema.populable = [];
    schema.eachPath((path, type) => {
        if (type.instance === 'Array') {
            if (type.caster.options.ref) {
                schema.populable.push(path);
            }
            schema.queryable.push(path);
        }
        else if (type.instance === 'ObjectID' && type.options.ref) {
            schema.populable.push(path);
        }
    });

    schema.pluginNames = schema.pluginNames || [];
    schema.pluginNames.push('queryableAndPopulable');
}