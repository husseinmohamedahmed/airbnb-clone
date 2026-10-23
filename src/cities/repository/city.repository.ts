import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/data-access/base-repository';
import { InjectModel } from '@nestjs/mongoose';
import { ModelNames } from '../../common/data-access/model-names.enum';
import { City } from '../schemas/city.schema';
import { Model } from 'mongoose';
@Injectable()
export class CityRepository extends BaseRepository<City> {
  constructor(
    @InjectModel(ModelNames.CITIES) private readonly cityModel: Model<City>,
  ) {
    super(cityModel);
  }
}
