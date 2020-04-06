const Joi = require('@hapi/joi');

const Schema = Joi.object({
    NoLocal: Joi.string().required(),
    CentroComercial: Joi.string().required(),
    Dimensiones: Joi.string().required(),
})

const SchemaEdit = Joi.object({
    NoLocal: Joi.string(),
    CentroComercial: Joi.string(),
    Dimensiones: Joi.string(),
})
    
exports.validLocales = (req, res, next) => {
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

exports.validEditLocales = (req, res, next) => {
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