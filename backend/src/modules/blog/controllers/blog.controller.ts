import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateBlogDto } from '../dtos/create-blog.dto';
import { UpdateBlogDto } from '../dtos/update-blog.dto';
import { BlogService } from '../services/blog.service';

@Controller('v1')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('blogs')
  async getBlogs() {
    return this.blogService.blogRepository.findAll();
  }

  @Post('blogs')
  async createBlog(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.addNewBlog(createBlogDto);
  }

  @Patch('blogs/:id')
  async updateBlog(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.updateOneById(id, updateBlogDto);
  }

  @Delete('blogs/:id')
  async deleteBlog(@Param('id') id: string) {
    return this.blogService.deleteOneById(id);
  }

  @Get('blogs/:id')
  async getBlog(@Param('id') id: string) {
    return this.blogService.findOne({ id });
  }
}
