import { Module } from '@nestjs/common';
import { MemoryMonitorService } from './memory-monitor/memory-monitor.service';

@Module({
  providers: [MemoryMonitorService],
})
export class MonitoringModule {}
