import { Module } from '@nestjs/common';
import { UnitCategoryController } from './unit-category.controller';
import { UnitCategoryService } from './unit-category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNames } from '../common/data-access/model-names.enum';
import { CreateUnitCategoryUsecase } from './usecases/create-unit-category.usecase';
import { FindAllUnitCategoriesUsecase } from './usecases/find-all-unit-category.usecase';
import { FindUnitCategoryByIdUsecase } from './usecases/find-unit-cateogry-by-id';
import { UpdateUnitCategoryUsecase } from './usecases/update-unit-category.dto';
import { SoftDeleteUnitCategoryUsecase } from './usecases/soft-delete-unit-category.usecase';
import { UnitCategorySchema } from './schemas/unit-category-schema';
import { UnitCategoryRepository } from './repository/unit-category.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelNames.UNIT_CATEGORIES, schema: UnitCategorySchema },
    ]),
  ],
  controllers: [UnitCategoryController],
  providers: [
    UnitCategoryService,
    UnitCategoryRepository,
    CreateUnitCategoryUsecase,
    FindAllUnitCategoriesUsecase,
    FindUnitCategoryByIdUsecase,
    UpdateUnitCategoryUsecase,
    SoftDeleteUnitCategoryUsecase,
  ],
})
export class UnitCategoryModule {}
