import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/shared/base-classes/base.repository';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(@InjectModel(UserEntity.name) private readonly userModel: Model<UserEntity>) {
    super(userModel);
  }

  /**
   * Find a user by their email
   * @param email - The email of the user to find
   * @returns The found user or null if not found
   */
  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
