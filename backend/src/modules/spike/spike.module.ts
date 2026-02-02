import { Module } from '@nestjs/common';
import { SpikeController } from './controllers/spike.controller';
import { SpikeService } from './services/spike.service';

@Module({
  controllers: [SpikeController],
  providers: [SpikeService],
  exports: [SpikeService],
})
export class SpikeModule {}
