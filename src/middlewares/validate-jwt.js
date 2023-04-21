const {request, response} = require("express");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const User = require("../models/user.model");

    const validateJWT = async(req = request, res = response, next)=>{
    const token = req.header("x-token");

    if(!token){
        return res.status(401).send({
            message: "No hay un token en la peticion."
        });
    }

    try{

        const payLoad = jwt.decode(token, process.env.SECRET_KEY);

        const userFind = await User.findById(payLoad.uId);

        if (payLoad.exp <= moment().unix()) {
            return res.status(500).send({message: `Ha expirado el tiempo del token`})
        }

        if(!userFind){
            return res.status(401).send({
                message: "El usuario dueño del token, ya no existe en la base de datos"
            })
        }

        req.userLogin = userFind;

        next();

    }catch(error){
        throw new Error(error);
    }
}

module.exports = {validateJWT}