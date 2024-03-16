import jwt from 'jsonwebtoken';
export const promisify = (token, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, {}, (err, decoded) => {
            if (err)
                reject(err);
            else
                resolve(decoded);
        });
    });
};
