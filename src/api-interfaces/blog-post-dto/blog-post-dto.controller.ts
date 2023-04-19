import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlogPostDtoService } from './blog-post-dto.service';
import { CreateBlogPostDtoDto } from './dto/create-blog-post-dto.dto';
import { UpdateBlogPostDtoDto } from './dto/update-blog-post-dto.dto';

@Controller('blog-post-dto')
export class BlogPostDtoController {
  constructor(private readonly blogPostDtoService: BlogPostDtoService) {}

  @Post()
  create(@Body() createBlogPostDtoDto: CreateBlogPostDtoDto) {
    return this.blogPostDtoService.create(createBlogPostDtoDto);
  }

  @Get()
  findAll() {
    return this.blogPostDtoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogPostDtoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogPostDtoDto: UpdateBlogPostDtoDto) {
    return this.blogPostDtoService.update(+id, updateBlogPostDtoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogPostDtoService.remove(+id);
  }
}
