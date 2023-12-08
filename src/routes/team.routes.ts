import express from "express";
import { TeamController } from '../controllers/teamsController'

export const teamRoutes = express.Router();

teamRoutes.post('/create', TeamController.createTeam);