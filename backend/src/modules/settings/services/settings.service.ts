import { BaseService } from '@/shared/base-classes/base.service';
import { Injectable } from '@nestjs/common';
import { CreateSettingsDto } from '../dtos/create-settings.dto';
import { UpdateSettingsDto } from '../dtos/update-settings.dto';
import { SettingsEntity } from '../entities/settings.entity';
import { SettingsRepository } from '../repositories/settings.repository';

@Injectable()
export class SettingsService extends BaseService<
  SettingsEntity,
  CreateSettingsDto,
  UpdateSettingsDto,
  SettingsRepository
> {
  constructor(private readonly settingsRepository: SettingsRepository) {
    super(settingsRepository);
  }

  /**
   * Find the first settings
   * @returns promise<SettingsEntity>
   */
  async findFirst(): Promise<SettingsEntity> {
    return this.settingsRepository.findOne({});
  }
}
