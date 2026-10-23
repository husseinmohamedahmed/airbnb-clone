import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/data-access/base-repository';
import { InjectModel } from '@nestjs/mongoose';
import { ModelNames } from '../../common/data-access/model-names.enum';
import { Model } from 'mongoose';
import { AppSettings } from '../schemas/app-settings.schema';
@Injectable()
export class AppSettingsRepository extends BaseRepository<AppSettings> {
  constructor(
    @InjectModel(ModelNames.APP_SETTINGS)
    private readonly appSettingsModel: Model<AppSettings>,
  ) {
    super(appSettingsModel);
  }
}
