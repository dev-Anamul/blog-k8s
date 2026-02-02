import { MongoModule } from '@/config/mongo';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullMqConfigModule } from './config/bull-mq';
import { EnvConfigModule } from './config/env';
import { RedisConfigModule } from './config/redis';
import { ThrottlerConfigModule } from './config/throttler';
import { LibModule } from './lib/lib.module';
import { BlogModule } from './modules/blog/blog.module';
import { MonitoringModule } from './modules/monitoring/monitoring.module';
import { SettingsModule } from './modules/settings/settings.module';
import { SpikeModule } from './modules/spike/spike.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    HttpModule,
    LibModule,
    UserModule,
    BlogModule,
    SpikeModule,
    EnvConfigModule,
    MongoModule,
    RedisConfigModule,
    BullMqConfigModule,
    ThrottlerConfigModule,
    MonitoringModule,
    TerminusModule,
    SettingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
