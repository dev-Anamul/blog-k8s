import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class ParamIdDto {
  @ApiProperty({
    type: 'string',
    description: 'The id of the document',
  })
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}
