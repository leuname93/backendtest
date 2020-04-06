const api = require('express').Router();
const passport = require("passport");
const Schema = require('../../models/Tiendas')
const Tiendas = require('../../controllers/Tiendas')

module.exports = (()=>{

    api.post('/', passport.authenticate("jwt", { session: false }),
        Schema.validTiendas,
        Tiendas.setTiendas
    )

    api.get('/', passport.authenticate("jwt", { session: false }),
        Tiendas.getTiendas
    )

    api.put('/', passport.authenticate("jwt", { session: false }),
        Schema.validEditTienda,
        Tiendas.updateTiendas
    )

    api.delete('/', passport.authenticate("jwt", { session: false }),
        Tiendas.deleteTiendas
    )


    return api;
})();