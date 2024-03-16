import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import { db } from "../database/prisma.js";
import { Order } from "../types/order.type.js";

export const createOrder = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
  const orders: Order[] = req.body;

  if (orders.length === 0) return next(new Error('Please place orders properly'));

  // Update product stock
  const updatePromises = orders.map(async (order) => {
    if (!order.productId || !order.quantity || !order.quantityUnit || !order.subtotal || !order.userId) return next(new Error('Fields Missing'));
    
    await db.product.update({
      where: {
        id: order.productId
      },
      data: {
        stock: {
          decrement: order.quantity
        }
      }
    });

  });
  
  await Promise.all(updatePromises);

  // Add order
  const ordersCreated = await db.order.createMany({ data: orders });

  if (!ordersCreated) return next('Cannot create orders');

  res.status(201).json({
    message: 'success',
    data: {
      orders
    }
  });
});

export const getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const orders = await db.order.findMany();

  res.status(200).json({
    message: 'success',
    data: {
      orders
    }
  });
});

export const getById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const order = await db.order.findFirst({ where: { id: parseInt(req.params.id) } });

  res.status(200).json({
    message: 'success',
    data: {
      order
    }
  });
});

export const deleteOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {  
  const order = await db.order.findFirst({ where: { id: parseInt(req.params.id) } });

  if (!order) return next(new Error('Order not found'));
  
  // Update product stock
  await db.product.update({
    where: {
      id: order?.productId
    },
    data: {
      stock: {
        increment: order?.quantity
      }
    }
  });

  // Delete Order
  await db.order.delete({
    where: {
      id: parseInt(req.params.id)
    }
  });

  res.status(200).json({
    message: 'success',
    data: {
      order
    }
  });
});

export const updateOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const order = await db.order.update({
    where: { id: parseInt(req.params.id) },
    data: req.body
  });

  res.status(200).json({
    message: 'success',
    data: {
      order
    }
  });
});