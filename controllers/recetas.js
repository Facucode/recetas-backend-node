import { response } from "express";

import Receta from "../models/receta.js";

const getRecetas = async(req, res = response) => {
    const recetas = await Receta.find()
    .populate('usuario', 'email');
    res.json(recetas);
}

export default getRecetas;