import { HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { BlogPost, Prisma } from '@prisma/client';





@Injectable()
export class BlogPostService {
  constructor(private prisma: PrismaService) { }

  async blogpost(
    userWhereUniqueInput: Prisma.BlogPostWhereUniqueInput,
  ): Promise<BlogPost | null> {
    return this.prisma.blogPost.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async blogposts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BlogPostWhereUniqueInput;
    where?: Prisma.BlogPostWhereInput;
    orderBy?: Prisma.BlogPostOrderByWithRelationInput;
  }): Promise<BlogPost[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.blogPost.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findBlogPostById(post_id: string): Promise<BlogPost> {
    return this.prisma.blogPost.findUnique({ where: {post_id: +post_id } });
  }

  async createBlogPost(
    data: Prisma.BlogPostCreateInput): Promise<BlogPost> {
    try {
      const { post_title, post_content, post_img, post_author, post_duration, post_comment, post_date } = data
      const duration = post_duration.toString();
      const createBlogPost = await this.prisma.blogPost.create({
        data: {
          post_title,
          post_img,
          post_comment,
          post_author,
          post_content,
          post_duration: +duration,
          post_date,
        }
      })
      // console.log('Nouveau blog', createBlogPost)
      return createBlogPost;
    } catch (err) {
      console.log(err)
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "L'article n'a pas pu être crée",
          error: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }


  }

  async updateBlogPost(params: {
    post_id: string,

    where: Prisma.BlogPostWhereUniqueInput;
    data: Prisma.BlogPostUpdateInput;
  }): Promise<BlogPost> {
    const { post_id, where, data } = params;
    const existingBlogPost = await this.prisma.blogPost.findUnique({ where: { post_id: +post_id } })
    if (!existingBlogPost) {
      throw new Error(`BlogPost with IG ${post_id} not found`)
    }
    return this.prisma.blogPost.update({

      data,
      where,
    });
  }


  async deleteBlogPost(where: Prisma.BlogPostWhereUniqueInput): Promise<BlogPost> {
    return this.prisma.blogPost.delete({
      where
    });
  }
}
