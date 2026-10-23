import { Injectable } from '@nestjs/common';
import { CreateCityUsecase } from './usecases/create-city.usecase';
import { FindAllCitiesDto } from './dtos/find-all-cities.dto';
import { CreateCityDto } from './dtos/create-city.dto';
import { FindAllCitiesUsecase } from './usecases/find-all.usecase.dto';
import { SoftDeleteCityUsecase } from './usecases/soft-delete-city.usecase';
import { FindCityByIdUsecase } from './usecases/find-city-by-id.usecase';
import { CityResponseDto } from './dtos/city-response.dto';
import { PaginatedResult } from '../common/data-access/base-repository';
import { UpdateCityDto } from './dtos/update-city.dto';
import { UpdateCityUsecase } from './usecases/update-city.usecase';
@Injectable()
export class CitiesService {
  constructor(
    private readonly createCityUsecase: CreateCityUsecase,
    private readonly findAllCitiesUsecase: FindAllCitiesUsecase,
    private readonly softDeleteCityUsecase: SoftDeleteCityUsecase,
    private readonly findCityByIdUsecase: FindCityByIdUsecase,
    private readonly updateCityUsecase: UpdateCityUsecase,
  ) {}

  async createCity(body: CreateCityDto): Promise<CityResponseDto> {
    return this.createCityUsecase.execute(body);
  }

  async findAllCities(
    query: FindAllCitiesDto,
  ): Promise<PaginatedResult<CityResponseDto>> {
    return this.findAllCitiesUsecase.execute(query);
  }

  async findCityById(id: string): Promise<CityResponseDto> {
    return this.findCityByIdUsecase.execute(id);
  }
  async softDeleteCity(id: string): Promise<void> {
    return this.softDeleteCityUsecase.execute(id);
  }
  async updateCity(id: string, body: UpdateCityDto): Promise<CityResponseDto> {
    return this.updateCityUsecase.execute(id, body);
  }
}
