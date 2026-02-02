import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogController } from './controllers/blog.controller';
import { BlogEntity, BlogSchema } from './entities/blog.entity';
import { BlogRepository } from './repositories/blog.repository';
import { BlogService } from './services/blog.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: BlogEntity.name, schema: BlogSchema }])],
  controllers: [BlogController],
  providers: [BlogService, BlogRepository],
  exports: [BlogService],
})
export class BlogModule {}
