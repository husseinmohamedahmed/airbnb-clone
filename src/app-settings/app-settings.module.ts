import { Module } from '@nestjs/common';
import { AppSettingsController } from './app-settings.controller';
import { AppSettingsService } from './app-settings.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNames } from '../common/data-access/model-names.enum';
import { appSettingsSchema } from './schemas/app-settings.schema';
import { FindAppSettingsUseCase } from './usecases/find-app-settings.usecase';
import { UpsertAppSettingsUseCase } from './usecases/upsert-app-settings.usecase';
import { AppSettingsRepository } from './repository/app-settings.repository';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelNames.APP_SETTINGS, schema: appSettingsSchema },
    ]),
  ],
  controllers: [AppSettingsController],
  providers: [
    AppSettingsService,
    FindAppSettingsUseCase,
    UpsertAppSettingsUseCase,
    AppSettingsRepository,
  ],
})
export class AppSettingsModule {}
