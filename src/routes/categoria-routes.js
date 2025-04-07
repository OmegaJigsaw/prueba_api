import express from 'express';
import { getAllCategoriasController, postCategoriaController, putCategoriaController } from '../controllers/categoria-controller.js';

const router = express.Router();

router.get('/', getAllCategoriasController);
router.post('/', postCategoriaController);
router.put('/:id', putCategoriaController)

export default router;
