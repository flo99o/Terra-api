
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { BlogPostService } from 'src/prismaservices/blogpost.service';
import { BlogPost as BlogPostModel } from '@prisma/client';
import * as request from 'supertest';
import { UpdateBlogPostDtoDto } from '../api-interfaces/blog-post-dto/dto/update-blog-post-dto.dto';



@Controller()
export class AppController {
  constructor(
    private readonly postService: BlogPostService,
  ) { }


  @Post('blopost')
  async createBlogPost(
    @Body() CreateBlogPostDto: { post_title: string, post_content: string, post_author: string, post_duration: number, post_comment: string })
    : Promise<BlogPostModel> {
    return this.postService.createBlogPost(CreateBlogPostDto)
  }


  @Get('blogposts')
  async getAllBlogPost(@Param('id') id: number): Promise<BlogPostModel[]> {
    return this.postService.blogposts({})
  }

  @Put('blogpost/:id')
    async updateBlogPostById(
      @Param('id') id: number,
      @Body() UpdateBlogPostDto: { post_title: string, post_content: string, post_author: string, post_duration: number, post_comment: string }
  ): Promise<BlogPostModel>{
    return this.postService.updateBlogPost({where: {id}, data:UpdateBlogPostDto})
  }

@Delete('blogpost/:id')
   async deleteBlogPostById(
     @Param('id') id: number): Promise<BlogPostModel>{
      return this.postService.deleteBlogPost({})
     }

}

 