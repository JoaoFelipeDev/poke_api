import { NextFunction, Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import jwt, { Secret, verify } from "jsonwebtoken";
import { ApiError } from '../errors/ApiError';
const prisma = new PrismaClient();
interface IPayload {
    sub: string;
}

export class Auth {
    public static async authenticate(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const access_token = req.headers.authorization;

        if (!access_token) {
            throw new ApiError('"Token de acesso nao informado.', 401);

        }

        const [, token] = access_token.split(" ");

        try {
            const jwt_secret = process.env.JWT_SECRET as Secret;
            const { sub: user_id } = verify(token, jwt_secret) as IPayload;


            const user = await prisma.user.findFirst({
                where: {
                    id: user_id
                }
            });

            if (!user) {
                throw new ApiError("Usuario não encontrado");
            }



            next();
        } catch {
            throw new ApiError("O token de acesso é invalido", 401);
        }

    }
}