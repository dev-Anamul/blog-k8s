import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class FileDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  file: Express.Multer.File;
}
