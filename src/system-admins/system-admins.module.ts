import { Module } from '@nestjs/common';
import { systemAdminSchema } from './schemas/system-admin.schema';
import { ModelNames } from '../common/data-access/model-names.enum';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemAdminRepository } from './repositories/system-admin.repositroy';
import { SystemAdminService } from './system-admin.service';
import { InitializeSystemAdminUseCase } from './usecases/initialize-system-admin.usecase';

@Module({
  imports:[MongooseModule.forFeature([{ name: ModelNames.SYSTEM_ADMINS, schema: systemAdminSchema }])],
  providers: [InitializeSystemAdminUseCase, SystemAdminService, SystemAdminRepository],
  exports: [SystemAdminService]
})

export class SystemAdminsModule {}
