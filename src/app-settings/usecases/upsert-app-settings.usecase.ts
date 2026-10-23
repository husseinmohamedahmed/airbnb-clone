import { plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { AppSettingsRepository } from '../repository/app-settings.repository';
import { UpsertAppSettingsDto } from '../dtos/upsert-app-settings.dto';
import { AppSettingsResponseDto } from '../dtos/app-settings.response.dto';

@Injectable()
export class UpsertAppSettingsUseCase {
  constructor(private readonly appSettingsRepository: AppSettingsRepository) {}

  async execute(body: UpsertAppSettingsDto): Promise<AppSettingsResponseDto> {
    const appSettings = await this.appSettingsRepository.findOneAndUpdate(
      {},
      body,
      { new: true, upsert: true },
    );
    return plainToInstance(AppSettingsResponseDto, appSettings?.toObject());
  }
}
