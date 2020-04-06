const api = require('express').Router();
const passport = require('passport');
const Schema = require('../../models/Locales')
const Locales = require('../../controllers/Locales')

module.exports = (()=>{

    api.post('/', passport.authenticate('jwt', {session: false}),
        Schema.validLocales,
        Locales.setLocal
    )

    api.get('/', passport.authenticate('jwt', {session: false}),
        Locales.getLocal
    )

    api.put('/', passport.authenticate('jwt', {session: false}),
        Schema.validEditLocales,
        Locales.updateLocal
    )

    api.delete('/', passport.authenticate('jwt', {session: false}),
        Locales.deleteLocal
    )


    return api;
})();