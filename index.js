'use strict';

const express = require('express');
const app = express();

const {connection} = require('./src/database/connection')

require('dotenv').config();

const {userDefault} = require('./src/controller/user.controller');
const port = process.env.PORT;

//Importamos las rutas
const routesUser = require('./src/routes/user.routes');
const routesTarea = require('./src/routes/tarea.routes');

connection();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

userDefault();

app.use('/api', routesUser);
app.use('/api', routesTarea);

app.listen(port, () =>{
    console.log(`Servidor corriendo en el puerto ${port}`);
});