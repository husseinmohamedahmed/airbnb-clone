import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/data-access/base-repository';
import { Currency } from '../schemas/currency-schema';
import { ModelNames } from '../../common/data-access/model-names.enum';
import { Model } from 'mongoose';

@Injectable()
export class CurrencyRepository extends BaseRepository<Currency> {
  constructor(
    @InjectModel(ModelNames.CURRENCIES)
    private readonly currencyModel: Model<Currency>,
  ) {
    super(currencyModel);
  }
}
