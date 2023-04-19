import { Test, TestingModule } from '@nestjs/testing';
import { BlogPostDtoController } from './blog-post-dto.controller';
import { BlogPostDtoService } from './blog-post-dto.service';

describe('BlogPostDtoController', () => {
  let controller: BlogPostDtoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogPostDtoController],
      providers: [BlogPostDtoService],
    }).compile();

    controller = module.get<BlogPostDtoController>(BlogPostDtoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
