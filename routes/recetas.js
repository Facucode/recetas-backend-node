import { Router } from "express";
import { check } from "express-validator";    

import getRecetas from "../controllers/recetas.js";

const router = Router();


router.get('/get', getRecetas);


export default router;
