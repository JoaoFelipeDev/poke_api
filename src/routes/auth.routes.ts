import express from "express";
import {AuthController} from '../controllers/authContreoller'
export const authRoutes = express.Router();

authRoutes.post('/', AuthController.authenticate)