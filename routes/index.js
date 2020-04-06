const api = require('express').Router();

module.exports = ( () => {
    api.get('/', ( req, res ) => res.send({
        success: true,
        message : 'API READY',
        code : 200
    }));

    api.all('*', function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });

    return api;
})();