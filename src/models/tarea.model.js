'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TareaSchema = new Schema({
    nombre: { 
        type: String 
    },
    fechaInicio: { 
        type: Date, 
        required: true 
    },
    fechaCierre: { 
        type: Date, 
        required: true 
    },
    completada: { 
        type: Boolean, 
        default: false 
    },
    creador: { 
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
});


module.exports = mongoose.model('Tarea', TareaSchema);