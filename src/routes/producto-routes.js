import express from 'express';
import { getAllProductosController, getProductoByIdController, getProductosByCategoriaController, postProductoController, putProductoController} from '../controllers/producto-controller.js';

const router = express.Router();

router.get('/', getAllProductosController);
router.get('/:id', getProductoByIdController);
router.get('/categoria/:id', getProductosByCategoriaController);
router.post('/', postProductoController);
router.put('/:id', putProductoController)

export default router;
