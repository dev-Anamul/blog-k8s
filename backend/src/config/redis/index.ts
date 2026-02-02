import { EnvConfig } from '@/lib/zod';
import { RedisModule, RedisModuleOptions } from '@nestjs-modules/ioredis';
import { ConfigService } from '@nestjs/config';

/**
 * @description this method generate the redis url
 * @param config - env configurations
 */
export const generateRedisUrl = async (config: ConfigService<EnvConfig>): Promise<RedisModuleOptions> => {
  // redis host
  const redisHost = config.get('REDIS_HOST');
  const redisPort = config.get('REDIS_PORT');

  // return the redis url
  return {
    type: 'single',
    url: `redis://${redisHost}:${redisPort}`,
  };
};

/**
 * @description this method export the redis configuration
 * @param configService - env configurations
 */
export const RedisConfigModule = RedisModule.forRootAsync({
  useFactory: async (configService: ConfigService<EnvConfig>) => generateRedisUrl(configService),
  inject: [ConfigService],
});
