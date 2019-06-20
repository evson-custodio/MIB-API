module.exports = (schema, options) => {
    schema.eachPath((path, type) => {
        let min = type.validators.find(value => value.type == 'min');
        let max = type.validators.find(value => value.type == 'max');
        let minlength = type.validators.find(value => value.type == 'minlength');
        let maxlength = type.validators.find(value => value.type == 'maxlength');
        let required = type.validators.find(value => value.type == 'required');
        let unique = type.validators.find(value => value.type == 'unique');

        if (min != null && max != null) {
            let message = null;
            if (min.min == max.max) {
                message = `A propriedade '${path}' deve possuir o valor ${min.min}!`;
            }
            else {
                message = `A propriedade '${path}' deve possuir valor entre ${min.min} e ${max.max}!`;
            }
            min.message = message;
            max.message = message;
        }
        else if (min != null) {
            let message = `A propriedade '${path}' deve possuir valor no mínimo ${min.min}!`;
            min.message = message;
        }
        else if (max != null) {
            let message = `A propriedade '${path}' deve possuir valor no máximo ${max.max}!`;
            max.message = message;
        }

        if (minlength != null && maxlength != null) {
            let message = null;
            if (minlength.minlength == maxlength.maxlength) {
                message = `A propriedade '${path}' deve possuir exatamente ${minlength.minlength} caracteres!`;
            }
            else {
                message = `A propriedade '${path}' deve possuir entre ${minlength.minlength} e ${maxlength.maxlength} caracteres!`;
            }
            minlength.message = message;
            maxlength.message = message;
        }
        else if (minlength != null) {
            let message = `A propriedade '${path}' deve possuir no mínimo ${minlength.minlength} caracteres!`;
            minlength.message = message;
        }
        else if (maxlength != null) {
            let message = `A propriedade '${path}' deve possuir no máximo ${maxlength.maxlength} caracteres!`;
            maxlength.message = message;
        }

        if (required != null) {
            let message = `A propriedade '${path}' é obrigatória!`;
            required.message = message;
        }

        if (unique != null) {
            let message = `A propriedade '${path}' deve ser única!`;
            unique.message = message;
        }
    });

    schema.pluginNames = schema.pluginNames || [];
    schema.pluginNames.push('messageValidator');
}