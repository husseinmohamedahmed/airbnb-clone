import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/data-access/base-repository';
import { Country } from '../schemas/country-schema';
import { InjectModel } from '@nestjs/mongoose';
import { ModelNames } from '../../common/data-access/model-names.enum';
import { Model } from 'mongoose';

@Injectable()
export class CountryRepository extends BaseRepository<Country> {
  constructor(
    @InjectModel(ModelNames.COUNTRIES)
    private readonly countryModel: Model<Country>,
  ) {
    super(countryModel);
  }
}
