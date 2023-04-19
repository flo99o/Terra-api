import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateUserDtoService } from './create-user-dto.service';
import { CreateCreateUserDtoDto } from './dto/create-create-user-dto.dto';
import { UpdateCreateUserDtoDto } from './dto/update-create-user-dto.dto';

@Controller('create-user-dto')
export class CreateUserDtoController {
  constructor(private readonly createUserDtoService: CreateUserDtoService) {}

  @Post()
  create(@Body() createCreateUserDtoDto:({name?: string, email: string, password: string})) {
    return this.createUserDtoService.create(createCreateUserDtoDto);
  }

  @Get()
  findAll() {
    return this.createUserDtoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.createUserDtoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCreateUserDtoDto: UpdateCreateUserDtoDto) {
    return this.createUserDtoService.update(+id, updateCreateUserDtoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.createUserDtoService.remove(+id);
  }
}
