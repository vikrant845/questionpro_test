import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import { db } from "../database/prisma.js";

export const getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const users = await db.userAuth.findMany();

  res.status(200).json({
    message: 'success',
    data: {
      users
    }
  });
});

export const getById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = await db.userAuth.findFirst({ where: { id: parseInt(req.params.id) } });

  res.status(200).json({
    message: 'success',
    data: {
      user
    }
  });
});