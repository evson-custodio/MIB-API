module.exports = (schema, options) => {
    let modelSchema = {
        object: schema.obj,
        populable: schema.pluginNames.includes('queryableAndPopulable') ? schema.populable : "Funcionalidade desativada para o Model: Certifique-se de ativar o plugin 'queryableAndPopulable'." 
    }

    removePaths(modelSchema.object);
    schema.modelSchema = modelSchema;

    schema.pluginNames = schema.pluginNames || [];
    schema.pluginNames.push('modelSchema');

    function removePaths(obj) {
        let query = obj;
        let prototype = Object.getPrototypeOf(obj);
    
        if (prototype == Array.prototype) {
            query = obj[0];
        }
        if (prototype == Object.prototype || prototype == Array.prototype) {
            Object.keys(query).forEach(path => {
                if (path === 'trim' || path === 'validate') {
                    delete query[path];
                }
                else {
                    removePaths(query[path]);
                }
            });
        }
    
        return obj;
    }
}