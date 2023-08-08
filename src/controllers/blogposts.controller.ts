
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BlogPostService } from 'src/prismaservices/blogpost.service';
import { Prisma, BlogPost as BlogPostModel, BlogPost } from '@prisma/client';
import { ApiBody } from '@nestjs/swagger';


@Controller('')
export class BlogpostController {
  constructor(
    private readonly postService: BlogPostService,
  ) { }

  @Post('blopost')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        post_title: { type: 'string' },
        post_img: { type: 'string' },
        post_comment: { type: 'string' },
        post_author: { type: 'string' },
        post_content: { type: 'string' },
        post_duration: { type: 'string' },

      },
    },
  })
  async createBlogPost(
    @Body() data: any): Promise<BlogPost> {
    try {
      const blogPost = await this.postService.createBlogPost(data)
      // console.log(blogPost)
      return blogPost
    } catch (err) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        mess: "Internal server error",
        error: 'Blogpost could not be created',
      }, HttpStatus.FORBIDDEN, {
        cause: err,
      });
    }

  }

  @Get('blogposts')
  async getAllBlogPost(@Param('id') id: number): Promise<BlogPostModel[]> {
    return this.postService.blogposts({})
  }

  @Get('blogpost/:id')
  async getBlogById(@Param('id' ) post_id: string) : Promise<BlogPostModel>{
    return this.postService.findBlogPostById(post_id)
  }

  @Put('blogpost/:id')
  async updateBlogPostById(
    @Param('id') post_id: string,
    @Body() UpdateBlogPostDto: { post_title: string, post_img: string, post_content: string, post_author: string, post_duration: string, post_comment: string }
  ): Promise<BlogPostModel> {
    try {
      const { post_title, post_img, post_author, post_duration, post_content } = UpdateBlogPostDto
      const updateData: Prisma.BlogPostUpdateInput = {};
      if (post_title) updateData.post_title = post_title;
      if (post_img) updateData.post_img = post_img;
      if (post_author) updateData.post_author = post_author;
      if (post_content) updateData.post_content = post_content;
      if (post_duration) updateData.post_duration = +post_duration;
      return this.postService.updateBlogPost({
        post_id: post_id,
        where: { post_id: +post_id },
        data: updateData,

      });
    } catch (err) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        mess: "Internal server error",
        error: 'This user could not be updated.',
      }, HttpStatus.FORBIDDEN, {
        cause: err,
      });
    }
  }


  @Delete('blogpost/:id')
  async deleteBlogPostById(
    @Param('id') post_id: string): Promise<BlogPost> {
    try {
      return this.postService.deleteBlogPost({ post_id: +post_id })
    } catch (err) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        mess: "Internal server error",
        error: 'This user could not be found.',
      }, HttpStatus.FORBIDDEN, {
        cause: err,
      });
    }


  }

}