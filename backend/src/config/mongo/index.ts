import { EnvConfig } from '@/lib/zod';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

/**
 * @description this method export the production mongo configuration
 * @param configService - env configurations
 */
export const mongoConnection = async (configService: ConfigService<EnvConfig>) => {
  // mongo host
  const mongoHost = configService.get('MONGO_HOST');
  const mongoPort = configService.get('MONGO_PORT');

  const mongoUser = configService.get('DB_USER');
  const mongoPass = configService.get('DB_PASS');

  const mongoDbName = configService.get('DB_NAME');

  // mongo uri
  const uri = `mongodb://${mongoUser}:${mongoPass}@${mongoHost}:${mongoPort}/${mongoDbName}?authSource=admin`;

  console.log(uri);

  return { uri };
};

/**
 * @description this method export the production mongo configuration
 * @param configService - env configurations
 */
export const MongoModule = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService<EnvConfig>) => await mongoConnection(configService),
  inject: [ConfigService],
});
