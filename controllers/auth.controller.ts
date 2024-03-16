import { CookieOptions, NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import { promisify } from "../utils/promisify.js";
import { db } from "../database/prisma.js";
import { User } from "../types/user.type.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface RequestWithUser extends Request {
  user?: User
}

const signJWT = (id: string) => jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRES_IN });

const setCookies = (token: string, res: Response) => {
  const cookieOptions: CookieOptions = {
    expires: new Date(Date.now()+ 24 * 60 * 60 * 1000),
    httpOnly: true
  }

  if (process.env.ENVIRONMENT === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);
}

export const protect = catchAsync(async (req: RequestWithUser, res: Response, next: NextFunction) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) token = req.headers.authorization.split(' ')[1];
  else if (req.cookies.jwt) token = req.cookies.jwt;

  if (!token) return next(new Error('Invalid Token'));

  const decoded = await promisify(token, process.env.JWT_SECRET || '');

  const user = await db.userAuth.findFirst({ where: { id: parseInt(decoded?.id) } });

  if (!user) return next(new Error('User not found'));

  req.user = user;
  next();
});

export const restrictTo = (...roles: [string]) => {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role!)) return next(new Error('This feature is not available to you.'));
    next();
  }
}

export const login = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) return next(new Error('Please enter all the credentials'));
  
  const user = await db.userAuth.findFirst({ where: { email } });

  const correctPassword = await bcrypt.compare(password, user?.password!);
  if (!user || !correctPassword) return next(new Error('Invalid credentials'));

  const token = signJWT(user.id.toString());
  setCookies(token, res);

  res.status(200).json({
    message: 'success',
    data: {
      user,
      token
    }
  });
});

export const register = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, passwordConfirm, role } = req.body;

  if (!email || !name || !passwordConfirm || !password) return next(new Error('Please enter all the fields'));
  
  if (password !== passwordConfirm) return next(new Error('Both passowrds should match'));
  const hashedPassword = await bcrypt.hash(password, 12);
  
  const user = await db.userAuth.create({
    data: {
      name,
      email,
      password: hashedPassword,
      passwordConfirm: '',
      role
    }
  });

  if (!user) return next(new Error('Error Creating User'));

  const token = signJWT(user.id.toString());
  setCookies(token, res);

  res.status(201).json({
    message: 'success',
    data: {
      user,
      token
    }
  });
});