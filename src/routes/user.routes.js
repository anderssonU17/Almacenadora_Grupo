'use strict';
const {createUser, readUsers, updateUser, deleteUser, login} = require('../controller/user.controller');
const { Router } = require('express');

const {validateJWT} = require('../middlewares/validate-jwt');
const {validateParamas} = require("../middlewares/validate-params");

const {check} = require('express-validator');

const api = Router();

api.post('/create-user', [
    check('nombre', 'El parametro del nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El parametro del nombre es obligatorio').not().isEmpty(),
    check('email', 'El parametro del nombre es obligatorio').not().isEmpty(),
    check('contrasena', 'El parametro de la contraseña es obligatorio').isLength({min: 6}),
    validateParamas
], createUser);

api.get('/read-users', readUsers);

api.put('/update-user', [
    check('id', 'El parametro del id es obligatorio').not().isEmpty(),
    check('nombre', 'El parametro del nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El parametro del nombre es obligatorio').not().isEmpty(),
    check('email', 'El parametro del nombre es obligatorio').not().isEmpty(),
    check('contrasena', 'El parametro de la contraseña es obligatorio').isLength({min: 6}),
    validateParamas
], updateUser);

api.delete('/delete-user',[
    check('id', 'El parametro del id es obligatorio').not().isEmpty(),
    validateParamas
], deleteUser);

// ************************ Exportaciones
api.post('/login', [
    check('email', 'El parametro del email es obligatorio').not().isEmpty(),
    check('contrasena', 'El parametro de la contrasena es obligatorio').not().isEmpty(),
    validateParamas
], login);

// ************************ Exportaciones

module.exports = api;