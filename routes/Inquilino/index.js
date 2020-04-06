const api = require('express').Router();
const passport = require('passport');
const Schema = require('../../models/Inquilino')
const Inquilino = require('../../controllers/Inquilino')


module.exports = (()=>{

    api.post('/', passport.authenticate('jwt', {session: false}),
        Schema.validInquilino,
        Inquilino.setInquilino
    )

    api.get('/', passport.authenticate('jwt', {session: false}),
        Inquilino.getInquilino
    )

    api.put('/', passport.authenticate('jwt', {session: false}),
        Schema.validEdit,
        Inquilino.updateInquilino
    )

    api.delete('/', passport.authenticate('jwt', {session: false}),
        Inquilino.deleteInquilino
    )


    return api;
})();