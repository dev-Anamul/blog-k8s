import { BaseRepository } from '@/shared/base-classes/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SettingsEntity } from '../entities/settings.entity';

@Injectable()
export class SettingsRepository extends BaseRepository<SettingsEntity> {
  constructor(@InjectModel(SettingsEntity.name) private readonly settingsModel: Model<SettingsEntity>) {
    super(settingsModel);
  }
}
