import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateCreateUserDtoDto } from './api-interfaces/create-user-dto/dto/create-create-user-dto.dto';
import { BlogPostDto } from './api-interfaces/blog-post-dto/entities/blog-post-dto.entity';
import { RecipiesDto } from './api-interfaces/recipies-dto/entities/recipies-dto.entity';


@Module({
  imports: [CreateCreateUserDtoDto, BlogPostDto, RecipiesDto],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule { }
