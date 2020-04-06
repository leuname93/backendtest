const Joi = require('@hapi/joi');

const Schema = Joi.object({
    Nombre: Joi.string().required(),
    Logo: Joi.string().required(),
    Descripcion: Joi.string().required(),
})

const SchemaEdit = Joi.object({
    Nombre: Joi.string(),
    Logo: Joi.string(),
    Descripcion: Joi.string(),
})
    
exports.validMarcas = (req, res, next) => {
    const {body} = req
    const value = Schema.validate(body)
    if(value.error){
        return res.status(400).send({
            success: false,
            message: value.error.message
        })
    }
    next()
} 

exports.validEditMarcas = (req, res, next) => {
    const {body} = req
    const value = SchemaEdit.validate(body)
    if(value.error){
        return res.status(400).send({
            success: false,
            message: value.error.message
        })
    }
    next()
} 