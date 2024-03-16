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
import { promisify } from "../utils/promisify.js";
import { db } from "../database/prisma.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const signJWT = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
const setCookies = (token, res) => {
    const cookieOptions = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true
    };
    if (process.env.ENVIRONMENT === 'production')
        cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions);
};
export const protect = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        token = req.headers.authorization.split(' ')[1];
    else if (req.cookies.jwt)
        token = req.cookies.jwt;
    if (!token)
        return next(new Error('Invalid Token'));
    const decoded = yield promisify(token, process.env.JWT_SECRET || '');
    const user = yield db.userAuth.findFirst({ where: { id: parseInt(decoded === null || decoded === void 0 ? void 0 : decoded.id) } });
    if (!user)
        return next(new Error('User not found'));
    req.user = user;
    next();
}));
export const restrictTo = (...roles) => {
    return (req, res, next) => {
        var _a;
        if (!roles.includes((_a = req.user) === null || _a === void 0 ? void 0 : _a.role))
            return next(new Error('This feature is not available to you.'));
        next();
    };
};
export const login = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        return next(new Error('Please enter all the credentials'));
    const user = yield db.userAuth.findFirst({ where: { email } });
    const correctPassword = yield bcrypt.compare(password, user === null || user === void 0 ? void 0 : user.password);
    if (!user || !correctPassword)
        return next(new Error('Invalid credentials'));
    const token = signJWT(user.id.toString());
    setCookies(token, res);
    res.status(200).json({
        message: 'success',
        data: {
            user,
            token
        }
    });
}));
export const register = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, passwordConfirm, role } = req.body;
    if (!email || !name || !passwordConfirm || !password)
        return next(new Error('Please enter all the fields'));
    if (password !== passwordConfirm)
        return next(new Error('Both passowrds should match'));
    const hashedPassword = yield bcrypt.hash(password, 12);
    const user = yield db.userAuth.create({
        data: {
            name,
            email,
            password: hashedPassword,
            passwordConfirm: '',
            role
        }
    });
    if (!user)
        return next(new Error('Error Creating User'));
    const token = signJWT(user.id.toString());
    setCookies(token, res);
    res.status(201).json({
        message: 'success',
        data: {
            user,
            token
        }
    });
}));
