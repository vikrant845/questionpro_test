import express, { Request, Response } from 'express';
import cookie from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import { productRouter } from './routes/product.routes.js';
import { authRouter } from './routes/auth.routes.js';
import { usersRouter } from './routes/user.routes.js';
import { orderRouter } from './routes/order.routes.js';

const __dirname = fileURLToPath(new URL(import.meta.url));

dotenv.config({ path: './.env' });

const app = express();
app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());
app.use(cookie());
app.use(helmet());

const limiter = rateLimit({ limit: 100, windowMs: 60 * 60 * 1000, message: 'Too many requests made to this IP, please try again after an hour.' });
app.use('/api', limiter);

if (process.env.ENVIRONMENT === 'development') app.use(morgan('dev'));

app.use('/api/v1/products', productRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);

app.listen(3000, () => {
  console.log('Listening to 3000');
});