'use strict'
const Tarea = require('../models/tarea.model');
const User = require('../models/user.model');

const createTarea = async(req, res)=>{
    try {
        const {creador} = req.body;
        
        let userFind = await User.findById(creador);
        if(!userFind) return res.status(404).send({message: `No se encontro el creador.`, ok: false});

        let tarea = new Tarea(req.body);

        tarea = await tarea.save();

        res.status(200).send({message: `La tarea ${tarea.nombre} fue creada correctamente`, tarea});

    } catch (error) {
        throw new Error(error)
    }
}

const readTareas = async(req, res) =>{
    try {
        
        const tareas = await Tarea.find();
        if(tareas.length == 0) res.status(404).send({message: 'No se han encontrado tareas.'});

        return res.status(200).json({'Tareas encontradas':tareas})

    } catch (error) {
        throw new Error(error);
    }
}

const updateTarea = async(req, res) =>{
    try {
    
        let {id,nombre, fechaInicio,fechaCierre,completada,creador} = req.body;

        let user = await User.findById(creador);
        if(!user) return res.status(404).send({message: 'No se encontro al creador.'});

        let updateTarea = await Tarea.findById(id);
        if(!updateTarea) return res.status(404).send({message: 'No se encontro la tarea.'});

        updateTarea = await Tarea.findByIdAndUpdate(id, {nombre, fechaInicio,fechaCierre,completada,creador}, {new: true});

        if(updateTarea){
            return res.status(200).send({message: `Se actualizo la tarea ${updateTarea.nombre} correctamente`, updateTarea});

        }else{
            return res.status(400).send({message: 'No se encontro la tarea en la base de datos'});
        }



    } catch (error) {
        throw new Error(error)
    }
    
}

const deleteTarea = async(req, res) =>{
    try {
        
        let {id} = req.body;
        
        const deleteTarea = await Tarea.findByIdAndDelete({_id: id});
        
        if(deleteTarea){
            return res.status(200).send({message: 'Se borro la tarea.', deleteTarea})
        }else{
            return res.status(400).send({message: 'No se pudo eliminar la tarea.'});
        }
        

    } catch (error) {
        throw new Error(error)
    }
}

// ************************ Exportaciones
module.exports = {createTarea,readTareas,updateTarea,deleteTarea};