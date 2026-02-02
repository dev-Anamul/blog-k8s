import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class BcryptService {
  private readonly saltRounds = 10;
  constructor() {}

  /**
   * Hash a password
   * @param password - The password to hash
   * @returns The hashed password
   */
  async hash(password: string) {
    return bcrypt.hash(password, this.saltRounds);
  }

  /**
   * Compare a password with a hash
   * @param password - The password to compare
   * @param hash - The hash to compare
   * @returns True if the password matches the hash, otherwise false
   */
  async compare(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
