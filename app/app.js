const express = require('express');
const app = express();
const routerRopa = require('./routes/ropa.routes');

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/valeua', routerRopa);

module.exports = app;