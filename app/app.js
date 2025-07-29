const express = require('express');
const app = express();
const path = require('path');
const routerRopa = require('./routes/ropa.routes');
const routerUser = require('./routes/usuario.routes');

app.use(express.urlencoded({extended:false}));
app.use(express.json());
require('dotenv').config()

app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use('/valeua', routerRopa);
app.use('/valeua', routerUser)


module.exports = app;