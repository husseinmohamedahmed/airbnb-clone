import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AppSettingsRepository } from '../repository/app-settings.repository';
import { AppSettingsResponseDto } from '../dtos/app-settings.response.dto';

@Injectable()
export class FindAppSettingsUseCase {
  constructor(private readonly appSettingsRepository: AppSettingsRepository) {}

  async execute(): Promise<AppSettingsResponseDto> {
    const appSettings = await this.appSettingsRepository.findOne({});
    return plainToInstance(AppSettingsResponseDto, appSettings?.toObject());
  }
}
