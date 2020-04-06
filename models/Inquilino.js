const Joi = require('@hapi/joi');

const Schema = Joi.object({
    Nombre: Joi.string().required(),
    Tienda: Joi.string().required(),
})

const SchemaEdit = Joi.object({
    Nombre: Joi.string(),
    Tienda: Joi.string(),
})
    
exports.validInquilino = (req, res, next) => {
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

exports.validEdit = (req, res, next) => {
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