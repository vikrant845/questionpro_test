import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import { db } from "../database/prisma.js";

export const createProduct = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
  const { title, price, stock, stockUnit } = req.body;

  if (!title || !price || !stock || !stockUnit) return next(new Error('Please enter all the fields'));

  const product = await db.product.create({
    data: {
      title,
      price,
      stock: parseInt(stock),
      stockUnit
    }
  });
  
  res.status(201).json({
    message: 'success',
    data: {
      product
    }
  });
});

export const getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const products = await db.product.findMany();

  res.status(200).json({
    message: 'success',
    data: {
      products
    }
  });
});

export const getById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const product = await db.product.findFirst({ where: { id: parseInt(req.params.id) } });

  res.status(200).json({
    message: 'success',
    data: {
      product
    }
  });
});

export const deleteProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const product = await db.product.delete({ where: { id: parseInt(req.params.id) } });

  res.status(200).json({
    message: 'success',
    data: {
      product
    }
  });
});

export const updateProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const product = await db.product.update({
    where: { id: parseInt(req.params.id) },
    data: req.body
  });

  res.status(200).json({
    message: 'success',
    data: {
      product
    }
  });
});