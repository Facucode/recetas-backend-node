import { Router } from "express";
import { check } from "express-validator";    

import validarCampos  from "../middlewares/validar-campos.js";
import validarJWT from "../middlewares/validar-jwt.js";
import { existeRecetaPorId } from "../helpers/db-validator.js";
import {getRecetas, crearReceta, editarReceta, eliminarReceta} from "../controllers/recetas.js";

const router = Router();

router.get('/get',
    validarJWT
, getRecetas);

router.post('/add',[
    validarJWT,
    validarCampos,
    check('nombre', 'El nombre de la receta es obligatorio').not().isEmpty(),
    check('ingredientes', 'Los ingredientes son obligatorios').not().isEmpty(),
], crearReceta );

router.put('/edit/:id',[
    validarJWT,
    validarCampos,
    check('nombre', 'El nombre de la receta es obligatorio').not().isEmpty(),
    check('ingredientes', 'Los ingredientes son obligatorios').not().isEmpty(),
], editarReceta );

router.delete('/delete/:id',[
    validarJWT,
    check('id').custom( existeRecetaPorId ),
], eliminarReceta );


export default router;
