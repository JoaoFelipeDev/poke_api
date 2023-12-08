import { Request, Response } from "express";
import { ApiError } from '../../errors/ApiError';
import jwt, { Secret, verify } from "jsonwebtoken";
import { TeamRepository } from '../../repositories/teamRepository'

interface IPayload {
    sub: string;
}
export class TeamController {
    public static async createTeam(req: Request, res: Response) {
        const { name } = req.body;
        const access_token = req.headers.authorization;
        if (!access_token) {
            throw new ApiError('Token de acesso nao informado.', 401);

        }
        const [, token] = access_token.split(" ");
        const jwt_secret = process.env.JWT_SECRET as Secret;
        const { sub: user_id } = verify(token, jwt_secret) as IPayload;

        const team = await TeamRepository.createTeam(name, user_id);

        return res.status(200).json({
            error: false,
            message: "Time criado com sucesso",
            developerMessage: "Time criado com sucesso",
            exception: "",
            data: team,
        });


    }
}