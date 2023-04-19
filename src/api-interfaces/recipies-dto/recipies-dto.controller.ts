import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecipiesDtoService } from './recipies-dto.service';
import { CreateRecipiesDtoDto } from './dto/create-recipies-dto.dto';
import { UpdateRecipiesDtoDto } from './dto/update-recipies-dto.dto';

@Controller('recipies-dto')
export class RecipiesDtoController {
  constructor(private readonly recipiesDtoService: RecipiesDtoService) {}

  @Post()
  create(@Body() createRecipiesDtoDto: CreateRecipiesDtoDto) {
    return this.recipiesDtoService.create(createRecipiesDtoDto);
  }

  @Get()
  findAll() {
    return this.recipiesDtoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipiesDtoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipiesDtoDto: UpdateRecipiesDtoDto) {
    return this.recipiesDtoService.update(+id, updateRecipiesDtoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipiesDtoService.remove(+id);
  }
}
