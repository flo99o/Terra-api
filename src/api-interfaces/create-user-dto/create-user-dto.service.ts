import { Injectable } from '@nestjs/common';
import { CreateCreateUserDtoDto } from './dto/create-create-user-dto.dto';
import { UpdateCreateUserDtoDto } from './dto/update-create-user-dto.dto';

@Injectable()
export class CreateUserDtoService {
  create(createCreateUserDtoDto: CreateCreateUserDtoDto) {
    return 'This action adds a new createUserDto';
  }

  findAll() {
    return `This action returns all createUserDto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} createUserDto`;
  }

  update(id: number, updateCreateUserDtoDto: UpdateCreateUserDtoDto) {
    return `This action updates a #${id} createUserDto`;
  }

  remove(id: number) {
    return `This action removes a #${id} createUserDto`;
  }
}
