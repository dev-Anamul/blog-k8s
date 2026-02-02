import { BcryptService } from '@/lib/bcrypt/bcypt.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/shared/base-classes/base.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService extends BaseService<UserEntity, CreateUserDto, UpdateUserDto, UserRepository> {
  constructor(
    readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
  ) {
    super(userRepository);
  }

  /**
   * Add a new user
   * @param createUserDto - The create user dto
   * @returns The created user
   */
  async addNewUser(createUserDto: CreateUserDto) {
    // hash password
    const hashedPassword = await this.bcryptService.hash(createUserDto.password);

    // create user
    const user = await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    // return the response
    return { message: 'Create user successful', user };
  }

  /**
   * Find a user by email
   * @param email - The email to find the user by
   * @returns The user if found, otherwise null
   */
  async findByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }

  /**
   * Find a user by email or throw an error if not found
   * @param email - The email to find the user by
   * @returns The user if found, otherwise throws an error
   */
  async findByEmailOrThrow(email: string) {
    const user = await this.findByEmail(email);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
