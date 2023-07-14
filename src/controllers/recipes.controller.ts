import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    Query,
    HttpStatus,
    HttpException
} from '@nestjs/common';
import { RecipesService } from 'src/prismaservices/recipes.service';
import { Recipes as RecipesModel, Prisma, Recipes } from '@prisma/client';
import { ApiBody } from '@nestjs/swagger';
import { UpdateBlogPostDtoDto } from '../api-interfaces/blog-post-dto/dto/update-blog-post-dto.dto';

@Controller()
export class RecipesController {
    constructor(
        private readonly recipeService: RecipesService,

    ) { }


    @Get('recipes')
    async getAllRecipes(@Param('id') id: string): Promise<RecipesModel>{
        try{
          this.recipeService
        }catch (err){
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                mess: "Internal server error",
                error: 'Failed to get all users. Please try again later.',
            }, HttpStatus.FORBIDDEN, {
                cause: err,
            });

        }
        return this.recipeService.recipe({});
    }
   
    @Put('recipe/:id')
    async updateRecipeById(
        @Param('id') recipe_id: string,
        @Body() UpdateBlogPostDtoDto: {recipe_name: string,ingredients:string,step:string,duration:string,side_note:string}
    ): Promise<RecipesModel>{
        try{
            const{ recipe_name,ingredients,step,duration,side_note} = UpdateBlogPostDtoDto
            const updateData: Prisma.RecipesUpdateInput= {}
            if(recipe_name) updateData.recipe_name = recipe_name;
            if(ingredients)updateData.ingredients = ingredients;
            if(step)updateData.step = step
            if(duration)updateData.duration = +duration
            if(side_note)updateData.side_note= side_note
            return this.recipeService.updateRecipe({
                recipe_id: recipe_id,
                where:{recipe_id: +recipe_id},
                data: updateData
            })

        } catch(err){
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                mess: "Internal server error",
                error: 'Cette recette n\'a pas pu être modifié.',
              }, HttpStatus.FORBIDDEN, {
                cause: err,
              });

        }
    
    }
   @Delete('recipes/:id')
   async deleteRecipeBtId(
    @Param('id') recipe_id: string) : Promise<Recipes>{
        try{
            return this.recipeService.deleteRecipe({
                recipe_id: +recipe_id
            })

        }catch(err){
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                mess: "Internal server error",
                error: 'Cette recette n\'a pas pu être trouvé.',
              }, HttpStatus.FORBIDDEN, {
                cause: err,
              });
        }
    }


    @Post('recipes')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                recipe_name: { type: 'string' },
                ingredients: { type: 'string' },
                step: { type: 'string' },
                duration: { type: 'string' },
                side_note: { type: 'string' },

            },
        },
    })
    async createRecipe(
        @Body() data: any): Promise<RecipesModel> {
        try {
            const recipePost = await this.recipeService.createRecipe(data)
            console.log(recipePost)
            return recipePost
        } catch (err) {
            console.log(err)
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                mess: "Internal server error",
                error: 'Blogpost could not be created',
            }, HttpStatus.FORBIDDEN, {
                cause: err,
            });

        }
    }   
}

