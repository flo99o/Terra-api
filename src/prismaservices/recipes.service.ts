import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Recipes, Prisma } from '@prisma/client';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async recipe(
    userWhereUniqueInput: Prisma.RecipesWhereUniqueInput,
  ): Promise<Recipes | null> {
    return this.prisma.recipes.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async recipes(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RecipesWhereUniqueInput;
    where?: Prisma.RecipesWhereInput;
    orderBy?: Prisma.RecipesOrderByWithRelationInput;
  }): Promise<Recipes[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.recipes.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createRecipe(data: Prisma.RecipesCreateInput): Promise<Recipes> {
    return this.prisma.recipes.create({
      data,
    });
  }

  async updateRecipe(params: {
    where: Prisma.RecipesWhereUniqueInput;
    data: Prisma.RecipesUpdateInput;
  }): Promise<Recipes> {
    const { where, data } = params;
    return this.prisma.recipes.update({
      data,
      where,
    });
  }

  async deleteRecipe(where: Prisma.RecipesWhereUniqueInput): Promise<Recipes> {
    return this.prisma.recipes.delete({
      where,
    });
  }
}
