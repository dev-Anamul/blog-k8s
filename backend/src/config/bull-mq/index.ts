import { EnvConfig } from '@/lib/zod';
import { BullModule } from '@nestjs/bullmq';
import { ConfigService } from '@nestjs/config';

/**
 * @description this method export the bull mq configuration
 * @param configService - env configurations
 */
export const getBullMqConfig = async (configService: ConfigService<EnvConfig>) => {
  const redisHost = await configService.get('REDIS_HOST');
  const redisPort = await configService.get('REDIS_PORT');

  return {
    connection: {
      host: redisHost,
      port: redisPort,
    },
    defaultJobOptions: {
      removeOnComplete: 100,
      attempts: 10,
      backoff: {
        type: 'exponential',
        delay: 5 * 60 * 1000,
      },
    },
  };
};

/**
 * @description this method export the bull mq configuration
 * @param configService - env configurations
 */
export const BullMqConfigModule = BullModule.forRootAsync({
  useFactory: async (configService: ConfigService<EnvConfig>) => getBullMqConfig(configService),
  inject: [ConfigService],
});
