import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/data-access/base-repository';
import { ModelNames } from '../../common/data-access/model-names.enum';
import { Model } from 'mongoose';
import { UnitCategory } from '../schemas/unit-category-schema';

@Injectable()
export class UnitCategoryRepository extends BaseRepository<UnitCategory> {
  constructor(
    @InjectModel(ModelNames.UNIT_CATEGORIES)
    private readonly unitCategoryModel: Model<UnitCategory>,
  ) {
    super(unitCategoryModel);
  }
}
