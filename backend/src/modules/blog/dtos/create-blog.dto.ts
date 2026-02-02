import { OmitType } from '@nestjs/swagger';
import { BlogDto } from './blog.dto';

export class CreateBlogDto extends OmitType(BlogDto, [] as const) {}
