import { IUsersRepository } from "@/domain/user/contracts/users-repository";
import { User } from "@/domain/user/entities/user";
import { PrismaService } from "@/infra/database/prisma.service";
import { PrismaUserMapper } from "@/infra/database/prisma/mappers/user/prisma-user-mapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaUsersRepository implements IUsersRepository {

   constructor(private readonly prisma: PrismaService) { }

   async save(user: User): Promise<User | null> {
      const data = PrismaUserMapper.toPrisma(user);
      const result = await this.prisma.user.create({
         data
      })

      return PrismaUserMapper.toDomain(result);

   }

   async delete(id: string): Promise<User | null> {
      throw new Error("Method not implemented.");
   }

   async update(id: string, user: User): Promise<User | null> {
      const data = PrismaUserMapper.toPrisma(user);

      const result = await this.prisma.user.update({
         where: {
            id,
         },
         data
      });

      return PrismaUserMapper.toDomain(result);
   }

   async findById(id: string): Promise<User | null> {
      const user = await this.prisma.user.findUnique({
         where: {
            id,
         }
      })

      if(user)
         return PrismaUserMapper.toDomain(user);

      return null;
   }

   async findByEmail(email: string): Promise<User | null> {
      
      const userAlreadyExists = await this.prisma.user.findUnique({
         where: {
            email,
         }
      })

      if (userAlreadyExists) 
         return PrismaUserMapper.toDomain(userAlreadyExists);
      
      return null;
   }
 
   async findAll(): Promise<User[] | null> {
      const users = await this.prisma.user.findMany();

      if(users)
         return users.map(user => PrismaUserMapper.toDomain(user));

      return null;
   }
}