import { OmitType } from '@nestjs/swagger';
import { SettingsDto } from './settings.dto';

export class CreateSettingsDto extends OmitType(SettingsDto, [] as const) {}
