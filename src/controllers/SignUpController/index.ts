import { Request, Response } from "express";
import bcrypt from "bcrypt";
import {SignUpRepository} from '../../repositories/signUpRepository'

export class SignUpController {
    public static async signUp(req: Request, res: Response) {
        const { email, password, name } = req.body;
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

      const countEmail: number = await SignUpRepository.countEmail(email);
      console.log(email);

        if (countEmail == 0) {
            await SignUpRepository.signUp({ name: name, email: email, password: passwordHash }).then((e) => {
        return res.status(201).json({
        error: false,
        message: "Usuário cadastrado com sucesso",
        developerMessage: "Usuário cadastrado com sucesso",
        exception: "",
        data: {id: e.id, name: e.name, email: e.email},
        status: 201,
      });
           });
        } else {
             return res.status(400).json({
        error: true,
        message: "Este e-mail já está em uso! Faça o login ou use outro e-mail",
        developerMessage: "Email já cadastrado no sistema",
        exception: "",
        data: null,
        status: 400,
      });
        }

        

    }
}