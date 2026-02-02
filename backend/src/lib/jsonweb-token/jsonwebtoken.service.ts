import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EnvConfig } from '../zod';
import { LoginTokenPayload } from './types';

@Injectable()
export class JsonWebTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<EnvConfig, true>,
  ) {}

  /**
   * Generate a login token
   * @param payload - The payload to sign
   * @returns The login token
   */
  async loginToken(payload: LoginTokenPayload) {
    // get the config
    const secret = this.configService.get('LOGIN_SECRET');
    const expiresIn = this.configService.get('LOGIN_EXPIRES_IN');
    // sign the token
    return this.jwtService.sign(payload, { secret, expiresIn, algorithm: 'HS256' });
  }

  /**
   * Verify a login token
   * @param token - The token to verify
   * @returns The payload of the token
   */
  async verifyLoginToken(token: string) {
    // get the config
    const secret = this.configService.get('LOGIN_SECRET');

    // verify the token
    return this.jwtService.verify(token, { secret });
  }
}
