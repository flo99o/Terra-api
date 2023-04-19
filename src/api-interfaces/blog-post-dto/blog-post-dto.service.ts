import { Injectable } from '@nestjs/common';
import { CreateBlogPostDtoDto } from './dto/create-blog-post-dto.dto';
import { UpdateBlogPostDtoDto } from './dto/update-blog-post-dto.dto';

@Injectable()
export class BlogPostDtoService {
  create(createBlogPostDtoDto: CreateBlogPostDtoDto) {
    return 'This action adds a new blogPostDto';
  }

  findAll() {
    return `This action returns all blogPostDto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blogPostDto`;
  }

  update(id: number, updateBlogPostDtoDto: UpdateBlogPostDtoDto) {
    return `This action updates a #${id} blogPostDto`;
  }

  remove(id: number) {
    return `This action removes a #${id} blogPostDto`;
  }
}
