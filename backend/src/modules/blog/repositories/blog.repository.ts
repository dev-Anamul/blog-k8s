import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/shared/base-classes/base.repository';
import { BlogEntity } from '../entities/blog.entity';

@Injectable()
export class BlogRepository extends BaseRepository<BlogEntity> {
  constructor(@InjectModel(BlogEntity.name) private readonly blogModel: Model<BlogEntity>) {
    super(blogModel);
  }
}
