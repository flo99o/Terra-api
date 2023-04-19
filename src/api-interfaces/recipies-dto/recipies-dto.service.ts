import { Injectable } from '@nestjs/common';
import { CreateRecipiesDtoDto } from './dto/create-recipies-dto.dto';
import { UpdateRecipiesDtoDto } from './dto/update-recipies-dto.dto';

@Injectable()
export class RecipiesDtoService {
  create(createRecipiesDtoDto: CreateRecipiesDtoDto) {
    return 'This action adds a new recipiesDto';
  }

  findAll() {
    return `This action returns all recipiesDto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recipiesDto`;
  }

  update(id: number, updateRecipiesDtoDto: UpdateRecipiesDtoDto) {
    return `This action updates a #${id} recipiesDto`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipiesDto`;
  }
}
