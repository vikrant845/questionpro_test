import express from 'express';
import { protect, restrictTo } from '../controllers/auth.controller.js';
import { createOrder, deleteOrder, getAll, getById, updateOrder } from '../controllers/order.controller.js';

const orderRouter = express.Router();

orderRouter.get('/', protect, restrictTo('ADMIN'), getAll);
orderRouter.get('/:id', protect, restrictTo('ADMIN'), getById);
orderRouter.post('/', createOrder);
orderRouter.delete('/:id', deleteOrder);
orderRouter.patch('/:id', updateOrder);

export { orderRouter };