import { Schema, model } from "mongoose";


const ingredientSchema = Schema({
    amount: {
        type: String,
        required: [true, 'La cantidad es obligatoria']
    },
    name: {
        type: String,
        required: [true, 'El nombre del ingrediente es obligatorio']
    }
}, {_id: true});


const RecetaSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    description: {
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },
    ingredients: {
        type: [ingredientSchema],
        required: [true, 'Los ingredientes son obligatorios']
    },
    imagePath: {
        type: String,
        required: [true, 'La ruta de la imagen es obligatoria']
    },
    userEmail: {
        type: String,
        required: [true, 'El email del usuario es obligatorio']
    }

}, { strictPopulate: false });

RecetaSchema.method('toJSON', function() {
    const { __v, ...receta } = this.toObject();
    return receta;
});

export default model( 'Receta', RecetaSchema );