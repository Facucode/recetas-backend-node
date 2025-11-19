import response from "express";
import bcrypt from "bcrypt";

import Usuario from "../models/usuario.js";

import generarJWT from "../helpers/generar-jwt.js";

const login = async(req, res = response) => {
    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ email });
        if ( !usuario ) {
            return res.status(404).json({
                     msg: 'Usuario / Password no son correctos - correo'
            });
        }

        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }


        const validPassword = bcrypt.compareSync( password, usuario.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }


        const token = await generarJWT( usuario.id );

        res.json({
            email: usuario.email,
            localId: usuario.id,
            idToken: token,
            expiresIn: '3600s'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }   

}

const signup = async(req, res = response) => {
    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ email });
        if ( usuario ) {
            return res.status(400).json({
                     msg: 'El correo ya está registrado'
            });
        }
        else {
        const usuario = new Usuario( req.body );
       
        const salt = bcrypt.genSaltSync(10);

        const encryptedPassword = bcrypt.hashSync(password, salt);

        usuario.password = encryptedPassword.toString();

        await usuario.save();

        const token = await generarJWT( usuario.id );

        res.json({
            email: usuario.email,
            localId: usuario.id,
            idToken: token,
            expiresIn: '3600s'
        });
    }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}


export {
    login,
    signup
};