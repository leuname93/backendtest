const Joi = require('@hapi/joi');

const Schema = Joi.object({
    Nombre: Joi.string().required(),
    Direccion: Joi.string(),
    Telefono: Joi.string(),
    Horario: Joi.string(),
    Estatus: Joi.string(),
})

const SchemaEdit = Joi.object({
    Nombre: Joi.string(),
    Direccion: Joi.string(),
    Telefono: Joi.string(),
    Horario: Joi.string(),
    Estatus: Joi.string(),
})
    
exports.validBodyCentroComercial = (req, res, next) => {
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