import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class MemoryMonitorService implements OnModuleInit, OnModuleDestroy {
  private memoryCheckInterval: any;
  private readonly logger = new Logger(MemoryMonitorService.name);

  onModuleInit() {
    this.memoryCheckInterval = setInterval(
      () => {
        const memoryUsage = process.memoryUsage();
        this.logger.log(
          `Memory Usage - RSS (${memoryUsage.rss}): ${Math.round(memoryUsage.rss / 1024 / 1024)} MB, ` +
            `Heap Total - (${memoryUsage.heapTotal}): ${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB, ` +
            `Heap Used - (${memoryUsage.heapUsed}): ${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
          'MemoryMonitor',
        );
      },
      1000 * 60 * 5,
    );
  }

  onModuleDestroy() {
    clearInterval(this.memoryCheckInterval);
  }
}
