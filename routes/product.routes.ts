import express from 'express';
import { protect, restrictTo } from '../controllers/auth.controller.js';
import { createProduct, deleteProduct, getAll, getById, updateProduct } from '../controllers/product.controller.js';

const productRouter = express.Router();

productRouter.get('/', getAll);
productRouter.get('/:id', getById);
productRouter.post('/', protect, restrictTo('ADMIN'), createProduct);
productRouter.delete('/:id', protect, restrictTo('ADMIN'), deleteProduct);
productRouter.patch('/:id', protect, restrictTo('ADMIN'), updateProduct);

export { productRouter };