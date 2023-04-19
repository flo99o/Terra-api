import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogPostDtoDto } from './create-blog-post-dto.dto';

export class UpdateBlogPostDtoDto extends PartialType(CreateBlogPostDtoDto) {}
