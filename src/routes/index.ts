import express from "express";
import { signUpRoutes } from './signup.routes'
import { authRoutes } from './auth.routes'
import { pokemonRoutes } from './pokemons.route'
import { teamRoutes } from './team.routes'
export const routes = express.Router();

routes.use("/signUp", signUpRoutes);
routes.use("/auth", authRoutes);
routes.use("/pokemons", pokemonRoutes);
routes.use("/teams", teamRoutes);