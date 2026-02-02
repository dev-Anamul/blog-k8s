import { ParamIdDto } from '@/shared/dtos/param-id.dto';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateSettingsDto } from '../dtos/create-settings.dto';
import { UpdateSettingsDto } from '../dtos/update-settings.dto';
import { SettingsService } from '../services/settings.service';

@Controller('v1')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('settings')
  async getSettings() {
    return this.settingsService.findAll();
  }

  @Post('settings')
  async createSettings(@Body() settings: CreateSettingsDto) {
    return this.settingsService.create(settings);
  }

  @Patch('settings/:id')
  async updateSettings(@Param() { id }: ParamIdDto, @Body() settings: UpdateSettingsDto) {
    return this.settingsService.updateOneById(id, settings);
  }

  @Delete('settings/:id')
  async deleteSettings(@Param() { id }: ParamIdDto) {
    return this.settingsService.deleteOneById(id);
  }
}
