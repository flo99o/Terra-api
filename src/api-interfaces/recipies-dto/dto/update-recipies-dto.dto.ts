import { PartialType } from '@nestjs/mapped-types';
import { CreateRecipiesDtoDto } from './create-recipies-dto.dto';

export class UpdateRecipiesDtoDto extends PartialType(CreateRecipiesDtoDto) {}
