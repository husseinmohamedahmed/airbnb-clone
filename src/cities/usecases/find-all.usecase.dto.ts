import { Injectable } from '@nestjs/common';
import { CityRepository } from '../repository/city.repository';
import { FindAllCitiesDto } from '../dtos/find-all-cities.dto';
import { QueryFilter } from 'mongoose';
import { PaginatedResult } from '../../common/data-access/base-repository';
import { CityResponseDto } from '../dtos/city-response.dto';
import { plainToInstance } from 'class-transformer';
import { City } from '../schemas/city.schema';
@Injectable()
export class FindAllCitiesUsecase {
  constructor(private readonly cityRepository: CityRepository) {}

  async execute(
    query: FindAllCitiesDto,
  ): Promise<PaginatedResult<CityResponseDto>> {
    const matchQuery: QueryFilter<City> = { isDeleted: false };
    if (query?.name) {
      matchQuery.name = { $regex: query.name, $options: 'i' };
    }

    if (query?.country) matchQuery.country = query.country;

    const result = await this.cityRepository.findPaginated(matchQuery, {
      limit: query?.limit,
      page: query?.page,
      populate: [{ path: 'country', select: 'name' }],
    });
    return plainToInstance(PaginatedResult<CityResponseDto>, result, {
      enableCircularCheck: true,
    });
  }
}
