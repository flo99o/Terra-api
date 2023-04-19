import { Test, TestingModule } from '@nestjs/testing';
import { BlogPostDtoService } from './blog-post-dto.service';

describe('BlogPostDtoService', () => {
  let service: BlogPostDtoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogPostDtoService],
    }).compile();

    service = module.get<BlogPostDtoService>(BlogPostDtoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
