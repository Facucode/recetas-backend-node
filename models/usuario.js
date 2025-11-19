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

UsuarioSchema.method('toJSON', function() {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
});
export default model( 'Usuario', UsuarioSchema );
