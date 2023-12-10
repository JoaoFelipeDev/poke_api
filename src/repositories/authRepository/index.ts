import jwt, { Secret, sign } from "jsonwebtoken";
import { Prisma, PrismaClient } from "@prisma/client";
import { ApiError } from '../../errors/ApiError'
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
type userAuth = {
    email: string,
    password: string
}
type JwtPayload = {
    user_id: string;

};



type user = {
    name: string;
    email: string;
    id: string;
    token: string;
    created_at: Date;
    team?: any;
}
export class authRepository {
    public static async authenticate(data: userAuth): Promise<user> {
        const jwt_secret = process.env.JWT_SECRET;

        const userData = await prisma.user.findFirst({
            where: {
                email: data.email
            },
            include: {
                team: true
            }
        });

        if (!userData) {
            throw new ApiError('Usuário não encontrado', 400);
        }
        const passwordCheck = await bcrypt.compare(data.password, userData.password);

        if (!passwordCheck) {
            throw new ApiError('Senha ou email incorretos', 400);
        }

        const jwt_token = jwt.sign(
            { user_id: userData.id, },
            jwt_secret as Secret,
            { expiresIn: "24h", subject: userData.id }
        );
        const expireDate = new Date();
        expireDate.setTime(expireDate.getTime() + 5 * 60 * 60 * 1000);
        expireDate.toUTCString();

        const team = await prisma.team.findFirst({
            where: {
                user_id: userData.id
            },
            include: {
                pokemon: true,

            }
        })

        const res: user = {
            token: jwt_token!,
            email: userData.email,
            id: userData.id,
            name: userData.name,
            created_at: userData.created_at,
            team: team


        }

        return res;

    }
}
