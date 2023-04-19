import { Test, TestingModule } from '@nestjs/testing';
import { RecipiesDtoController } from './recipies-dto.controller';
import { RecipiesDtoService } from './recipies-dto.service';

describe('RecipiesDtoController', () => {
  let controller: RecipiesDtoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipiesDtoController],
      providers: [RecipiesDtoService],
    }).compile();

    controller = module.get<RecipiesDtoController>(RecipiesDtoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
