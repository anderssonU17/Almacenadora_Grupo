'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nombre: { 
        type: String, 
        required: true 
    },
    apellido: { 
        type: String, 
        required: true 
    },
    email: {
            type: String, 
            required: true, 
            unique: true 
        },
    contrasena: { 
        type: String, 
        required: true 
    }
  });


module.exports = mongoose.model('User', UserSchema);