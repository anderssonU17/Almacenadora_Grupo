'use strict'
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const {generateJWT} = require('../helpers/create-jwt');

const createUser = async(req, res)=>{
    try {
        const {email, contrasena} = req.body;
        
        let findEmail = await User.findOne({email: email});
        if(findEmail) res.status(400).send({message: 'El email ya esta en uso'});

        let user = new User(req.body);
        user.contrasena = bcrypt.hashSync(contrasena, bcrypt.genSaltSync());

        user = await user.save();

        res.status(200).send({message: `El usuario ${user.nombre}fue creado correctamente`, user});

    } catch (error) {
        throw new Error(error)
    }
}

const readUsers = async(req, res) =>{
    try {
        
        const users = await User.find();
        if(users.length == 0) res.status(404).send({message: 'No se han encontrado usuarios.'});

        res.status(200).json({'Usuarios encontrados':users})

    } catch (error) {
        throw new Error(error);
    }
}

const updateUser = async(req, res) =>{
    try {
    
        let {id, nombre, apellido,email,contrasena} = req.body;

        let updateUser = await User.findById(id);
        if(!updateUser) res.status(404).send({message: 'No se encontro al usuario.'});

        updateUser = await User.findByIdAndUpdate(id, {nombre, apellido, email, contrasena}, {new: true});

        if(updateUser){
            const token = await generateJWT(updateUser._id, updateUser.nombre, updateUser.email);

            res.status(200).send({message: `Se actualizo al usuario ${updateUser.nombre} correctamente`, updateUser, token});

        }else{
            res.status(400).send({message: 'No se encontro al usuario en la base de datos'});
        }



    } catch (error) {
        throw new Error(error)
    }
    
}

const deleteUser = async(req, res) =>{
    try {
        
        let {id} = req.body;
        
        const deleteUser = await User.findByIdAndDelete({_id: id});
        
        if(deleteUser){
            return res.status(200).send({message: 'Se borro el usuario.', deleteUser})
        }else{
            return res.status(400).send({message: 'No se pudo eliminar el usuario'});
        }
        

    } catch (error) {
        throw new Error(error)
    }
}

// ************************ Login

const userDefault = async() =>{
    
    const users = await User.find();
    if(users.length == 0){
        let  user = new User();
        user.nombre = 'ADMIN';
        user.apellido = 'Administrador';
        user.contrasena = '123456';
        user.contrasena = bcrypt.hashSync(user.contrasena, bcrypt.genSaltSync());
        user.email = 'admin@gmail.com';
        
        let email = user.email;
        const userEmail = await User.findOne({email});
        if(userEmail){
            return console.log(`El correo ${email} ya esta en uso.`);
        }
        // Si no esta en uso
        user = await user.save();
        return console.log(`Usuario creado correctamente, datos del usuario: ${user}`);
    }
}

// ************************ Login

const login = async(req, res)=>{
    try {
        
        const {email, contrasena} = req.body;
        let user = await User.findOne({email: email})

        if(!user) return  res.status(404).send({ok: false, message: 'No se encontro el email'});

        const correctParams = bcrypt.compareSync(contrasena, user.contrasena);

        if(!correctParams) return  res.status(400).send({ok: false, message: 'La contraseña es incorrecta.'})

        const token = await generateJWT(user._id, user.nombre, user.email);

        res.status(200).json({ok: true,'Usuario': user, token: token })



    } catch (error) {
        throw new Error(error);
    }
}

// ************************ Exportaciones

module.exports = {createUser,userDefault, readUsers, updateUser, deleteUser, login}