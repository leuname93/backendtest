const Joi = require('@hapi/joi');

const Schema = Joi.object({
    Marca: Joi.string().required(),
    Local: Joi.string().required(),
    Telefono: Joi.string().required(),
})

const SchemaEdit = Joi.object({
    Marca: Joi.string(),
    Local: Joi.string(),
    Telefono: Joi.string(),
})
    
exports.validTiendas = (req, res, next) => {
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

exports.validEditTienda = (req, res, next) => {
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