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
import * as sanitizeHtml from 'sanitize-html';


@Controller('')
export class RecipesController {
    constructor(
        private readonly recipeService: RecipesService,

    ) { }


    @Get('recipes')
    async getAllRecipes(@Param('id') id: string): Promise<RecipesModel[]> {
        return this.recipeService.recipes({});
    }

    @Get('recipe/:id')
    async getRecipeById(@Param('id') recipe_id: string): Promise<RecipesModel> {
        return this.recipeService.findRecipeById(recipe_id)
    }

    @Put('recipe/:id')
    updateRecipeById(
        @Param('id') recipe_id: string,
        @Body() UpdateBlogPostDtoDto: { recipe_name: string, ingredients: string, step: string, duration: string, side_note: string, recipe_img: string }
    ): Promise<RecipesModel> {
        try {
            const { recipe_name, recipe_img, ingredients, step, duration, side_note } = UpdateBlogPostDtoDto
            const updateData: Prisma.RecipesUpdateInput = {}
            if (recipe_name) updateData.recipe_name = sanitizeHtml(recipe_name);
            if (recipe_img) updateData.recipe_img = recipe_img
            if (ingredients) updateData.ingredients = sanitizeHtml(ingredients);
            if (step) updateData.step = sanitizeHtml(step)
            if (duration) updateData.duration = +duration
            if (side_note) updateData.side_note = sanitizeHtml(side_note)
            return this.recipeService.updateRecipe({
                recipe_id: recipe_id,
                where: { recipe_id: +recipe_id },
                data: updateData
            })
        } catch (err) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                mess: "Internal server error",
                error: 'Cette recette n\'a pas pu être modifié.',
            }, HttpStatus.FORBIDDEN, {
                cause: err,
            });

        }

    }


    @Delete('recipe/:id')
    async deleteRecipeBtId(
        @Param('id') recipe_id: string): Promise<Recipes> {
        try {
            return this.recipeService.deleteRecipe({
                recipe_id: +recipe_id
            })

        } catch (err) {
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
                recipe_img: { type: 'string' },
                ingredients: { type: 'string' },
                step: { type: 'string' },
                duration: { type: 'string' },
                side_note: { type: 'string' },

            },
        },
    })
    async createRecipe(
        @Body() data: any): Promise<RecipesModel> {
        console.log(data);
        try {
            console.log('Received data in controller:', data);
            data.recipe_name = sanitizeHtml(data.recipe_name);
            data.ingredients = sanitizeHtml(data.ingredients);
            data.step = sanitizeHtml(data.step);
            data.side_note = sanitizeHtml(data.side_note);
            const recipePost = await this.recipeService.createRecipe(data);
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

