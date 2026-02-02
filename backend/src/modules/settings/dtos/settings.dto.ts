import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SettingsDto {
  @ApiProperty({
    description: 'ERP Next Service account API key',
    example: '1234567890',
  })
  @IsString()
  @IsNotEmpty()
  erpNextApiKey: string;

  @ApiProperty({
    description: 'ERP Next Service account API secret',
    example: '1234567890',
  })
  @IsString()
  @IsNotEmpty()
  erpNextApiSecret: string;

  @ApiProperty({
    description: 'HRM Service account API key',
    example: '1234567890',
  })
  @IsString()
  @IsNotEmpty()
  hrmApiKey: string;

  @ApiProperty({
    description: 'HRM Service account API secret',
    example: '1234567890',
  })
  @IsString()
  @IsNotEmpty()
  hrmApiSecret: string;

  @ApiProperty({
    description: 'ERP Next Service account URL',
    example: 'https://erpnext.com',
  })
  @IsString()
  @IsNotEmpty()
  erpNextUrl: string;

  @ApiProperty({
    description: 'HRM Service account URL',
    example: 'https://hrm.com',
  })
  @IsString()
  @IsNotEmpty()
  hrmUrl: string;

  @ApiProperty({
    description: 'ERP Next Service account login URL',
    example: 'https://erpnext.com/login',
  })
  @IsString()
  @IsNotEmpty()
  erpNextLoginUrl: string;

  @ApiProperty({
    description: 'HRM Service account login URL',
    example: 'https://hrm.com/login',
  })
  @IsString()
  @IsNotEmpty()
  hrmLoginUrl: string;

  @ApiProperty({
    description: 'HRM Service account site name',
    example: 'HRM',
  })
  @IsString()
  @IsNotEmpty()
  hrmSiteName: string;

  @ApiProperty({
    description: 'ERP Next Service account site name',
    example: 'ERP Next',
  })
  @IsString()
  @IsNotEmpty()
  erpNextSiteName: string;
}
