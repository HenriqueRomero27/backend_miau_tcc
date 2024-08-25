import authConfig from "../../../../config/auth";
import AppError from "../../../error/AppError";
import {NextFunction, Request, Response} from 'express';
import { verify } from 'jsonwebtoken';

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function isAuthenticated(req: Request, next: NextFunction): void {
    const authHeader = req.headers.authorization;
    const statusCode = 400;

    if(!authHeader) {
        throw new AppError("JWT token is missing", statusCode);
    }

    const [, token] = authHeader.split(' ');

    try {
        const decodedToken = verify(token, authConfig.jwt.secret);
        const { sub } = decodedToken as ITokenPayload;

        req.user = {
            id:sub
        }

        return next();
    } catch {
        throw new AppError("Invalid JWT Token.", statusCode);
    }
}
