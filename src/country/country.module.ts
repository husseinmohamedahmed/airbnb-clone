import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { countrySchema } from './schemas/country-schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateCountryUseCase } from './usecases/create-country.usecase';
import { GetCountryByIdUseCase } from './usecases/get-country-by-id-usecase';
import { GetAllCountriesUseCase } from './usecases/get-all-countries.usecase';
import { SoftDeleteCountryByIdUseCase } from './usecases/soft-delete-country-by-id-usecase';
import { UpdateCountryByIdUseCase } from './usecases/update-country-by-id-usecase';
import { ModelNames } from '../common/data-access/model-names.enum';
import { CountryRepository } from './repository/country.repository';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelNames.COUNTRIES, schema: countrySchema },
    ]),
  ],

  controllers: [CountryController],
  providers: [
    CountryService,
    CreateCountryUseCase,
    GetAllCountriesUseCase,
    GetCountryByIdUseCase,
    SoftDeleteCountryByIdUseCase,
    UpdateCountryByIdUseCase,
    CountryRepository,
  ],
  exports: [CountryService],
})
export class CountryModule {}
