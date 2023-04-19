import { Test, TestingModule } from '@nestjs/testing';
import { RecipiesDtoService } from './recipies-dto.service';

describe('RecipiesDtoService', () => {
  let service: RecipiesDtoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipiesDtoService],
    }).compile();

    service = module.get<RecipiesDtoService>(RecipiesDtoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
