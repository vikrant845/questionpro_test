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
export const createOrder = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = req.body;
    if (orders.length === 0)
        return next(new Error('Please place orders properly'));
    // Update product stock
    const updatePromises = orders.map((order) => __awaiter(void 0, void 0, void 0, function* () {
        if (!order.productId || !order.quantity || !order.quantityUnit || !order.subtotal || !order.userId)
            return next(new Error('Fields Missing'));
        yield db.product.update({
            where: {
                id: order.productId
            },
            data: {
                stock: {
                    decrement: order.quantity
                }
            }
        });
    }));
    yield Promise.all(updatePromises);
    // Add order
    const ordersCreated = yield db.order.createMany({ data: orders });
    if (!ordersCreated)
        return next('Cannot create orders');
    res.status(201).json({
        message: 'success',
        data: {
            orders
        }
    });
}));
export const getAll = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield db.order.findMany();
    res.status(200).json({
        message: 'success',
        data: {
            orders
        }
    });
}));
export const getById = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield db.order.findFirst({ where: { id: parseInt(req.params.id) } });
    res.status(200).json({
        message: 'success',
        data: {
            order
        }
    });
}));
export const deleteOrder = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield db.order.findFirst({ where: { id: parseInt(req.params.id) } });
    if (!order)
        return next(new Error('Order not found'));
    // Update product stock
    yield db.product.update({
        where: {
            id: order === null || order === void 0 ? void 0 : order.productId
        },
        data: {
            stock: {
                increment: order === null || order === void 0 ? void 0 : order.quantity
            }
        }
    });
    // Delete Order
    yield db.order.delete({
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
}));
export const updateOrder = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield db.order.update({
        where: { id: parseInt(req.params.id) },
        data: req.body
    });
    res.status(200).json({
        message: 'success',
        data: {
            order
        }
    });
}));
