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
import { Recipes as RecipesModel } from '@prisma/client';


@Controller()
export class RecipesController {
    constructor(
        private readonly userService: RecipesService,

    ) { }

    }