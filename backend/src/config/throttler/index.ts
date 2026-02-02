import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

export const rateLimits = [
  {
    name: 'short',
    ttl: 1000,
    limit: 10,
  },
  {
    name: 'medium',
    ttl: 10000,
    limit: 100,
  },
  {
    name: 'long',
    ttl: 60000,
    limit: 600,
  },
];

/**
 * @description this method export the throttler configuration
 * @param configService - env configurations
 */
@Module({
  imports: [ThrottlerModule.forRoot(rateLimits)],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class ThrottlerConfigModule {}
