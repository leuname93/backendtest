const Joi = require('@hapi/joi');

const Schema = Joi.object({
    Nombre: Joi.string().required(),
    Correo: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    Password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    Perfil: Joi.string().valid('Administrador', 'Inquilino').required(),
})

const SchemaLogin = Joi.object({
    Nombre: Joi.string().required(),
    Password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
})

const SchemaEdit = Joi.object({
    Nombre: Joi.string(),
    Correo: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    Password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    Perfil: Joi.string().valid('Administrador', 'Inquilino'),
})
    
exports.validUsuarios = (req, res, next) => {
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

exports.validLogin = (req, res, next) => {
    const {body} = req
    const value = SchemaLogin.validate(body)
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