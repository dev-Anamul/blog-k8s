import { Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SpikeService } from '../services/spike.service';

@ApiTags('Spike')
@Controller('v1/spike')
export class SpikeController {
  constructor(private readonly spikeService: SpikeService) {}

  @Post('cpu')
  @ApiOperation({ summary: 'Create a CPU spike' })
  @ApiQuery({ name: 'duration', required: false, description: 'Duration in seconds (default: 10)', type: Number })
  @ApiQuery({ name: 'intensity', required: false, description: 'Intensity level 1-10 (default: 5)', type: Number })
  @ApiResponse({ status: 200, description: 'CPU spike created successfully' })
  async createCpuSpike(@Query('duration') duration?: string, @Query('intensity') intensity?: string) {
    const durationNum = duration ? Number.parseInt(duration) : 10;
    const intensityNum = intensity ? Number.parseInt(intensity) : 5;

    // Validate intensity range
    const validatedIntensity = Math.max(1, Math.min(10, intensityNum));

    return this.spikeService.createCpuSpike(durationNum, validatedIntensity);
  }

  @Delete('cpu')
  @ApiOperation({ summary: 'Stop the CPU spike' })
  @ApiResponse({ status: 200, description: 'CPU spike stopped successfully' })
  async stopCpuSpike() {
    return this.spikeService.stopCpuSpike();
  }

  @Post('memory')
  @ApiOperation({ summary: 'Create a memory spike' })
  @ApiQuery({ name: 'sizeMB', required: false, description: 'Size in MB to allocate (default: 100)', type: Number })
  @ApiResponse({ status: 200, description: 'Memory spike created successfully' })
  async createMemorySpike(@Query('sizeMB') sizeMB?: string) {
    const sizeMBNum = sizeMB ? Number.parseInt(sizeMB) : 100;

    // Validate size (max 10GB to prevent system crash)
    const validatedSize = Math.max(1, Math.min(10240, sizeMBNum));

    return this.spikeService.createMemorySpike(validatedSize);
  }

  @Delete('memory')
  @ApiOperation({ summary: 'Clear the memory spike' })
  @ApiResponse({ status: 200, description: 'Memory spike cleared successfully' })
  async clearMemorySpike() {
    return this.spikeService.clearMemorySpike();
  }

  @Get('memory/usage')
  @ApiOperation({ summary: 'Get current memory usage' })
  @ApiResponse({ status: 200, description: 'Current memory usage retrieved successfully' })
  async getMemoryUsage() {
    return this.spikeService.getMemoryUsage();
  }
}
