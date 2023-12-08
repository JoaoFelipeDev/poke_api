import express from "express";
import { SignUpController } from '../controllers/SignUpController'
export const signUpRoutes = express.Router();
signUpRoutes.post("/", SignUpController.signUp);