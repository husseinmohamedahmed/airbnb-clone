import { Module } from '@nestjs/common';
import { CitiesController } from './cities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNames } from '../common/data-access/model-names.enum';
import { citySchema } from './schemas/city.schema';
import { CitiesService } from './cities.service';
import { CreateCityUsecase } from './usecases/create-city.usecase';
import { FindAllCitiesUsecase } from './usecases/find-all.usecase.dto';
import { CityRepository } from './repository/city.repository';
import { CountryModule } from '../country/country.module';
import { SoftDeleteCityUsecase } from './usecases/soft-delete-city.usecase';
import { FindCityByIdUsecase } from './usecases/find-city-by-id.usecase';
import { UpdateCityUsecase } from './usecases/update-city.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelNames.CITIES, schema: citySchema },
    ]),
    CountryModule,
  ],
  controllers: [CitiesController],
  providers: [
    CitiesService,
    CreateCityUsecase,
    FindAllCitiesUsecase,
    SoftDeleteCityUsecase,
    FindCityByIdUsecase,
    UpdateCityUsecase,
    CityRepository,
  ],
})
export class CitiesModule {}
