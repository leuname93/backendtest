const api = require('express').Router();
const passport = require('passport');
const Schema = require('../../models/Marcas')
const Marcas = require('../../controllers/Marcas')

module.exports = (()=>{

    api.post('/', passport.authenticate('jwt', {session: false}),
        Schema.validMarcas,
        Marcas.setMarcas
    )

    api.get('/', passport.authenticate('jwt', {session: false}),
        Marcas.getMarcas
    )

    api.put('/', passport.authenticate('jwt', {session: false}),
        Schema.validEditMarcas,
        Marcas.updateMarcas
    )

    api.delete('/', passport.authenticate('jwt', {session: false}),
        Marcas.deleteMarcas
    )


    return api;
})();