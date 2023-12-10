import { ApiError } from '../../errors/ApiError';
import axios from 'axios';
type returnPoke = {
    name: string;
    url: string;
}
type returnPokeType = {
    pokemon: {
        name: string;
        url: string;
    }
}

type statusPoke = {
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;



}

type pokeEvoluationMap = {
    evolves_to: [
        {
            species: {
                name: string;
                index: number;
            }
        }
    ]

}
type pokeEvoluation = {
    index: number;
    pokemon: pokemon

}

type mapStatus = {
    base_stat: number,
    stat: {
        name: string;
    }
}

type pokemon = {
    id: number;
    name: string;
    img: string;
    base_experience: number;
    height: number;
    weight: number;
    abilities: [
        name: string,
    ];
    type: [
        name: string,
    ];
    status: statusPoke;
}

type abilitiesMap = {
    ability: {
        name: string;
    }
}
type typesMap = {
    type: {
        name: string;
    }
}

export class PokemonsRepository {
    public static async getPokemons(limit: string, offset: string): Promise<pokemon[]> {
        const url = process.env.POKE_URL;

        const pokemon: pokemon[] = [];
        await axios.get(`${url}/pokemon?limit=${limit}&offset=${offset}`).then(async (res) => {
            await Promise.all(res.data.results.map(async (p: returnPoke) => {

                const poke = await axios.get(p.url);

                var status: statusPoke;
                var hp: number;
                var attack: number;
                var defense: number;
                var special_attack: number;
                var special_defense: number;
                var speed: number;
                poke.data.stats.map((e: mapStatus) => {

                    if (e.stat.name == 'hp') {

                        hp = e.base_stat;

                    }
                    if (e.stat.name == 'attack') {

                        attack = e.base_stat;

                    }
                    if (e.stat.name == 'defense') {

                        defense = e.base_stat;

                    }
                    if (e.stat.name == 'special-attack') {

                        special_attack = e.base_stat;

                    }
                    if (e.stat.name == 'special-defense') {

                        special_defense = e.base_stat;

                    }
                    if (e.stat.name == 'speed') {

                        speed = e.base_stat;

                    }

                });
                status = { attack: attack!, defense: defense!, hp: hp!, special_attack: special_attack!, special_defense: special_defense!, speed: speed! }

                pokemon.push({
                    base_experience: poke.data.base_experience,
                    height: poke.data.height,
                    id: poke.data.id,
                    name: poke.data.name,
                    img: poke.data.sprites.versions['generation-v']['black-white']['animated']['front_default'],
                    status: status!,
                    abilities: poke.data.abilities.map((e: abilitiesMap) => e.ability.name),
                    weight: poke.data.weight,
                    type: poke.data.types.map((e: typesMap) => e.type.name)
                })





            }));




        })

        return pokemon;
    }

    public static async searchPokemon(search: string): Promise<pokemon> {
        const url = process.env.POKE_URL;
        try {
            const data = await axios.get(`${url}/pokemon/${search}`);

            var status: statusPoke;
            var hp: number;
            var attack: number;
            var defense: number;
            var special_attack: number;
            var special_defense: number;
            var speed: number;
            data.data.stats.map((e: mapStatus) => {

                if (e.stat.name == 'hp') {

                    hp = e.base_stat;

                }
                if (e.stat.name == 'attack') {

                    attack = e.base_stat;

                }
                if (e.stat.name == 'defense') {

                    defense = e.base_stat;

                }
                if (e.stat.name == 'special-attack') {

                    special_attack = e.base_stat;

                }
                if (e.stat.name == 'special-defense') {

                    special_defense = e.base_stat;

                }
                if (e.stat.name == 'speed') {

                    speed = e.base_stat;

                }

            });
            status = { attack: attack!, defense: defense!, hp: hp!, special_attack: special_attack!, special_defense: special_defense!, speed: speed! }

            const pokemon: pokemon = {
                base_experience: data.data.base_experience,
                height: data.data.height,
                id: data.data.id,
                name: data.data.name,
                img: data.data.sprites.versions['generation-v']['black-white']['animated']['front_default'],
                status: status!,
                abilities: data.data.abilities.map((e: abilitiesMap) => e.ability.name),
                weight: data.data.weight,
                type: data.data.types.map((e: typesMap) => e.type.name)
            }

            return pokemon;
        } catch (error) {
            throw new ApiError('Erro ao buscar pokemon');
        }
    }

    public static async searchTypePokemon(type: string): Promise<pokemon[]> {
        const url = process.env.POKE_URL;

        try {
            const pokemon: pokemon[] = [];
            const pokeType = await axios.get(`${url}/type/${type}`);

            await Promise.all(
                pokeType.data.pokemon.map(async (p: returnPokeType) => {
                    const poke = await axios.get(p.pokemon.url);

                    var status: statusPoke;
                    var hp: number;
                    var attack: number;
                    var defense: number;
                    var special_attack: number;
                    var special_defense: number;
                    var speed: number;
                    poke.data.stats.map((e: mapStatus) => {

                        if (e.stat.name == 'hp') {

                            hp = e.base_stat;

                        }
                        if (e.stat.name == 'attack') {

                            attack = e.base_stat;

                        }
                        if (e.stat.name == 'defense') {

                            defense = e.base_stat;

                        }
                        if (e.stat.name == 'special-attack') {

                            special_attack = e.base_stat;

                        }
                        if (e.stat.name == 'special-defense') {

                            special_defense = e.base_stat;

                        }
                        if (e.stat.name == 'speed') {

                            speed = e.base_stat;

                        }

                    });
                    status = { attack: attack!, defense: defense!, hp: hp!, special_attack: special_attack!, special_defense: special_defense!, speed: speed! }

                    pokemon.push({
                        base_experience: poke.data.base_experience,
                        height: poke.data.height,
                        id: poke.data.id,
                        name: poke.data.name,
                        img: poke.data.sprites.versions['generation-v']['black-white']['animated']['front_default'],
                        status: status!,
                        abilities: poke.data.abilities.map((e: abilitiesMap) => e.ability.name),
                        weight: poke.data.weight,
                        type: poke.data.types.map((e: typesMap) => e.type.name)
                    })





                })
            )

            return pokemon;

        } catch (error) {
            throw new ApiError('Erro ao listar pokemons');
        }
    }

    public static async getEvolutions(id: string) {
        const url = process.env.POKE_URL;
        try {
            const list: string[] = [];
            const data = await axios.get(`${url}/evolution-chain/${id}/`);

            data.data.chain.evolves_to.map((e: pokeEvoluationMap) => {
                list.push(e.evolves_to[0].species.name);
            });

            console.log(list);

        } catch (error) {

        }
    }
}