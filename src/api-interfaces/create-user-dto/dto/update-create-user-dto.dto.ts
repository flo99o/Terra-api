import { PartialType } from '@nestjs/mapped-types';
import { CreateCreateUserDtoDto } from './create-create-user-dto.dto';

export class UpdateCreateUserDtoDto extends PartialType(CreateCreateUserDtoDto) {}
