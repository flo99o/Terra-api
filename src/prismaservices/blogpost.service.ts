import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { BlogPost, Prisma } from '@prisma/client';




@Injectable()
export class BlogPostService {
  constructor(private prisma: PrismaService) {}

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

  async createBlogPost(data: Prisma.BlogPostCreateInput): Promise<BlogPost> {
    return this.prisma.blogPost.create({
      data,
    });
  }

  async updateBlogPost(params: {
    where: Prisma.BlogPostWhereUniqueInput;
    data: Prisma.BlogPostUpdateInput;
  }): Promise<BlogPost> {
    const { where, data } = params;
    return this.prisma.blogPost.update({
      data,
      where,
    });
  }

  async deleteBlogPost(where: Prisma.BlogPostWhereUniqueInput): Promise<BlogPost> {
    return this.prisma.blogPost.delete({
      where,
    });
  }
}
