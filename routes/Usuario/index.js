const api = require('express').Router();
const passport = require('passport');
const Schema = require('../../models/Usuarios')
const Usuario = require('../../controllers/Usuario')

module.exports = (()=>{

    api.post('/',
        Schema.validUsuarios,
        Usuario.setUsuario
    )

    api.post('/login',
        Schema.validLogin,
        Usuario.login
    )

    api.get('/', passport.authenticate('jwt', {session: false}),
        Usuario.getUsuario
    )

    api.put('/', passport.authenticate('jwt', {session: false}),
        Schema.validEdit,
        Usuario.updateUsuario
    )

    api.delete('/', passport.authenticate('jwt', {session: false}),
        Usuario.deleteUsuario
    )


    return api;
})();