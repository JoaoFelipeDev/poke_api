import { Request, Response } from "express";
import { authRepository } from '../../repositories/authRepository'




export class AuthController {

    public static async authenticate(req: Request, res: Response) {
        const { email, password } = req.body;


        const data = {
            email: email,
            password: password
        }

        const user = await authRepository.authenticate(data);

        return res.status(200).json({
            error: false,
            message: "Usuário logado",
            developerMessage: "Usuário logado",
            exception: "",
            data: user,
        });

    }
}