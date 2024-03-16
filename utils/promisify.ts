import jwt, { JwtPayload } from 'jsonwebtoken';

export const promisify = (token: string, secret: string): Promise<{ id: string, iat: number, eat: number }> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, {}, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded as { id: string, iat: number, eat: number });
    });
  });
}