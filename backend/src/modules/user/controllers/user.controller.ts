import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserService } from '../services/user.service';

@Controller('v1')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  async getUsers() {
    return this.userService.userRepository.findAll();
  }

  @Post('users')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.addNewUser(createUserDto);
  }

  @Patch('users/:id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateOneById(id, updateUserDto);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteOneById(id);
  }

  @Get('users/:id')
  async getUser(@Param('id') id: string) {
    return this.userService.findOne({ id });
  }
}
