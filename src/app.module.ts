import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from './prismaservices/prisma.service';
import { UserService } from './prismaservices/user.service';
import { UserController } from './controllers/users.controller';
import { CreateCreateUserDtoDto } from './api-interfaces/create-user-dto/dto/create-create-user-dto.dto';
import { BlogPostService } from './prismaservices/blogpost.service';
import { BlogpostController } from './controllers/blogposts.controller';
import { BlogPostDto } from './api-interfaces/blog-post-dto/entities/blog-post-dto.entity';
import { RecipesService } from './prismaservices/recipes.service';
import { RecipiesDto } from './api-interfaces/recipies-dto/entities/recipies-dto.entity';
import { RecipesController } from './controllers/recipes.controller';



@Module({
  imports: [CreateCreateUserDtoDto, BlogPostDto, RecipiesDto],
  controllers: [AppController,UserController, BlogpostController,RecipesController],
  providers: [AppService,UserService, BlogPostService,RecipesService, PrismaService],
})


export class AppModule { }
