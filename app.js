const express = require('express');
const logger = require('morgan');
const passport = require('passport');
const app = express();

const indexRoute = require('./routes');
const centroComercial = require('./routes/CentrosComerciales')
const inquilino = require('./routes/Inquilino')
const locales = require('./routes/Locales')
const marcas = require('./routes/Marcas')
const tiendas = require('./routes/Tiendas')
const usuario = require('./routes/Usuario')

app.use(passport.initialize());
const UserAccess = function (req, res, next) {
    let userType = req.originalUrl.split('/')[1];
    userType.includes('?') ? userType = userType.split('?')[0] : '' 
    require('./config/passport')(userType, passport);
    next();
};

app.use(UserAccess);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', indexRoute);
app.use('/centroscomerciales', centroComercial)
app.use('/inquilino', inquilino)
app.use('/locales', locales)
app.use('/marcas', marcas)
app.use('/tiendas', tiendas)
app.use('/usuario', usuario)

module.exports = app;