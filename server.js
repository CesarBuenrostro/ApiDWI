const app = require('./app/app');
const config = require('./app/config/configuracion');
const conexion = require('./app/config/conexion');

conexion.connect();

app.listen(config.PORT, '0.0.0.0', () => {
    console.log(`App running in PORT: ${config.PORT}`);
});