import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/data-access/base-repository';
import { InjectModel } from '@nestjs/mongoose';
import { ModelNames } from '../../common/data-access/model-names.enum';
import { SystemAdmin } from '../schemas/system-admin.schema';
import { Model } from 'mongoose';
@Injectable()
export class SystemAdminRepository extends BaseRepository<SystemAdmin> {
  constructor(
    @InjectModel(ModelNames.SYSTEM_ADMINS) private readonly systemAdminModel: Model<SystemAdmin>,
  ) {
    super(systemAdminModel);
  }
}
