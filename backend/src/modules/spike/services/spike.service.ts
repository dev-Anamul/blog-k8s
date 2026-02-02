import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SpikeService {
  private readonly logger = new Logger(SpikeService.name);
  private cpuSpikeInterval: NodeJS.Timeout | null = null;
  private memorySpikeData: Buffer[] = [];

  /**
   * Create a CPU spike by running intensive calculations
   * @param duration - Duration in seconds (default: 10)
   * @param intensity - Intensity level 1-10 (default: 5)
   * @returns Success message
   */
  async createCpuSpike(
    duration: number = 10,
    intensity: number = 5,
  ): Promise<{ message: string; duration: number; intensity: number }> {
    this.logger.warn(`Creating CPU spike for ${duration} seconds with intensity ${intensity}`);

    const startTime = Date.now();
    const endTime = startTime + duration * 1000;
    const multiplier = intensity * 1000000; // Adjust intensity

    // Clear any existing CPU spike
    if (this.cpuSpikeInterval) {
      clearInterval(this.cpuSpikeInterval);
    }

    // Create CPU-intensive loop
    const cpuIntensiveTask = () => {
      if (Date.now() >= endTime) {
        if (this.cpuSpikeInterval) {
          clearInterval(this.cpuSpikeInterval);
          this.cpuSpikeInterval = null;
        }
        this.logger.log('CPU spike completed');
        return;
      }

      // CPU-intensive calculation
      let result = 0;
      for (let i = 0; i < multiplier; i++) {
        result += Math.sqrt(i) * Math.sin(i) * Math.cos(i);
      }
      console.log(result);
    };
    // Run the task in intervals to maintain spike
    this.cpuSpikeInterval = setInterval(cpuIntensiveTask, 100);

    // Also run it immediately
    cpuIntensiveTask();

    return {
      message: `CPU spike created for ${duration} seconds with intensity ${intensity}`,
      duration,
      intensity,
    };
  }

  /**
   * Stop the CPU spike
   * @returns Success message
   */
  async stopCpuSpike(): Promise<{ message: string }> {
    if (this.cpuSpikeInterval) {
      clearInterval(this.cpuSpikeInterval);
      this.cpuSpikeInterval = null;
      this.logger.log('CPU spike stopped');
      return { message: 'CPU spike stopped successfully' };
    }
    return { message: 'No active CPU spike to stop' };
  }

  /**
   * Create a memory spike by allocating large amounts of memory
   * @param sizeMB - Size in MB to allocate (default: 100)
   * @returns Success message with memory usage info
   */
  async createMemorySpike(sizeMB: number = 100): Promise<{ message: string; allocatedMB: number; memoryUsage: any }> {
    this.logger.warn(`Creating memory spike of ${sizeMB} MB`);

    // Allocate memory (1 MB = 1024 * 1024 bytes)
    const bufferSize = sizeMB * 1024 * 1024;
    const buffer = Buffer.alloc(bufferSize, 'x');
    this.memorySpikeData.push(buffer);

    const memoryUsage = process.memoryUsage();
    const memoryUsageMB = {
      rss: Math.round(memoryUsage.rss / 1024 / 1024),
      heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024),
      heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024),
      external: Math.round(memoryUsage.external / 1024 / 1024),
    };

    this.logger.log(`Memory spike created. Current memory usage: ${JSON.stringify(memoryUsageMB)}`);

    return {
      message: `Memory spike created: ${sizeMB} MB allocated`,
      allocatedMB: sizeMB,
      memoryUsage: memoryUsageMB,
    };
  }

  /**
   * Clear memory spike by releasing allocated memory
   * @returns Success message with memory usage info
   */
  async clearMemorySpike(): Promise<{ message: string; memoryUsage: any }> {
    const beforeMemory = process.memoryUsage();
    const beforeMB = Math.round(beforeMemory.heapUsed / 1024 / 1024);

    // Clear the memory buffers
    this.memorySpikeData = [];

    // Force garbage collection if available
    if (global.gc) {
      global.gc();
    }

    const afterMemory = process.memoryUsage();
    const afterMB = Math.round(afterMemory.heapUsed / 1024 / 1024);
    const freedMB = beforeMB - afterMB;

    const memoryUsageMB = {
      rss: Math.round(afterMemory.rss / 1024 / 1024),
      heapTotal: Math.round(afterMemory.heapTotal / 1024 / 1024),
      heapUsed: Math.round(afterMemory.heapUsed / 1024 / 1024),
      external: Math.round(afterMemory.external / 1024 / 1024),
    };

    this.logger.log(`Memory spike cleared. Freed approximately ${freedMB} MB`);

    return {
      message: `Memory spike cleared. Freed approximately ${freedMB} MB`,
      memoryUsage: memoryUsageMB,
    };
  }

  /**
   * Get current memory usage
   * @returns Current memory usage info
   */
  getMemoryUsage(): { memoryUsage: any } {
    const memoryUsage = process.memoryUsage();
    const memoryUsageMB = {
      rss: Math.round(memoryUsage.rss / 1024 / 1024),
      heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024),
      heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024),
      external: Math.round(memoryUsage.external / 1024 / 1024),
    };

    return {
      memoryUsage: memoryUsageMB,
    };
  }
}
