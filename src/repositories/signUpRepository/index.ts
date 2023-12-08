import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export class SignUpRepository{
    public static async countEmail( email: string): Promise<number> {
        const count_email: number = await prisma.user.count({
      where: {
        email: email,
      },
        });
        
        return count_email;
    }

    public static async signUp(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({ data: data });
        
        return user;
   }
}