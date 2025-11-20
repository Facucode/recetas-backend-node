import { Schema, model } from "mongoose";

const UsuarioSchema = Schema({
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    }
});


export default model( 'Usuario', UsuarioSchema );
