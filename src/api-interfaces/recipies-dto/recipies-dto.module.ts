import { Module } from '@nestjs/common';
import { RecipiesDtoService } from './recipies-dto.service';
import { RecipiesDtoController } from './recipies-dto.controller';

@Module({
  controllers: [RecipiesDtoController],
  providers: [RecipiesDtoService]
})
export class RecipiesDtoModule {}
