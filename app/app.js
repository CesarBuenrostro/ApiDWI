const express = require('express');
const app = express();
const routerRopa = require('./routes/ropa.routes');
const routerUser = require('./routes/usuario.routes');

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/valeua', routerRopa);
app.use('/valeua', routerUser)

module.exports = app;