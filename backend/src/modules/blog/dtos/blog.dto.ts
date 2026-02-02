import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BlogDto {
  @ApiProperty({ description: 'The title of the blog', example: 'My First Blog' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The body of the blog', example: 'This is the body of my first blog' })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty({ description: 'The image of the blog', example: 'https://example.com/image.jpg' })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({ description: 'The author of the blog', example: 'John Doe' })
  @IsString()
  @IsOptional()
  author?: string;
}
