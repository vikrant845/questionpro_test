import express from 'express';
import { login, register } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/create', register);
authRouter.post('/login', login);

export { authRouter };