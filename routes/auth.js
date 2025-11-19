import { Router } from "express";
import { check } from "express-validator";
import  validarCampos  from "../middlewares/validar-campos.js";
import {login, signup }from "../controllers/auth.js";
const router = Router();

router.post('/login',[
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login );

export default router;

router.post('/signup',[
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], signup );