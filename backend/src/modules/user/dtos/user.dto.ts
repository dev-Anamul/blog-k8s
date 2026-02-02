import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserGender } from 'src/shared/enum/user.enum';

export class UserDto {
  @ApiProperty({ description: 'The email of the user', example: 'john.doe@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'The first name of the user', example: 'John' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'The last name of the user', example: 'Doe' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'The username of the user', example: 'john.doe' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ description: 'The gender of the user', example: 'male' })
  @IsNotEmpty()
  @IsEnum(UserGender)
  gender: UserGender;

  @ApiProperty({ description: 'The avatar of the user', example: 'https://example.com/avatar.jpg' })
  @IsString()
  avatar: string;

  @ApiProperty({ description: 'The password of the user', example: 'password123' })
  @IsString()
  password: string;
}
