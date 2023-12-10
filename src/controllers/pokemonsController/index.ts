import { Request, Response } from "express";
import { PokemonsRepository } from '../../repositories/pokemonsRepository'
export class PokemonsController {

    public static async getPokemons(req: Request, res: Response) {
        const { limit, offset } = req.params;



        const pokemon = await PokemonsRepository.getPokemons(limit, offset);

        const data = {
            limit: limit,
            offset: offset,
            pokemon: pokemon
        }

        return res.status(200).json({
            error: false,
            message: "Listagem de pokemon",
            developerMessage: "Listagem de pokemon",
            exception: "",
            data: data,
        });
    }

    public static async searchPokemon(req: Request, res: Response) {
        const { search } = req.params;
        console.log('searchPokemon');

        const poke = await PokemonsRepository.searchPokemon(search);

        return res.status(200).json({
            error: false,
            message: "Listagem de pokemon",
            developerMessage: "Listagem de pokemon",
            exception: "",
            data: poke,
        });
    }

    public static async getPokemonByType(req: Request, res: Response) {
        const { type } = req.params;
        console.log('getPokemonByType');

        const pokemon = await PokemonsRepository.searchTypePokemon(type);

        return res.status(200).json({
            error: false,
            message: "Listagem de pokemon",
            developerMessage: "Listagem de pokemon",
            exception: "",
            data: pokemon,
        });
    }

    public static async getPokeEvolution(req: Request, res: Response) {

        const { id } = req.params;

        const pokemon = await PokemonsRepository.getEvolutions(id);
    }
}