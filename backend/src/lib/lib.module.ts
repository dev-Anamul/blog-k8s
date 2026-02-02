import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { BcryptService } from './bcrypt/bcypt.service';
import { DateService } from './date';
import { JsonWebTokenService } from './jsonweb-token/jsonwebtoken.service';

@Global()
@Module({
  imports: [HttpModule, JwtModule],
  providers: [DateService, BcryptService, JsonWebTokenService],
  exports: [DateService, BcryptService, JsonWebTokenService],
})
export class LibModule {}
