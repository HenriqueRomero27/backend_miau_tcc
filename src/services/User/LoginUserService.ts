import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import auth from "../../config/auth";
import prismaClient from "../../prisma/prisma";
import AppError from "../../shared/error/AppError";

interface AuthRequest {
    email: string;
    password: string;
}

class LoginUserService {
    async execute({ email, password }: AuthRequest) {
        // Verificar se o Email existe
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if (!user) {
            throw new AppError("[ERROR] Usuário não encontrado!", 401);
        }

        // Verificar se a senha está correta
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Usuário ou senha incorreto", 401);
        }

        // Gerar o Token JWT
        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            auth.jwt.secret,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        );

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        };
    }
}

export { LoginUserService };
