import { User } from "@prisma/client";
import { compare } from "bcryptjs";
import AppError from "../../shared/error/AppError";
import { sign } from "crypto";
import authConfig from "../../config/auth";
import prismaClient from "../../prisma/prisma";

interface IRequest {
    email: string,
    password: string
}

interface IResponse {
    user: User;
    token: string;
}

class CreateSessionService {
    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if (!user) {
            throw new AppError('Incorret email/password combination.', 401);
        }

        const passwordConfirmed = await compare(password, user.password);
        if (!passwordConfirmed) {
            throw new AppError('Incorret email/password combination.', 401);
        }

        const token = sign(
            {
                name: user.name,
                email: user.email,
                password: user.password
            }, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn
        });

        return {
            user,
            token
        };
    }
}
export default CreateSessionService;