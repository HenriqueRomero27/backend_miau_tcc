import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'your-secret-key';

interface JwtPayload {
    id: string;
}

export const generateToken = (userId: string): string => {
    const payload: JwtPayload = { id: userId };
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};
