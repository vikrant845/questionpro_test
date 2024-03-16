var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { catchAsync } from "../utils/catchAsync.js";
import { db } from "../database/prisma.js";
export const createProduct = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, price, stock, stockUnit } = req.body;
    if (!title || !price || !stock || !stockUnit)
        return next(new Error('Please enter all the fields'));
    const product = yield db.product.create({
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
}));
export const getAll = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield db.product.findMany();
    res.status(200).json({
        message: 'success',
        data: {
            products
        }
    });
}));
export const getById = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield db.product.findFirst({ where: { id: parseInt(req.params.id) } });
    res.status(200).json({
        message: 'success',
        data: {
            product
        }
    });
}));
export const deleteProduct = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield db.product.delete({ where: { id: parseInt(req.params.id) } });
    res.status(200).json({
        message: 'success',
        data: {
            product
        }
    });
}));
export const updateProduct = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield db.product.update({
        where: { id: parseInt(req.params.id) },
        data: req.body
    });
    res.status(200).json({
        message: 'success',
        data: {
            product
        }
    });
}));
