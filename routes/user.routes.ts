import express from 'express';
import { protect, restrictTo } from '../controllers/auth.controller.js';
import { getAll, getById } from '../controllers/user.controller.js';

const usersRouter = express.Router();

usersRouter.get('/', protect, restrictTo('ADMIN'), getAll);
usersRouter.get('/:id', protect, restrictTo('ADMIN'), getById);

export { usersRouter };