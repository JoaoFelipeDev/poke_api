import { ApiError } from "../../errors/ApiError";
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class TeamRepository {
    public static async createTeam(name: string, id: string) {

        const team = await prisma.team.create({
            data: {
                name: name,
                user_id: id
            }
        });

        return team;
    }

    public static async addPokemonToTeam(name: string, url: string, id: string) {

        const namePoke = await prisma.pokemon.count({
            where: {
                name: name
            }
        });
        if (namePoke != 0) {
            throw new ApiError('Esse pokemon já foi adicionado ao time!', 400);

        }
        const team = await prisma.team.findFirst({
            where: {
                user_id: id
            }
        });

        if (!team) {
            throw new ApiError('Time não encontrado');

        }

        const teamId = team.id;
        const count = await prisma.pokemon.findMany({
            where: {
                team_id: teamId
            }
        });



        if (count.length >= 5) {
            throw new ApiError('Não pode criar mais de 5 pokemons');
        }


        const pokemon = await prisma.pokemon.create({
            data: {
                name: name,
                url: url,
                team_id: teamId!,
            }
        })

        return pokemon;
    }

    public static async getTeam(id: string) {

        try {
            const teams = await prisma.team.findFirst({
                where: {
                    user_id: id
                },
                include: {
                    pokemon: true
                }
            })
            console.log(teams);
            return teams;
        } catch (error) {
            throw new ApiError('Erro ao encontrar time')
        }

    }
}