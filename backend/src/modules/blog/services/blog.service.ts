import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/base-classes/base.service';
import { CreateBlogDto } from '../dtos/create-blog.dto';
import { UpdateBlogDto } from '../dtos/update-blog.dto';
import { BlogEntity } from '../entities/blog.entity';
import { BlogRepository } from '../repositories/blog.repository';

@Injectable()
export class BlogService extends BaseService<BlogEntity, CreateBlogDto, UpdateBlogDto, BlogRepository> {
  constructor(readonly blogRepository: BlogRepository) {
    super(blogRepository);
  }

  /**
   * Add a new blog
   * @param createBlogDto - The create blog dto
   * @returns The created blog
   */
  async addNewBlog(createBlogDto: CreateBlogDto) {
    // create blog
    const blog = await this.blogRepository.create(createBlogDto);

    // return the response
    return { message: 'Create blog successful', blog };
  }
}
