import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SettingsController } from './controllers/settings.controller';
import { SettingsEntity, SettingsSchema } from './entities/settings.entity';
import { SettingsRepository } from './repositories/settings.repository';
import { SettingsService } from './services/settings.service';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: SettingsEntity.name, schema: SettingsSchema }])],
  controllers: [SettingsController],
  providers: [SettingsService, SettingsRepository],
  exports: [SettingsService],
})
export class SettingsModule {}
