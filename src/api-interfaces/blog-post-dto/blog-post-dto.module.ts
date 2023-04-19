import { Module } from '@nestjs/common';
import { BlogPostDtoService } from './blog-post-dto.service';
import { BlogPostDtoController } from './blog-post-dto.controller';

@Module({
  controllers: [BlogPostDtoController],
  providers: [BlogPostDtoService]
})
export class BlogPostDtoModule {}
