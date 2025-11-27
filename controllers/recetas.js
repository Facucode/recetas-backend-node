import { response } from "express";
import Receta from "../models/receta.js";
import { body } from "express-validator";

const getRecetas = async(req, res = response) => {
    const recetas = await Receta.find({userEmail: req.usuario._id})
    .populate('userEmail', 'email -_id');
   
    const recetasLimpias = recetas.map(r => ({
        ...r.toObject(),
        userEmail: r.userEmail?.email 
    }));

    res.json(recetasLimpias);
}

const editarReceta = async(req, res = response ) => {
    const { id } = req.params;
    let { name, description, ingredients, imagePath } = req.body;

    const receta = await Receta.findByIdAndUpdate( id, { name, description, ingredients, imagePath }, { new: true } );

    res.status(200).json({receta, msg: "update recipe ok" });

}

const crearReceta = async(req, res = response ) => {

    const name = req.body.name.toUpperCase();

    const recetaDB = await Receta.findOne({ name });

    if ( recetaDB ) {
        return res.status(400).json({
            msg: `La receta ${ recetaDB.name }, ya existe`
        });
    }

    const {_id , ...body} = req.body;
    const receta = new Receta({
        ...body,
        userEmail: req.usuario._id
    });

    await receta.save();

    res.status(201).json({ msg: "Store recipe ok" });

}

const eliminarReceta = async(req, res = response ) => {
    const { id } = req.params;


    const receta = await Receta.findByIdAndDelete( id );


    res.status(200).json({receta, msg: "delete recipe ok" });


}

export {
    getRecetas, 
    crearReceta, 
    editarReceta, 
    eliminarReceta
};