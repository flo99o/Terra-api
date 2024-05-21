import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Recipes, Prisma } from '@prisma/client';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) { }

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
 async findRecipeById(recipe_id: string): Promise<Recipes>{
  return this.prisma.recipes.findUnique({where:{recipe_id: +recipe_id}})
 }
 
  async createRecipe(data: Prisma.RecipesCreateInput): Promise<Recipes> {
    try {
      const { recipe_name, ingredients, step, duration, side_note, recipe_img } = data
      const post_duration = duration.toString()
      const createRecipePost = await this.prisma.recipes.create({
        data: {
          recipe_name,
          recipe_img,
          ingredients,
          step,
          duration: +post_duration,
          side_note
        }
      })
      console.log("recette", createRecipePost)
      return createRecipePost
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "la recette n'a pas pu être crée",
          error: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

  }

  async updateRecipe(params: {
    recipe_id: string,
    where: Prisma.RecipesWhereUniqueInput;
    data: Prisma.RecipesUpdateInput;
  }): Promise<Recipes> {
    const {recipe_id, where, data } = params;
    const existingRecipe = await this.prisma.recipes.findUnique({where:{recipe_id: +recipe_id}})
   if(!existingRecipe){
    throw new Error(`Recipe with ID ${recipe_id} not found`)
   }
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
