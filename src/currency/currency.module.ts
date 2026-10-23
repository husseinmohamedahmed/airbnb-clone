import { Module } from '@nestjs/common';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNames } from '../common/data-access/model-names.enum';
import { CurrencySchema } from './schemas/currency-schema';
import { CurrencyRepository } from './repository/currency.repository';
import { CreateCurrencyUsecase } from './usecases/create-currency.usecase';
import { FindAllCurrenciesUsecase } from './usecases/find-all-currencies.usecase';
import { FindCurrencyByIdUsecase } from './usecases/find-currency-by-id';
import { UpdateCurrencyUsecase } from './usecases/update-currency.dto';
import { SoftDeleteCurrencyUsecase } from './usecases/soft-delete-currency.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelNames.CURRENCIES, schema: CurrencySchema },
    ]),
  ],
  controllers: [CurrencyController],
  providers: [
    CurrencyService,
    CurrencyRepository,
    CreateCurrencyUsecase,
    FindAllCurrenciesUsecase,
    FindCurrencyByIdUsecase,
    UpdateCurrencyUsecase,
    SoftDeleteCurrencyUsecase,
  ],
})
export class CurrencyModule {}
