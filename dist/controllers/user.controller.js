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
export const getAll = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield db.userAuth.findMany();
    res.status(200).json({
        message: 'success',
        data: {
            users
        }
    });
}));
export const getById = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db.userAuth.findFirst({ where: { id: parseInt(req.params.id) } });
    res.status(200).json({
        message: 'success',
        data: {
            user
        }
    });
}));
