import { Controller } from '@nestjs/common';
import { Body, Put, Get } from '@nestjs/common';
import { AppSettingsService } from './app-settings.service';
import { UpsertAppSettingsDto } from './dtos/upsert-app-settings.dto';
import { AppSettingsResponseDto } from './dtos/app-settings.response.dto';
@Controller('app-settings')
export class AppSettingsController {
  constructor(private readonly appSettingsService: AppSettingsService) {}
  @Put()
  async upsertAppSettings(
    @Body() body: UpsertAppSettingsDto,
  ): Promise<AppSettingsResponseDto> {
    return this.appSettingsService.upsertAppSettings(body);
  }
  @Get()
  async findAppSettings(): Promise<AppSettingsResponseDto> {
    return this.appSettingsService.findAppSettings();
  }
}
