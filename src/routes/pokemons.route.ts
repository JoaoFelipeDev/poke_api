import express from "express";
import { PokemonsController } from '../controllers/pokemonsController'


export const pokemonRoutes = express.Router();

pokemonRoutes.get('/get/:limit/:offset', PokemonsController.getPokemons);
pokemonRoutes.get('/search/:search', PokemonsController.searchPokemon);
pokemonRoutes.get('/type/:type', PokemonsController.getPokemonByType);
pokemonRoutes.get('/evolution/:id', PokemonsController.getPokeEvolution);

