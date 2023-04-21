'use strict'
const {createTarea,readTareas, updateTarea, deleteTarea} = require('../controller/tarea.controller');
const {Router} = require('express');

const {validateParamas} = require("../middlewares/validate-params");

const {check} = require('express-validator');

const api = Router();

api.post('/create-tarea', [
    check('nombre', 'El parametro del nombre es obligatorio').not().isEmpty(),
    check('fechaInicio', 'El parametro de la fechaInicio es obligatorio').not().isEmpty(),
    check('fechaCierre', 'El parametro de la fechaCierre es obligatorio').not().isEmpty(),
    check('creador', 'El parametro del creador es obligatorio').not().isEmpty(),
    validateParamas
], createTarea);

api.get('/read-tareas', readTareas);

api.put('/update-tarea', [
    check('id', 'El id del nombre es obligatorio').not().isEmpty(),
    check('nombre', 'El parametro del nombre es obligatorio').not().isEmpty(),
    check('fechaInicio', 'El parametro de la fechaInicio es obligatorio').not().isEmpty(),
    check('fechaCierre', 'El parametro de la fechaCierre es obligatorio').not().isEmpty(),
    check('creador', 'El parametro del creador es obligatorio').not().isEmpty(),
    validateParamas
], updateTarea )

api.delete('/delete-tarea',[
    check('id', 'El parametro del id es obligatorio').not().isEmpty(),
    validateParamas
], deleteTarea);

// ************************ Exportaciones

module.exports = api;